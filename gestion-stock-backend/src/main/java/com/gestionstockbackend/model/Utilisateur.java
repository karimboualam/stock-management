package com.gestionstockbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    @NotBlank(message = "Le rôle est obligatoire")
    private String role;

    @NotBlank(message = "Le nom est obligatoire")
    private String lastName; // Nom

    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName; // Prénom

    @NotBlank(message = "Le sexe est obligatoire")
    @Column(nullable = false, length = 255)
    private String gender = "unknown"; // Valeur par défaut pour éviter les conflits

    private boolean isPasswordVerified = false; // Indicateur pour vérifier si le mot de passe est confirmé

  //  public static final String ROLE_USER = "USER";
   // public static final String ROLE_ADMIN = "ADMIN";
    //public static final String ROLE_MANAGER = "MANAGER";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_MANAGER = "ROLE_MANAGER";


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isPasswordVerified() {
        return isPasswordVerified;
    }

    public void setPasswordVerified(boolean passwordVerified) {
        isPasswordVerified = passwordVerified;
    }

    public Utilisateur() {
    }

    public Utilisateur(Long id, String email, String password, String role, String lastName, String firstName, String gender) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.lastName = lastName;
        this.firstName = firstName;
        this.gender = gender;
        this.isPasswordVerified = false;  // Valeur par défaut
    }

    public Utilisateur(Long id, String email, String password, String role, String lastName, String firstName, String gender, boolean isPasswordVerified) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.lastName = lastName;
        this.firstName = firstName;
        this.gender = gender;
        this.isPasswordVerified = isPasswordVerified;
    }
}
