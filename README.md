🚀 Full-Stack Flashcard Application
A secure, multi-component web application for creating, managing, and studying user-owned flashcard decks. This project demonstrates full-stack proficiency across the MERN (MongoDB, Express, React, Node.js) stack.

✨ Key Features
Complete Authentication: User registration, login, and token-based session management using JSON Web Tokens (JWT).

Deck Management (CRUD): Users can create, view, modify (not implemented), and delete their own flashcard decks.

Card Management (CRUD): Users can add, view, and delete individual flashcards within any of their decks.

Interactive Study View: A core feature allowing users to cycle through cards, flip them to reveal answers, and track session progress.

Protected Routes: All deck and card API endpoints are secured by custom JWT middleware.

Data Integrity: Implemented Cascade Delete logic to automatically remove all associated cards when a deck is deleted.

Modern UI: Clean, minimalist styling using a soft, deep purple color palette.

🛠️ Tech Stack
Back End (API)
Technology	Purpose
Node.js & Express	Built a secure, RESTful API.
MongoDB & Mongoose	Data modeling, persistence, and complex queries.
JWT (JSON Web Token)	Stateless user authentication and route protection.
Bcrypt	Password hashing and salting.

Export to Sheets
Front End (Client)
Technology	Purpose
React	Component-based UI and state management.
Context API	Global state management for authentication.
React Router DOM	Client-side routing (/login, /dashboard, /study/:id).
Axios	Making authenticated HTTP requests to the API.

Export to Sheets
⚙️ Installation and Setup
To run this project locally, you must have Node.js installed and a MongoDB Atlas account for database access.

1. Clone the Repository
Bash

git clone YOUR_GITHUB_REPO_URL
cd full-stack-MERN-flashcard-application
2. Back-End Setup (flashcard-app folder)
Navigate to the back-end directory:

Bash

cd flashcard-app
Install dependencies:

Bash

npm install
Create a file named .env in the flashcard-app directory and add your secret variables:

Code snippet

# Get this URI from your MongoDB Atlas cluster
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/flashcard-app?retryWrites=true&w=majority

# A random, long string for token security
JWT_SECRET=your_super_secret_key_here 

# Port for the API
PORT=5000
Start the Node.js server:

Bash

node server.js
3. Front-End Setup (client folder)
Navigate back to the root, then into the client directory:

Bash

cd ..
cd client
Install dependencies:

Bash

npm install
Start the React development server:

Bash

npm start
The application will open in your browser at http://localhost:3000, connecting to the API running on port 5000.

💡 Usage
Register: Create a new account via the /register route.

Login: Log in to receive your JWT.

Dashboard: On /dashboard, click the + Create New Deck button.

Study: Click Study Deck to enter the interactive study session and test yourself!
