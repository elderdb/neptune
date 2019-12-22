package neptune.application.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class AWSCredentials {

    @Autowired
    @Lazy
    public AWSCredentials(){

    }

    @Value("#{systemProperties.accessKey}")
    private String ACCESS_KEY;

    @Value("#{systemProperties.secretKey}")
    private String SECRET_KEY;

    public String getACCESS_KEY() {
        return ACCESS_KEY;
    }

    public String getSECRET_KEY() {
        return SECRET_KEY;
    }
}
