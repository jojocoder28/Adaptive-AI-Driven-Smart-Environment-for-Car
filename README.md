Prototype Video - https://youtu.be/B8KRT6L8Uzs

# AADS - Adaptive AI-Driven Smart Environment

This repository contains both the frontend and backend code for the project. Follow the steps below to set up and run the application.

---

## Prerequisites

Ensure the following are installed on your system before starting:

- [Node.js](https://nodejs.org/) (with npm)
- [Python 3.8+](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)

---

## Getting Started

### 1. Clone the Repository

```bash
https://github.com/jojocoder28/Adaptive-AI-Driven-Smart-Environment-for-Car
cd Adaptive-AI-Driven-Smart-Environment-for-Car
```

2. Setting up the Frontend
Navigate to the Frontend directory:

```bash
Copy code
cd Frontend
```
Install dependencies:

```bash
Copy code
npm install
```
Start the development server:

```bash
Copy code
npm run dev
```
The frontend application will be available at:

```arduino
Copy code
http://localhost:1573
```
3. Setting up the Backend
Navigate to the Backend directory:

```bash
Copy code
cd Backend
```
Install the required Python packages:

```bash
Copy code
pip install -r requirements.txt
```
Start the FastAPI backend server:

```bash
Copy code
uvicorn app:app --host 127.0.0.1 --port 8000
```
The backend API will be accessible at:

```arduino
Copy code
http://127.0.0.1:8000
```

Directory Structure
```bash
Copy code
your-repo-name/
├── Frontend/      # React/Vue/Other frontend framework code
├── Backend/       # FastAPI backend code
├── README.md      # Project setup and instructions
└── requirements.txt # Python dependencies for the backend
```
