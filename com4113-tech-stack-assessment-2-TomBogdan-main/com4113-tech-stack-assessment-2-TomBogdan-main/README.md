## Github Repository Link

https://github.com/CS-LTU/com4113-tech-stack-assessment-1-2025-26-TomBogdan?tab=readme-ov-file

*I have utilised version control throughout this project to allow me to safely experiment with features, roll back changes when necessary, and maintain a clear record of development progress over time.*

---

# README

## Project Overview

Skill Swap Hub is a community-driven web platform where users can share their hobbies, skills, and learning resources. The aim of the project is to create a collaborative environment that allows users to learn from one another and exchange useful knowledge in an accessible and structured way.

The project initially began as a front-end focused prototype, but was later developed into a **full-stack web application** with backend logic, database persistence, and secure user authentication.

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

After further research, I selected **React** for frontend development due to its component-based architecture and relatively shallow learning curve. For the backend, I chose **Flask**, as it provides a lightweight and flexible framework that allows clear separation of application logic. **MongoDB** was chosen as the database because its schema-less structure suits the evolving nature of user profiles and shared resources.

### Final Tech Stack

- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** MongoDB  
- **Authentication:** Werkzeug password hashing  
- **Styling:** Bootstrap  

This stack enabled efficient development while following modern industry practices.

---

## Project Planning

My main objective from the start was to reach a stable **Minimum Viable Product (MVP)** before refining and expanding the application. I aimed for a minimal but clean design, using simple colour choices to keep the interface accessible and intuitive.

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

Check versions:

```bash
node -v
npm -v
python --version