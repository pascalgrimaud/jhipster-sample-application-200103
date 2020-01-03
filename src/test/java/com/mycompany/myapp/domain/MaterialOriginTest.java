package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MaterialOriginTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialOrigin.class);
        MaterialOrigin materialOrigin1 = new MaterialOrigin();
        materialOrigin1.setId(1L);
        MaterialOrigin materialOrigin2 = new MaterialOrigin();
        materialOrigin2.setId(materialOrigin1.getId());
        assertThat(materialOrigin1).isEqualTo(materialOrigin2);
        materialOrigin2.setId(2L);
        assertThat(materialOrigin1).isNotEqualTo(materialOrigin2);
        materialOrigin1.setId(null);
        assertThat(materialOrigin1).isNotEqualTo(materialOrigin2);
    }
}
