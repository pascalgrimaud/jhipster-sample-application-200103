package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MaterialOrigin.
 */
@Entity
@Table(name = "material_origin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MaterialOrigin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "origins")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public MaterialOrigin name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public MaterialOrigin materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public MaterialOrigin addMaterial(Material material) {
        this.materials.add(material);
        material.getOrigins().add(this);
        return this;
    }

    public MaterialOrigin removeMaterial(Material material) {
        this.materials.remove(material);
        material.getOrigins().remove(this);
        return this;
    }

    public void setMaterials(Set<Material> materials) {
        this.materials = materials;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MaterialOrigin)) {
            return false;
        }
        return id != null && id.equals(((MaterialOrigin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MaterialOrigin{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
