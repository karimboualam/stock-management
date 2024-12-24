package com.gestionstockbackend.controller;

import com.gestionstockbackend.model.Utilisateur;
import com.gestionstockbackend.repository.UtilisateurRepository;
import com.gestionstockbackend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {

        // Check if the email already exists in the database
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            // Return a BAD_REQUEST with an appropriate message
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        // Encode the password and save the new user
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateurRepository.save(utilisateur);

        // Return a successful response with CREATED status
        return new ResponseEntity<>("Utilisateur enregistré avec succès.", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Utilisateur utilisateur) {
        Utilisateur user = utilisateurRepository.findByEmail(utilisateur.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (passwordEncoder.matches(utilisateur.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(jwtService.generateToken(user.getEmail()));
        } else {
            throw new RuntimeException("Mot de passe incorrect");
        }
    }
}
