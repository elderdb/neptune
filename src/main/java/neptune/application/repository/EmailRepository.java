package neptune.application.repository;

import neptune.application.domain.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the {@link neptune.application.domain.email.Email} entity.
 */
@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

    Optional<Email> findFirstByActiveIsTrueAndEmailEquals(@Param("email") final String email);

}
