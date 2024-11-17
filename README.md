Documentation pour démarrer le projet.

Prérequis.

Node.js.

MongoDB.

RabbitMQ.

Étapes pour démarrer le projet.

1. Cloner le projet.

git clone <Microservice>.

cd <nom-du-repository>.

2. Installer les dépendances globales.

Dans le dossier principal du projet, exécutez :

npm install.

3. Installer les dépendances pour chaque service.

Ensuite, accédez à chaque sous-dossier des services et installez les dépendances spécifiques :

cd service-annonce.

npm install.

cd /service-listing.

npm install.

cd /service-consultation.

npm install.

cd /service-location.

npm install.

cd /car-rental-frontend.

npm install.

4. Démarrer MongoDB et RabbitMQ.

MongoDB : Démarrez MongoDB via le gestionnaire de services.

RabbitMQ : Démarrez RabbitMQ via votre gestionnaire de services.

Assurez-vous que les deux services fonctionnent correctement.

5. Démarrer tous les services et le frontend.

Revenez dans le dossier principal du projet et lancez tous les services simultanément avec la commande suivante :

npm run start:all.

Frontend : Accédez à l'application frontend dans votre navigateur via l'adresse suivante :

http://localhost:3000.

Dépendances techniques.

Backend : Chaque microservice est construit en utilisant Node.js et Express.

Frontend : Utilise React.js pour une interface utilisateur dynamique.

Base de données : MongoDB pour stocker les annonces, locations, etc.

Message Broker : RabbitMQ pour la communication entre services.

Assurez-vous d'avoir exécuté npm install dans chaque dossier.

Vous êtes maintenant prêt à utiliser l'application 🎉 !
