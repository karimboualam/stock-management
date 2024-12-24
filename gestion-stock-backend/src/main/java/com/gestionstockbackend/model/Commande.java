package com.gestionstockbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

//@Data
@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Utilisateur utilisateur;

    @OneToMany
    private List<Produit> produits;

    private Date dateCommande;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public List<Produit> getProduits() {
        return produits;
    }

    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Commande() {

    }
    public Commande(Long id, Utilisateur utilisateur, List<Produit> produits, Date dateCommande) {
        this.id = id;
        this.utilisateur = utilisateur;
        this.produits = produits;
        this.dateCommande = dateCommande;
    }
}
