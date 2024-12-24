package com.gestionstockbackend.repository;

import com.gestionstockbackend.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {}
