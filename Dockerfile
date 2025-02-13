# Utiliser une image de Node.js légère basée sur Alpine
FROM node:alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json avant le reste du code
COPY package*.json ./

# Installer les dépendances nécessaires
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Exposer le port sur lequel l'application écoute
EXPOSE 4200

# Démarrer l'application Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
