## Github Repository Link

https://github.com/TomBogdan/Tech-Stack-Assessment-2

*I have utilised version control throughout this project to allow me to safely experiment with features, roll back changes when necessary, and maintain a clear record of development progress over time.*

---

# README

## Project Overview

Skill Swap Hub is a community-driven web platform where users can share their hobbies, skills, and learning resources. The aim of the project is to create a collaborative environment that allows users to learn from one another and exchange useful knowledge in an accessible and structured way.

The project initially began as a front-end focused prototype, but was later developed into a full-stack web application with backend logic, database persistence, and secure user authentication.

---

## Features

- User account creation and secure login system  
- Password hashing and authentication using industry standards  
- Protected pages that require authentication  
- Persistent user profiles stored in MongoDB  
- Share resources including title, description, category, and link  
- Dynamically loaded resources from the backend  
- Search and category filtering functionality  
- Responsive design for desktop and mobile devices  

---

## Choice of Tech Stack

When deciding on a tech stack, I initially considered LAMP due to my familiarity with Linux-based environments. I also explored the MEAN stack because of its JavaScript-centric workflow and integration with Node.js and Express.

After further research, I selected React for frontend development due to its component-based architecture and relatively shallow learning curve. For the backend, I chose Flask, as it provides a lightweight and flexible framework that allows clear separation of application logic. MongoDB was chosen as the database because its schema-less structure suits the evolving nature of user profiles and shared resources.

### Final Tech Stack

- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** MongoDB  
- **Authentication:** Werkzeug password hashing  
- **Styling:** Bootstrap  

This stack enabled efficient development while following modern industry practices.

---

## Project Planning

My main objective from the start was to reach a stable Minimum Viable Product (MVP) before refining and expanding the application. I aimed for a minimal but clean design, using simple colour choices to keep the interface accessible and intuitive.

As development progressed, the focus shifted towards backend integration, authentication, and persistent data storage. Implementing secure login, route protection, and database communication proved to be the most challenging aspects of the project, but also the most valuable in terms of learning.

In the long term, Skill Swap Hub is intended to be a safe and welcoming platform where users can regularly engage with others who share similar interests.

---

## Installation Instructions

Before running the project, ensure you have the following installed:

- Node.js (v18+)  
- npm  
- Python (v3.10+)  
- pip  
- Git  
- Visual Studio Code  
- A modern browser (Chrome or Firefox)
- Flask
- Flask CORS
- Pymongo
- Werkzeug  

Check versions:

```bash
node -v
npm -v
python --version
```

## Front-end Setup (React)

```bash
cd skill-swap-hub
npm install
npm start
```

The React front-end runs at: http://localhost:3000

## Back-end Setup (Flask)

```bash
cd backend
python app.py
```

**Both servers must be running simultaneously in order for the site to have full functionality.**

## User Journey

### Public Pages

- Login - Existing users authenticate
- Create Profile - New users register
- About/Contact Us -Informational pages

### Protected Pages

- Home - Browse and search shared resources
- Share Resource - Submit new learning resources
- Profile - View and edit user profile

**Unauthenticated users attempting to access protected pages are automatically redirected to the login page.**

## Authentication and Session Management

Flask and MongoDB are used on the server side to handle user authentication. Before being stored in the database, passwords are hashed using Werkzeug's generate_password_hash() function. Passwords in plain text are never saved.
Check_password_hash() checks the credentials during login. When the user is successfully logged in, a session identifier (their email address) is saved on the client side using localStorage. This keeps the authentication state even when the page is refreshed.
Using a custom ProtectedRoute component in React, route protection is enforced so that only logged-in users can use the main features of the app. A logout mechanism deletes session data and stops access right away.

## Server-Side Validation & Error Handling

The backend validates incoming data to ensure required fields are present before writing to the database. Invalid requests return appropriate HTTP status codes. Sensitive fields such as passwords are excluded from API responses.

## Database Design

### Users Collection

- Name
- Email
- Password (hashed)
- Avatar
- Pronouns
- Phone Number

### Resources collection

- Title
- Description
- Category
- Link

**MongoDB was chosen for its flexibility and ease of iteration during development.**

## Legal and Ethical Considerations

This project follows GDPR principles by minimising stored personal data and securely handling user credentials. Password hashing ensures that sensitive information is protected in the event of a data breach. Authentication and route protection prevent unauthorised access to user data.

**Ethically, the platform is designed to promote respectful interaction and responsible sharing of content.**

## Risk Assessment

| **Risk** | **Impact** | **Mitigation** |
| :--- | :---: | ---: |
| Plaintext Password Storage | High | Password Hashing with Werkzeug |
| Unauthorised Access | High | Protected routes and authentication |
| Session Misuse | Medium | Logout Functionality |
| CORS Related Attacks | Medium | Controlled Flask-CORS configuration |

## Reflection on Challenges

The most significant challenges involved integrating the React frontend with the Flask backend and MongoDB database. Configuring CORS, managing authentication flow, and implementing protected routes required careful debugging and iterative refinement.
Implementing secure authentication highlighted the importance of separating frontend and backend responsibilities and following best practices for credential handling.

## Future Improvements

- JWT or cookie-based authentication
- Server-side search queries
- Resource bookmarking and voting
- Cloud deployment and scalability enhancements
- Content moderation tools

## Conclusion

This project successfully demonstrates the transition from a static frontend prototype to a secure, data-driven full-stack web application. It demonstrates an equilibrium between elegant looking web applications and efficient databases to manage user data.



**This assignment used generative AI in the following ways for the purposes of completing the
assignment; research, planning, feedback and editing.**