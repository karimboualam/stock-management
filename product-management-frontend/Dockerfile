# Étape 1 : Construire l'application React
FROM node:18 AS build

WORKDIR /app

# Copier le package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans l'image
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Créer l'image finale pour la production
FROM nginx:alpine

# Copier les fichiers de build générés par React vers le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
