
---

## 🛠️ Commandes Git pour l’ajouter
À la racine de ton projet (`pharma-app/`), exécute :

```bash
# Créer le fichier README.md avec le contenu
echo "# Pharma Management App

Application complète de gestion de pharmacie composée de :
- **Frontend Angular** : interface utilisateur moderne et responsive
- **Backend Spring Boot** : API REST sécurisée et robuste

## 🚀 Technologies utilisées
- Angular 15 (TypeScript, RxJS)
- Spring Boot 4 (Java, REST API)
- MySQL (base de données)
- GitHub pour le versionnement

## 📂 Structure du projet
pharma-app/
│── pharma-dashboard/   # Application Angular
│── backendt/ # Application Spring Boot
│── README.md
│── .gitignore

## ⚙️ Installation et lancement

### 1. Frontend (Angular)
cd frontend-angular
npm install
ng serve

Accéder à l’application : http://localhost:4200

### 2. Backend (Spring Boot)
cd backend-springboot
./mvnw spring-boot:run

API disponible sur : http://localhost:8087

## 🛡️ Fonctionnalités principales
- Gestion des patients (création, scan QR code, affichage)
- Gestion des ordonnances (ajout, affichage, fichier attaché)
- Audit et sécurité des opérations
- Interface utilisateur claire et professionnelle

## 👨‍💻 Auteur
Développé par Omar, ingénieur logiciel spécialisé en Angular et Spring Boot." > README.md

# Ajouter et pousser sur GitHub
git add README.md
git commit -m "Add professional README.md"
git push
