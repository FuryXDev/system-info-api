# Système API Monitoring

Une API simple en **Node.js** pour surveiller les ressources système de votre machine. Ce projet utilise le module `systeminformation` pour récupérer des informations système et `express` pour créer une API RESTful. L'API fournit des données détaillées sur le système, le CPU, la mémoire, le disque, le réseau, les processus et bien plus encore.

## Fonctionnalités

Cette API offre les fonctionnalités suivantes :

- **État du serveur** (`/status`) : Vérifie si le serveur est en ligne et fournit des informations de base.
- **Ressources système** (`/resources`) : Fournit des informations sur l'utilisation du CPU, de la mémoire, du disque, et du swap.
- **Processus** (`/processes`) : Liste tous les processus en cours sur le système.
- **Réseau** (`/network`) : Affiche les interfaces réseau et les statistiques de connexion.
- **GPU** (`/gpu`) : Informations sur les unités de traitement graphique (si disponible).
- **Bande passante** (`/bandwidth`) : Donne des informations sur l'utilisation de la bande passante réseau (octets envoyés et reçus).

## Prérequis

Avant de pouvoir utiliser cette API, assurez-vous d'avoir installé **Node.js** et **npm**. Vous pouvez télécharger Node.js depuis [nodejs.org](https://nodejs.org).

## Installation

1. Clonez ce dépôt sur votre machine :

   ```bash
   git clone https://github.com/yourusername/system-info-api.git
   cd system-info-api
   ```
   
2. Installez les dépendances nécessaires :

  ```bash
  npm install
  ```

3. Lancez l'API en exécutant la commande suivante :

  ```bash
  npm start
  ```

  L'API sera maintenant accessible à l'adresse suivante : http://localhost:3000.




