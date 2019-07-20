package neptune.application.service.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.*;
import io.jsonwebtoken.lang.Assert;
import neptune.application.domain.email.Email;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class SESService {

    static final String FROM = "elderdbatista@gmail.com";

    // Replace recipient@example.com with a "To" address. If your account
    // is still in the sandbox, this address must be verified.
    static final String TO = "elderdbspfc@gmail.com";

    // The configuration set to use for this email. If you do not want to use a
    // configuration set, comment the following variable and the
    // .withConfigurationSetName(CONFIGSET); argument below.
//    static final String CONFIGSET = "ConfigSet";

    // The subject line for the email.
    static final String SUBJECT = "Amazon SES test (AWS SDK for Java)";

    // The HTML body for the email.
    static final String HTMLBODY = "<h1>Amazon SES test (AWS SDK for Java)</h1>"
        + "<p>This email was sent with <a href='https://aws.amazon.com/ses/'>"
        + "Amazon SES</a> using the <a href='https://aws.amazon.com/sdk-for-java/'>"
        + "AWS SDK for Java</a>";

    // The email body for recipients with non-HTML email clients.
    static final String TEXTBODY = "This email was sent through Amazon SES "
        + "using the AWS SDK for Java.";

    public void sendEmail(@NotNull final Email email) {

        Assert.notNull(email, "email cannot be null");

        try {

            final String accessKey = "AKIAQV2JOEPJT25C7XHD";
            final String secretKey = "BBzPwtCOUiFK3+sgtdrSeswApa3HJk3XJ3js7KhSAaR1";

            AmazonSimpleEmailService client =
                AmazonSimpleEmailServiceClientBuilder.standard() //
                    .withCredentials((AWSCredentialsProvider) new BasicAWSCredentials(accessKey, secretKey))
                    .withRegion(Regions.US_EAST_1).build();
            SendEmailRequest request = new SendEmailRequest()
                .withDestination(
                    new Destination().withToAddresses(TO))
                .withMessage(new Message()
                    .withBody(new Body()
                        .withHtml(new Content()
                            .withCharset("UTF-8").withData(HTMLBODY))
                        .withText(new Content()
                            .withCharset("UTF-8").withData(TEXTBODY)))
                    .withSubject(new Content()
                        .withCharset("UTF-8").withData(SUBJECT)))
                .withSource(FROM);
            client.sendEmail(request);

        } catch (Exception ex) {
            System.out.println("The email was not sent. Error message: "
                + ex.getMessage());
        }
    }

}
