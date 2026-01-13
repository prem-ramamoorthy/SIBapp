# SIBapp

## Overview

SIBapp is a role-based organizational management platform designed to digitally manage members, chapters, regions, events, meetings, and activity analytics for a structured association.  
It centralizes governance workflows, improves transparency, and provides data-driven insights for different leadership roles.

The application supports multi-level access control (Members, Coordinators, Presidents, Admins) and combines dashboards, analytics, and workflow automation in a single system.

---

## Tech Stack

### Frontend

- **React (Vite)**
- **React Router DOM**
- **Tailwind CSS**
- **Recharts** (analytics & graphs)
- **Firebase SDK** (authentication & storage initialization)
- **GSAP** (animations)

### Tooling & Deployment

- **Vite**
- **ESLint**
- **Vercel** (deployment)

### Backend (External)

- **Custom REST API**
- **Session-based authentication** (cookies)
- **Role-based authorization**

> **Note:** Backend and database are maintained as a separate service and are not part of this repository.

---

## Key Features

- Role-based dashboards (Member, Coordinator, President, Admin)
- Secure session-based authentication
- Chapter, region, and vertical management
- Member directory with advanced filtering
- Event and meeting management
- Activity tracking (M2M, Referrals, TYFTB)
- Analytics and reporting dashboards
- Notification and alert system
- Public and private portals
- Media-rich galleries and assets

---

## Project Architecture (High Level)

```
Browser
    ↓
React SPA (SIBapp)
    ↓
Backend REST API
    ↓
Database & Auth System
```

- **Frontend** handles UI, routing, and API consumption
- **Backend** owns authentication, authorization, and business logic
- **Database** stores members, activities, events, analytics, and media metadata
- The frontend never directly accesses the database.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (required for full functionality)
- Environment variables configured

### Installation

```bash
git clone https://github.com/your-username/SIBapp.git
cd SIBapp
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APIKEY="your-firebase-api-key"
VITE_AUTHDOMAIN="your-firebase-auth-domain"
VITE_PROJECTID="your-firebase-project-id"
VITE_STORAGEBUCKET="your-firebase-storage-bucket"
VITE_MESSAGINGSENDERID="your-firebase-messaging-sender-id"
VITE_APPID="your-firebase-app-id"
VITE_MEASUREMENTID="your-firebase-measurement-id"
VITE_BACKEND_SERVER="https://api.senguntharinbusiness.in"
```

### Run Locally

```bash
npm run dev
```

The app will be available at:  
[http://localhost:5173](http://localhost:5173)

---

## Folder Structure

```
SIBapp/
├─ public/              # Static assets and images
├─ src/
│  ├─ hooks/            # Auth, routing, and data hooks
│  ├─ utils/            # Utility and helper functions
│  ├─ Components/       # Reusable UI components
│  ├─ Admin/            # Admin portal
│  ├─ Members/          # Member directory & analytics
│  ├─ ChapterPage/      # Chapter-level views
│  ├─ Coordinatorsportal/
│  ├─ PresidentPortal/
│  ├─ MyActivity/       # Activity tracking
│  ├─ Meetings/         # Meetings management
│  ├─ ProfilePage/
│  ├─ Settings/
│  ├─ SigninPage/
│  ├─ NotificationPanel/
│  └─ src1/             # Legacy public/marketing site
├─ vite.config.js
├─ package.json
└─ README.md
```

---

## Contribution Guide

We welcome contributions from the community.

Please read the contribution guidelines before submitting a pull request:

➡️ [CONTRIBUTING.md](CONTRIBUTING.md)

**General guidelines:**

- Follow existing folder and naming conventions
- Write clear commit messages
- Test your changes before submitting
- Open an issue before working on major changes

  Contributions are welcome for:

- Bug fixes
- New features
- Documentation improvements
- Performance and security enhancements


---

## Community & Contact

- **Author:** Prem Kumar R  
- **GitHub:** [https://github.com/prem-ramamoorthy](https://github.com/prem-ramamoorthy)
- **email:** prem2005.developer@gmail.com  
- **Project Discussions:** Use GitHub Issues and Pull Requests

For major changes, open an issue first to discuss your proposal.

---


## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
