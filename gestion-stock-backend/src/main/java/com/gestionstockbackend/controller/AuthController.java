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

import java.util.Map;

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
    public ResponseEntity<String> register(@RequestBody Map<String, String> payload) {

        // Vérifier si l'email existe déjà dans la base de données
        if (utilisateurRepository.findByEmail(payload.get("email")).isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        // Vérifier la correspondance entre password et confirmPassword
        if (!payload.get("password").equals(payload.get("confirmPassword"))) {
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        // Créer un nouvel utilisateur
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(payload.get("email"));  // L'email est pris tel quel sans validation
        utilisateur.setPassword(passwordEncoder.encode(payload.get("password")));
        utilisateur.setRole(payload.get("role"));
        utilisateur.setFirstName(payload.get("firstName"));
        utilisateur.setLastName(payload.get("lastName"));
        utilisateur.setGender(payload.get("gender"));
        utilisateur.setPasswordVerified(true);  // Marquer le mot de passe comme confirmé

        // Enregistrer l'utilisateur
        utilisateurRepository.save(utilisateur);

        // Retourner une réponse de succès
        return new ResponseEntity<>("Utilisateur enregistré avec succès.", HttpStatus.CREATED);
    }

    @PostMapping("/login")
   // public ResponseEntity<String> login(@RequestBody Utilisateur utilisateur) {
        public ResponseEntity<Map<String, Object>> login(@RequestBody Utilisateur utilisateur) {

            Utilisateur user = utilisateurRepository.findByEmail(utilisateur.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (passwordEncoder.matches(utilisateur.getPassword(), user.getPassword())) {
            // Retourner le token JWT
          //  return ResponseEntity.ok(jwtService.generateToken(user.getEmail()));
            // Générer le token JWT avec firstName et lastName
            String token = jwtService.generateToken(user);
            // Construire la réponse avec le token, firstName et lastName


            Map<String, Object> response = Map.of(
                    "token", token,
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName()
            );

            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Mot de passe incorrect");
        }
    }
}
