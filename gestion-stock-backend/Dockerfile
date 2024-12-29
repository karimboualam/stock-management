# Étape 1 : Utilisation de l'image Maven pour construire l'application
FROM maven:3.8.4-openjdk-17 AS build

# Étape 2 : Copier le code source dans le conteneur
WORKDIR /app
COPY . .

# Étape 3 : Construire l'application avec Maven
RUN mvn clean package -DskipTests

# Étape 4 : Utilisation de l'image OpenJDK pour l'exécution
FROM openjdk:17-jdk-slim

# Étape 5 : Copier le fichier JAR depuis l'étape précédente
COPY --from=build /app/target/*.jar /app/app.jar

# Étape 6 : Définir le point d'entrée pour l'exécution de l'application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Exposer le port pour Spring Boot (par défaut 8080)
EXPOSE 8080
