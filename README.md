# Gestion Stock Project
Projet Fullstack - Backend & Frontend
Ce projet est une application fullstack qui comprend un backend en Java Spring et un frontend en Angular. Ce projet gère l'authentification des utilisateurs et offre des fonctionnalités basiques comme la gestion des profils et des paramètres utilisateur.
Architecture du Projet
L'architecture du projet se compose de deux parties principales :

/ (Racine du projet)
│
├── /back (Backend - API)
│   ├── src/
│   ├── pom.xml (ou build.gradle)
│   └── application.properties
│
├── /front (Frontend - Application Angular)
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md (ce fichier)

Backend (API)
Le backend est développé en Java Spring Boot et sert d'API pour gérer l'authentification, l'inscription des utilisateurs, la gestion des profils et plus encore.

Prérequis
JDK 11 ou supérieur
Maven ou Gradle (en fonction de votre configuration)
Base de données (ex : MySQL, PostgreSQL) configurée dans application.properties


## Lancer le backend
1. Allez dans le dossier `gestion-stock-backend`.
2. Installez les dépendances : `npm install` ou `yarn install`.
3. Lancez le serveur : `npm start` ou `yarn start`.

## Lancer le frontend
1. Allez dans le dossier `front-stock-management`.
2. Installez les dépendances : `npm install` ou `yarn install`.
3. Lancez le frontend : `npm start` ou `yarn start`.
