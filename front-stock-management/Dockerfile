# Utilisez une version compatible de Node.js (au moins v18)
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet Angular
RUN npm run build --prod

# Exposer le port sur lequel l'application frontend écoute
EXPOSE 4200

# Commande pour démarrer l'application Angular
#CMD ["npm", "start"]
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

