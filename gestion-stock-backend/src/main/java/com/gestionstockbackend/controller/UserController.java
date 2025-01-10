package com.gestionstockbackend.controller;

import com.gestionstockbackend.model.Utilisateur;
import com.gestionstockbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // Ajouter un utilisateur
    @PostMapping("/add")
    public ResponseEntity<Utilisateur> addUser(@RequestBody Utilisateur utilisateur) {
        // Vérifiez si l'utilisateur existe déjà
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        utilisateur.setPasswordVerified(true); // Exemple de logique
        utilisateurRepository.save(utilisateur);
        return new ResponseEntity<>(utilisateur, HttpStatus.CREATED);
    }
    // Modifier un utilisateur
    @PutMapping("/update/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        utilisateur.setFirstName(utilisateurDetails.getFirstName());
        utilisateur.setLastName(utilisateurDetails.getLastName());
        utilisateur.setEmail(utilisateurDetails.getEmail());
        utilisateur.setGender(utilisateurDetails.getGender());
        utilisateur.setRole(utilisateurDetails.getRole());

        Utilisateur updatedUser = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUser);
    }
    // Supprimer un utilisateur
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        utilisateurRepository.delete(utilisateur);
        return new ResponseEntity<>("Utilisateur supprimé avec succès", HttpStatus.OK);
    }
    // Lire tous les utilisateurs
    @GetMapping("/all")
    public ResponseEntity<List<Utilisateur>> getAllUsers() {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    // Lire un utilisateur spécifique
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return ResponseEntity.ok(utilisateur);
    }
}
