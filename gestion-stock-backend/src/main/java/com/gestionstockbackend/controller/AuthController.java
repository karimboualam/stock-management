package com.gestionstockbackend.controller;

import com.gestionstockbackend.model.Utilisateur;
import com.gestionstockbackend.repository.UtilisateurRepository;
import com.gestionstockbackend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
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

        // Valider le rôle
        String role = payload.get("role").toUpperCase();
        if (!role.equals("USER") && !role.equals("ADMIN") && !role.equals("MANAGER")&& !role.equals("ROLE_MANAGER")) {
            return new ResponseEntity<>("Invalid role specified", HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<Map<String, String>> login(@RequestBody Utilisateur utilisateur, HttpServletResponse response) {
        Utilisateur user = utilisateurRepository.findByEmail(utilisateur.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (passwordEncoder.matches(utilisateur.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setDomain("localhost");
            cookie.setMaxAge(60 * 60 * 24);

          //  response.addHeader("Set-Cookie", String.format("token=%s; HttpOnly; Secure; Path=/; Domain=localhost; Max-Age=%d; SameSite=None", token, 60 * 60 * 24));
          //  response.addHeader("Set-Cookie", String.format("token=%s; HttpOnly; Path=/; Domain=localhost; Max-Age=%d; SameSite=Lax", token, 60 * 60 * 24));
            response.addHeader("Set-Cookie", String.format("token=%s; HttpOnly; Secure; Path=/; Domain=localhost; Max-Age=%d; SameSite=None", token, 60 * 60 * 24));
            response.addCookie(cookie);

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("firstName", user.getFirstName());
            responseBody.put("lastName", user.getLastName());
            responseBody.put("userId", user.getId().toString());

            return ResponseEntity.ok(responseBody);
        }
        throw new RuntimeException("Mot de passe incorrect");
    }
}