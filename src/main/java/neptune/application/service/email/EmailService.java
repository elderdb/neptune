package neptune.application.service.email;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.util.json.Jackson;
import com.google.common.base.Strings;
import io.micrometer.core.annotation.Timed;
import neptune.application.domain.email.Email;
import neptune.application.domain.enums.EmailStatus;
import neptune.application.repository.EmailRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotNull;
import java.util.*;


@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final Logger log = LogManager.getLogger(EmailService.class);
    private final String lambdaEmailName = "sendEmail";

    @Autowired
    @Lazy
    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public ResponseEntity<Email> create(@NotNull final String toEmail) {

        if (Strings.isNullOrEmpty(toEmail)) {
            log.warn("E-mail is empty or null. E-mail: {}", toEmail);
            return ResponseEntity.noContent().build();
        }

        if (!new EmailValidator().isValid(toEmail, null)) {
            log.warn("E-mail is not valid. E-mail: {}", toEmail);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        return emailRepository.findFirstByActiveIsTrueAndEmailEquals(toEmail)
            .map(email -> {

                if (isAllowedToSendEmailAgain(email)) {
                    return saveAndSend(email)
                        .map(ResponseEntity::ok) //
                        .orElseGet(() -> ResponseEntity.badRequest().build());
                }

                return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new Email());

            }) //
            .orElseGet(() -> {

                final Email mail = new Email();

                mail.setEmail(toEmail);

                return saveAndSend(mail)
                    .map(ResponseEntity::ok) //
                    .orElseGet(() -> ResponseEntity.badRequest().build());

            });
    }

    @Timed
    public List<Email> sendEmail(@Nonnull final List<Email> emailList) {

        if (Objects.isNull(emailList) || emailList.isEmpty()) {
            return Collections.emptyList();
        }

        final AWSCredentialsProvider credentials =
            new AWSStaticCredentialsProvider(new BasicAWSCredentials("AKIAQV2JOEPJYKEEGRGC", "lAncuez/DZoJIOP5Belj2XItXOokG5BaG7lNKbkd"));

        final AWSLambda client = AWSLambdaClientBuilder.standard().withCredentials(credentials)
            .withRegion(Regions.US_EAST_1).build();

        final InvokeRequest req = new InvokeRequest()
            .withFunctionName(lambdaEmailName)
            .withPayload(Jackson.toJsonString(emailList));

        return deserializeResponse(new String(client.invoke(req).getPayload().array()));
    }

    private List<Email> deserializeResponse(@Nonnull final String response) {

        try {
            return Arrays.asList(Jackson.fromJsonString(response, Email[].class));
        } catch (Exception ex) {
            log.error("Error in deserializeResponse method. Exception details: {}", ex);
            return Collections.emptyList();
        }

    }

    private void updateEmail(@Nonnull final List<Email> emails) {

        if (Objects.isNull(emails)) {
            return;
        }

        emails.forEach(emailRepository::saveAndFlush);

    }

    private Optional<Email> saveAndSend(@Nonnull final Email mail) {
        return Optional.of(emailRepository.saveAndFlush(mail)) //
            .map(email -> {

                updateEmail(sendEmail(Collections.singletonList(email)));

                return email;

            });
    }

    private boolean isAllowedToSendEmailAgain(@Nonnull final Email email){
        return email.getLastModifiedDate().plusHours(24).isBeforeNow() && EmailStatus.DELIVERED.equals(email.getStatus());
    }

}
