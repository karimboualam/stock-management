    package com.gestionstockbackend.config;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


    @Configuration
    public class SecurityConfig  implements WebMvcConfigurer {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable()) // Désactiver CSRF
                    .authorizeHttpRequests(auth -> auth
   //                         .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Autoriser ces routes sans authentification

                         .requestMatchers("/api/auth/register", "/api/auth/login", "/api/utilisateurs/**", "/api/users/**").permitAll() // Autoriser ces routes sans authentification


                            // Accès pour le rôle ADMIN : CRUD sur produits et commandes
                           // .requestMatchers("/api/utilisateurs/**").hasRole("ADMIN")
                         //  .requestMatchers("/api/users/**").hasRole("ADMIN")
                                    .requestMatchers("/api/utilisateurs/**").hasRole("MANAGER")
                                    .requestMatchers("/api/users/**").hasRole("MANAGER")
                         /*   .requestMatchers(HttpMethod.POST, "/api/produits").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/produits/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/produits/**").hasRole("ADMIN")
                            .requestMatchers("/api/commandes/**").hasRole("ADMIN") */

                            // Accès pour le rôle MANAGER : accès complet (CRUD sur utilisateurs, produits, commandes)
                        //    .requestMatchers("/api/utilisateurs/**").hasRole("MANAGER")
                         //   .requestMatchers("/api/users/**").hasRole("MANAGER") // Ajouté pour les utilisateurs

                        /*    .requestMatchers(HttpMethod.GET, "/api/produits/**").hasRole("MANAGER")
                            .requestMatchers(HttpMethod.POST, "/api/produits/**").hasRole("MANAGER")
                            .requestMatchers(HttpMethod.PUT, "/api/produits/**").hasRole("MANAGER")
                            .requestMatchers(HttpMethod.DELETE, "/api/produits/**").hasRole("MANAGER")
                            .requestMatchers("/api/commandes/**").hasRole("MANAGER")*/

                            // Accès pour le rôle USER : seulement GET des produits et POST commandes
                       //     .requestMatchers(HttpMethod.GET, "/api/produits").hasRole("USER")
                     //       .requestMatchers(HttpMethod.POST, "/api/commandes").hasRole("USER")

                            // Les autres requêtes doivent être authentifiées
                            .anyRequest().authenticated()
                    );
            return http.build();
        }


        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200","http://localhost:3000", "http://localhost:5000")  // Autoriser l'origine de votre frontend Angular
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Autoriser les méthodes HTTP
                    .allowedHeaders("*")  // Autoriser tous les headers
                    .allowCredentials(true);  // Permet les cookies si nécessaire
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
