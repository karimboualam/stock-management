# Étape 1 : Utiliser une image Node.js officielle
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Exposer le port utilisé par ton application (ici 5000)
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
