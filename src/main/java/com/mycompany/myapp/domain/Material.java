package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "material_origin",
               joinColumns = @JoinColumn(name = "material_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "origin_id", referencedColumnName = "id"))
    private Set<MaterialOrigin> origins = new HashSet<>();

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

    public Material name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MaterialOrigin> getOrigins() {
        return origins;
    }

    public Material origins(Set<MaterialOrigin> materialOrigins) {
        this.origins = materialOrigins;
        return this;
    }

    public Material addOrigin(MaterialOrigin materialOrigin) {
        this.origins.add(materialOrigin);
        materialOrigin.getMaterials().add(this);
        return this;
    }

    public Material removeOrigin(MaterialOrigin materialOrigin) {
        this.origins.remove(materialOrigin);
        materialOrigin.getMaterials().remove(this);
        return this;
    }

    public void setOrigins(Set<MaterialOrigin> materialOrigins) {
        this.origins = materialOrigins;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        return id != null && id.equals(((Material) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
