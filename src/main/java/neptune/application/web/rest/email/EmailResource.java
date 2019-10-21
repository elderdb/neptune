package neptune.application.web.rest.email;

import neptune.application.domain.email.Email;
import neptune.application.service.email.EmailService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for getting the {@link Email}s.
 */
@RestController
@RequestMapping("/api/email")
public class EmailResource {

    private EmailService emailService;

    public EmailResource(EmailService emailService) {
        this.emailService = emailService;
    }

    /**
     *
     * @param email
     * @return Register a new email
     */
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Email> create(@RequestBody String email) {

        return emailService.create(email);

    }


}
