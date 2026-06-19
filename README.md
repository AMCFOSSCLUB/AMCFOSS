# AMC FOSS Club Community Portal

A modern, visually stunning, and high-performance community web portal designed for the **AMC FOSS (Free and Open Source Software)** club. This platform handles event management, participant tracking, and provides role-based spaces for community mentors and office bearers.

---

## 🚀 Key Features

*   **Premium Landing Page**: A responsive, feature-rich interface styled with customized cursors, visual scroll indicators, and animations.
*   **Real-time Event Countdowns**: Live countdown timers for upcoming events dynamically pulled from the Firebase backend.
*   **Role-based Workspaces**:
    *   **Mentors**: Space to guide contributors, assign tasks, and track execution.
    *   **Office Bearers**: Tools to manage the event lifecycle, monitor registrations, and post announcements.
*   **Responsive Performance**: Highly-optimized scroll progress indicators and loader animations built with performance-first practices.
*   **Auth Integrations**: Secure login/registration restricted to official college email domains.

---

## 🛠️ Tech Stack

*   **Frontend**: React (v19)
*   **Animations**: Framer Motion, AOS (Animate on Scroll)
*   **Styles**: TailwindCSS, Vanilla CSS
*   **Database & Auth**: Firebase (Authentication & Firestore)

---

## ⚙️ Getting Started

### 1. Installation

Clone the repository and install the node dependencies:

```bash
npm install
```

### 2. Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm run build`

Builds the app for production in the `build/` folder. It bundles React in production mode and optimizes the build for the best performance.

---

## 📁 Project Structure

*   `src/foss.jsx` — Core landing page component.
*   `src/components/` — Shared UI elements (CustomCursor, Loader, AuthLayout, etc.).
*   `src/pages/` — Main view pages including `Login`, `Register`, `Events`, `SelectRole`, `MentorDashboard`, and `OfficeDashboard`.
*   `src/context/` — State providers for authentication and database services.
*   `src/firebase.js` — Configuration setup for Firebase services.
