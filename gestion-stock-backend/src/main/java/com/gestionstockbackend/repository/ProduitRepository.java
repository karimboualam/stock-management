package com.gestionstockbackend.repository;

import com.gestionstockbackend.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository  extends JpaRepository<Produit, Long> {}
