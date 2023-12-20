# Noteyfy App

## Overview

Noteyfy is a lightweight and fast note-taking application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It is designed to provide a seamless and efficient note-taking experience for users who prioritize speed and simplicity.

## Features

- **Fast and Lightweight:** The application is optimized for speed, allowing users to quickly create, edit, and access their notes without any lag.
  
- **Responsive Design:** FastNote is built with a responsive design, ensuring a consistent and user-friendly experience across various devices and screen sizes.

- **User Authentication:** Secure user authentication system to protect user data and ensure private note storage.

- **Real-time Updates:** Utilizes WebSocket technology for real-time updates, enabling collaborative note editing and instant synchronization across devices.

- **Intuitive Interface:** The user interface is designed to be intuitive and user-friendly, making note-taking a hassle-free experience.

## Tech Stack

- **Frontend:**
  - React
  - Redux for state management
  - Axios for HTTP requests
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for data storage
  
- **Authentication:**
  - JSON Web Tokens (JWT) for secure authentication
  
- **Real-time Updates:**
  - WebSocket

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/suseendran93/note-taking-mern-app.git
   cd note-taking-mern-app
   ```
2. **Install Dependencies:**
   ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
     ```
3. **Set Up Environment Variables:**
  - Create a .env file in the server directory and configure MongoDB connection details and other necessary variables. You can use the .env.example file as a template.
5. **Run the Application:**
   ```bash
   # Start the backend server
    cd server
    npm start

    # Start the frontend development server
    cd ../client
    npm start
   ```
6. **Open the Application:**
  - Open your browser and go to http://localhost:3000 to access Noteyfy.

# Contributing
Contributions are welcome! Feel free to open issues, submit pull requests, or suggest new features. Please follow the Contributing Guidelines for details.

# License
No License

Feel free to incorporate this section into your existing README file. If you have any additional details or specific commands related to your project, make sure to include them in the appropriate sections.

