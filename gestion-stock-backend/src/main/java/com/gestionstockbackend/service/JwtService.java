package com.gestionstockbackend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;

import com.gestionstockbackend.model.Utilisateur; // Assurez-vous que ce modèle est importé


import java.security.Key;
import java.util.Date;

import static javax.crypto.Cipher.SECRET_KEY;

@Service
public class JwtService {
   // private final String SECRET_KEY = "secret-key";  // Utilisez une clé plus robuste pour la production
    // Instead of using a hardcoded secret key, we will use a secure method to generate it
   // private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Generate a 256-bit key

    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(Utilisateur user) {
 //       Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());  // Création d'une clé pour signer le JWT
        System.out.println("User ID: " + user.getId()); // Vérifiez si l'ID est correct

        return Jwts.builder()
               // .setSubject(email)
               // .setSubject(user.getEmail()) // L'email comme sujet
                .setSubject(user.getId().toString()) // L'email comme sujet

                .claim("firstName", user.getFirstName()) // Ajout de firstName
                .claim("lastName", user.getLastName())   // Ajout de lastName
                .claim("rôles", user.getRole())   // Ajout de role
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 day
              //  .signWith(SECRET_KEY, SignatureAlgorithm.HS256)  // Use the secure key
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)

           //     .signWith(key, SignatureAlgorithm.HS256)  // Utilisation de la nouvelle méthode
                .compact();
    }
}
