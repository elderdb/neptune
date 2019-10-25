package neptune.application.domain.email;

import neptune.application.domain.AbstractAuditingEntity;
import neptune.application.domain.enums.EmailStatus;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A email.
 */
@Entity
@Table(name = "emails")
public class Email extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 254)
    @Column(length = 254)
    private String email;

    @Enumerated(value = EnumType.STRING)
    private EmailStatus status = EmailStatus.SCHEDULED;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EmailStatus getStatus() {
        return status;
    }

    public void setStatus(EmailStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Email)) {
            return false;
        }
        return id != null && id.equals(((Email) o).id);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Email{");
        sb.append("id=").append(id);
        sb.append(", email='").append(email).append('\'');
        sb.append(", status='").append(status).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
