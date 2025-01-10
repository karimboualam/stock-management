package com.gestionstockbackend.controller;

import com.gestionstockbackend.model.Utilisateur;
import com.gestionstockbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // Autoriser l'accès depuis React/Node.js (ajuster les URL si nécessaire)
    @CrossOrigin(origins = "http://localhost:5000")
    // Récupérer un utilisateur par son ID
    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurRepository.findById(id).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // Vous pouvez ajouter d'autres endpoints selon vos besoins
    // Par exemple, pour récupérer tous les utilisateurs ou effectuer des mises à jour
}