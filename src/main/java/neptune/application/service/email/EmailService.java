package neptune.application.service.email;

import com.google.common.base.Strings;
import neptune.application.domain.email.Email;
import neptune.application.repository.EmailRepository;
import org.apache.logging.log4j.LogManager;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.Logger;

import javax.validation.constraints.NotNull;
import java.util.Optional;


@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final Logger log = LogManager.getLogger(EmailService.class);

    @Autowired
    @Lazy
    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public ResponseEntity.HeadersBuilder create(@NotNull final String toEmail){

        if(Strings.isNullOrEmpty(toEmail)){
            log.warn("E-mail is empty or null. E-mail: {}", toEmail);
            return ResponseEntity.noContent();
        }

        if(!new EmailValidator().isValid(toEmail, null)){
            log.warn("E-mail is not valid. E-mail: {}", toEmail);
            return ResponseEntity.noContent();
        }

        return emailRepository.findFirstByActiveIsTrueAndEmailEquals(toEmail)
            .map(email -> ResponseEntity.status(HttpStatus.ALREADY_REPORTED)) //
            .orElseGet(() -> {

            final Email mail = new Email();

            mail.setEmail(toEmail);

            return Optional.of(emailRepository.saveAndFlush(mail)) //
                .map(email -> ResponseEntity.ok()) //
                .orElseGet(ResponseEntity::badRequest);

        });

    }

}
