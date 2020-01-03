package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.MaterialOrigin;
import com.mycompany.myapp.repository.MaterialOriginRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MaterialOriginResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MaterialOriginResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MaterialOriginRepository materialOriginRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMaterialOriginMockMvc;

    private MaterialOrigin materialOrigin;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterialOriginResource materialOriginResource = new MaterialOriginResource(materialOriginRepository);
        this.restMaterialOriginMockMvc = MockMvcBuilders.standaloneSetup(materialOriginResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaterialOrigin createEntity(EntityManager em) {
        MaterialOrigin materialOrigin = new MaterialOrigin()
            .name(DEFAULT_NAME);
        return materialOrigin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaterialOrigin createUpdatedEntity(EntityManager em) {
        MaterialOrigin materialOrigin = new MaterialOrigin()
            .name(UPDATED_NAME);
        return materialOrigin;
    }

    @BeforeEach
    public void initTest() {
        materialOrigin = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterialOrigin() throws Exception {
        int databaseSizeBeforeCreate = materialOriginRepository.findAll().size();

        // Create the MaterialOrigin
        restMaterialOriginMockMvc.perform(post("/api/material-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialOrigin)))
            .andExpect(status().isCreated());

        // Validate the MaterialOrigin in the database
        List<MaterialOrigin> materialOriginList = materialOriginRepository.findAll();
        assertThat(materialOriginList).hasSize(databaseSizeBeforeCreate + 1);
        MaterialOrigin testMaterialOrigin = materialOriginList.get(materialOriginList.size() - 1);
        assertThat(testMaterialOrigin.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMaterialOriginWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materialOriginRepository.findAll().size();

        // Create the MaterialOrigin with an existing ID
        materialOrigin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterialOriginMockMvc.perform(post("/api/material-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialOrigin)))
            .andExpect(status().isBadRequest());

        // Validate the MaterialOrigin in the database
        List<MaterialOrigin> materialOriginList = materialOriginRepository.findAll();
        assertThat(materialOriginList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMaterialOrigins() throws Exception {
        // Initialize the database
        materialOriginRepository.saveAndFlush(materialOrigin);

        // Get all the materialOriginList
        restMaterialOriginMockMvc.perform(get("/api/material-origins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materialOrigin.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getMaterialOrigin() throws Exception {
        // Initialize the database
        materialOriginRepository.saveAndFlush(materialOrigin);

        // Get the materialOrigin
        restMaterialOriginMockMvc.perform(get("/api/material-origins/{id}", materialOrigin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(materialOrigin.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingMaterialOrigin() throws Exception {
        // Get the materialOrigin
        restMaterialOriginMockMvc.perform(get("/api/material-origins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterialOrigin() throws Exception {
        // Initialize the database
        materialOriginRepository.saveAndFlush(materialOrigin);

        int databaseSizeBeforeUpdate = materialOriginRepository.findAll().size();

        // Update the materialOrigin
        MaterialOrigin updatedMaterialOrigin = materialOriginRepository.findById(materialOrigin.getId()).get();
        // Disconnect from session so that the updates on updatedMaterialOrigin are not directly saved in db
        em.detach(updatedMaterialOrigin);
        updatedMaterialOrigin
            .name(UPDATED_NAME);

        restMaterialOriginMockMvc.perform(put("/api/material-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaterialOrigin)))
            .andExpect(status().isOk());

        // Validate the MaterialOrigin in the database
        List<MaterialOrigin> materialOriginList = materialOriginRepository.findAll();
        assertThat(materialOriginList).hasSize(databaseSizeBeforeUpdate);
        MaterialOrigin testMaterialOrigin = materialOriginList.get(materialOriginList.size() - 1);
        assertThat(testMaterialOrigin.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterialOrigin() throws Exception {
        int databaseSizeBeforeUpdate = materialOriginRepository.findAll().size();

        // Create the MaterialOrigin

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterialOriginMockMvc.perform(put("/api/material-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialOrigin)))
            .andExpect(status().isBadRequest());

        // Validate the MaterialOrigin in the database
        List<MaterialOrigin> materialOriginList = materialOriginRepository.findAll();
        assertThat(materialOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaterialOrigin() throws Exception {
        // Initialize the database
        materialOriginRepository.saveAndFlush(materialOrigin);

        int databaseSizeBeforeDelete = materialOriginRepository.findAll().size();

        // Delete the materialOrigin
        restMaterialOriginMockMvc.perform(delete("/api/material-origins/{id}", materialOrigin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MaterialOrigin> materialOriginList = materialOriginRepository.findAll();
        assertThat(materialOriginList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
