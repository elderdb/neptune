package neptune.application.service.email;

import com.google.common.base.Strings;
import neptune.application.domain.email.Email;
import neptune.application.repository.EmailRepository;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@Service
public class EmailService {

    private final EmailRepository emailRepository;

    @Autowired
    @Lazy
    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public ResponseEntity.HeadersBuilder create(@NotNull final String toEmail){

        if(Strings.isNullOrEmpty(toEmail) || !new EmailValidator().isValid(toEmail, null)){
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
