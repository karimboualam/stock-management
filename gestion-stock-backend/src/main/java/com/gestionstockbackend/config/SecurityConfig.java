    package com.gestionstockbackend.config;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    @Configuration
    public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable()) // Nouvelle syntaxe pour désactiver CSRF
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Autorise ces routes
                            // Autoriser l'accès sans authentification pour récupérer tous les produits
                            .requestMatchers(HttpMethod.GET, "/api/produits").permitAll()

                            // Exiger l'authentification pour ajouter, modifier ou supprimer un produit
                            .requestMatchers(HttpMethod.POST, "/api/produits").authenticated() // POST pour ajouter un produit
                            .requestMatchers(HttpMethod.PUT, "/api/produits/**").authenticated() // PUT pour modifier un produit
                            .requestMatchers(HttpMethod.DELETE, "/api/produits/**").authenticated() // DELETE pour supprimer un produit

                            // Les autres requêtes doivent être authentifiées
                            .anyRequest().authenticated() // Les autres requêtes nécessitent une authentification
                    );
            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
