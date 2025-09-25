🚀 Full-Stack Flashcard Application
A secure, multi-component web application for creating, managing, and studying flashcard decks. This project demonstrates proficiency across the MERN (MongoDB, Express, React, Node.js) stack.

✨ Key Features
Complete Authentication: User registration, login, and token-based session management using JSON Web Tokens (JWT).

Deck Management (CRUD): Users can create, view, and delete their own flashcard decks.

Card Management (CRUD): Users can add, view, and delete individual flashcards within any of their decks.

Interactive Study View: A core feature allowing users to cycle through cards and flip them to reveal answers.

Data Integrity: Implemented Cascade Delete logic to automatically remove all associated cards when a deck is deleted.

Protected Routes: All deck and card API endpoints are secured by custom middleware.

🛠️ Tech Stack
Back End (API)
Node.js & Express: Used to build a fast, scalable, and secure RESTful API.

MongoDB & Mongoose: Used for persistent, schema-based data storage (NoSQL database).

JWT (JSON Web Token): Implemented for stateless user authentication and securing routes.

Bcrypt: Used for hashing and salting user passwords.

dotenv: Used for managing environment variables (like MONGO_URI and JWT_SECRET).

Front End (Client)
React: Used for building a dynamic, component-based user interface.

Context API: Used for global state management, primarily for authentication (token, login status).

React Router DOM: Used for client-side navigation between pages (Dashboard, Login, Study).

Axios: Used to make authenticated HTTP requests to the back-end API.

📁 Project Structure
The application is split into two main directories:

Directory	Purpose	Key Files
flashcard-app/	Back End (Server)	server.js, routes/, models/, middleware/
client/	Front End (React)	src/App.js, src/components/, src/context/

Export to Sheets
⚙️ Installation and Setup
To run this project locally, follow these steps:

1. Database Setup
Create a free account on MongoDB Atlas and set up a new cluster.

In the "Database Access" section, create a new user with a secure password.

In the "Network Access" section, add your current IP address (or set it to allow access from anywhere for development purposes: 0.0.0.0/0).

Get your connection URI.

2. Back-End Setup (flashcard-app folder)
Navigate to the flashcard-app directory.

Bash

cd flashcard-app
Install dependencies:

Bash

npm install
Create a file named .env in the flashcard-app root directory and add your environment variables:

# Replace <password> with your MongoDB user password
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/flashcard-app?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
Start the Node.js server:

Bash

node server.js
The API should be running on http://localhost:5000.

3. Front-End Setup (client folder)
Navigate to the client directory (relative to your project root).

Bash

cd client
Install dependencies:

Bash

npm install
Start the React development server:

Bash

npm start
The client application should open in your browser at http://localhost:3000.

You can now register a user and begin using the application! Feel free to ask if you want to write a detailed section about Deployment next!