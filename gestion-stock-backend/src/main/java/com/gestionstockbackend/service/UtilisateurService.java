    package com.gestionstockbackend.service;

    import com.gestionstockbackend.model.Utilisateur;
    import com.gestionstockbackend.repository.UtilisateurRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class UtilisateurService {
        @Autowired
        private UtilisateurRepository utilisateurRepository;

        public Utilisateur createUser(Utilisateur utilisateur) {
            return utilisateurRepository.save(utilisateur);
        }

        public Utilisateur updateUser(Long id, Utilisateur utilisateurDetails) {
            Utilisateur utilisateur = utilisateurRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            utilisateur.setFirstName(utilisateurDetails.getFirstName());
            utilisateur.setLastName(utilisateurDetails.getLastName());
            utilisateur.setEmail(utilisateurDetails.getEmail());
            utilisateur.setGender(utilisateurDetails.getGender());
            utilisateur.setRole(utilisateurDetails.getRole());

            return utilisateurRepository.save(utilisateur);
        }
        public void deleteUser(Long id) {
            Utilisateur utilisateur = utilisateurRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            utilisateurRepository.delete(utilisateur);
        }
        public List<Utilisateur> getAllUsers() {
            return utilisateurRepository.findAll();
        }
        public Utilisateur getUserById(Long id) {
            return utilisateurRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        }

    }
