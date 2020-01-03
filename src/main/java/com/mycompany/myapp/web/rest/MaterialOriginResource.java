package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MaterialOrigin;
import com.mycompany.myapp.repository.MaterialOriginRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.MaterialOrigin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MaterialOriginResource {

    private final Logger log = LoggerFactory.getLogger(MaterialOriginResource.class);

    private static final String ENTITY_NAME = "materialOrigin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialOriginRepository materialOriginRepository;

    public MaterialOriginResource(MaterialOriginRepository materialOriginRepository) {
        this.materialOriginRepository = materialOriginRepository;
    }

    /**
     * {@code POST  /material-origins} : Create a new materialOrigin.
     *
     * @param materialOrigin the materialOrigin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materialOrigin, or with status {@code 400 (Bad Request)} if the materialOrigin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/material-origins")
    public ResponseEntity<MaterialOrigin> createMaterialOrigin(@RequestBody MaterialOrigin materialOrigin) throws URISyntaxException {
        log.debug("REST request to save MaterialOrigin : {}", materialOrigin);
        if (materialOrigin.getId() != null) {
            throw new BadRequestAlertException("A new materialOrigin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialOrigin result = materialOriginRepository.save(materialOrigin);
        return ResponseEntity.created(new URI("/api/material-origins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /material-origins} : Updates an existing materialOrigin.
     *
     * @param materialOrigin the materialOrigin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialOrigin,
     * or with status {@code 400 (Bad Request)} if the materialOrigin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materialOrigin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/material-origins")
    public ResponseEntity<MaterialOrigin> updateMaterialOrigin(@RequestBody MaterialOrigin materialOrigin) throws URISyntaxException {
        log.debug("REST request to update MaterialOrigin : {}", materialOrigin);
        if (materialOrigin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MaterialOrigin result = materialOriginRepository.save(materialOrigin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialOrigin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /material-origins} : get all the materialOrigins.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materialOrigins in body.
     */
    @GetMapping("/material-origins")
    public List<MaterialOrigin> getAllMaterialOrigins() {
        log.debug("REST request to get all MaterialOrigins");
        return materialOriginRepository.findAll();
    }

    /**
     * {@code GET  /material-origins/:id} : get the "id" materialOrigin.
     *
     * @param id the id of the materialOrigin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materialOrigin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/material-origins/{id}")
    public ResponseEntity<MaterialOrigin> getMaterialOrigin(@PathVariable Long id) {
        log.debug("REST request to get MaterialOrigin : {}", id);
        Optional<MaterialOrigin> materialOrigin = materialOriginRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(materialOrigin);
    }

    /**
     * {@code DELETE  /material-origins/:id} : delete the "id" materialOrigin.
     *
     * @param id the id of the materialOrigin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/material-origins/{id}")
    public ResponseEntity<Void> deleteMaterialOrigin(@PathVariable Long id) {
        log.debug("REST request to delete MaterialOrigin : {}", id);
        materialOriginRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
