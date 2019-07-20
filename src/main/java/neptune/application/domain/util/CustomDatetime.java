package neptune.application.domain.util;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface CustomDatetime {
    String value() default "yyyy-MM-dd HH:mm:ss";
}
