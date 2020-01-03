package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MaterialOrigin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MaterialOrigin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialOriginRepository extends JpaRepository<MaterialOrigin, Long> {

}
