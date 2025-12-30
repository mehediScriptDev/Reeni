# 💰 Reeni - reminder (Lending & Borrowing Tracker)

<div align="center">

![Reeni Logo](public/fav.png)

**A modern, bilingual (Bengali) web application to track your lending and borrowing transactions.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live Link](https://reeni-reminder.vercel.app) • [Backend Repo](https://github.com/mehediScriptDev/ReeniServer) • [Report Bug](https://github.com/mehediScriptDev/Reeni/issues) • [Request Feature](https://github.com/mehediScriptDev/Reeni/issues)

</div>

---

## ✨ Features

### 🔐 Authentication
- **Email/Password** registration and login
- **Google Sign-In** with one click
- **Email Verification** to ensure valid email addresses
- Secure session management with Firebase Auth

### 📊 Dashboard
- View all your **lending** (আমি ধার দিয়েছি) and **borrowing** (আমি ধার নিয়েছি) transactions
- **Tab-based navigation** for easy switching between lent and borrowed items
- **Pagination** for handling large datasets
- **Edit & Delete** transactions with confirmation dialogs
- **Mark as Returned** to move items to history

### 📝 Add New Transaction
- Quick form to add new lending or borrowing entries
- Fields: Amount, Person, Due Date, Return Date
- Automatic association with your user account

### 📜 History
- View all completed/returned transactions
- Separate tabs for lent and borrowed history
- Delete old history entries

### 👤 Profile
- View and edit your profile information
- Name, Email, Phone number management
- Sign out functionality

> Note: When a user edits and saves their profile (name or phone) the updated profile is persisted to the browser's `localStorage` under the key `reeni_user_profile`. This is a client-side cache that merges with Firebase user data on load — changes saved here are not automatically sent to the backend unless you explicitly implement server-side profile persistence.

### 🎨 UI/UX
- **Fully responsive** design (mobile, tablet, desktop)
- **Bengali language** interface
- **Skeleton loaders** for smooth loading experience
- **SweetAlert2** for beautiful confirmation dialogs
- Clean, modern design with Tailwind CSS

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Build Tool** | Vite 6 |
| **Authentication** | Firebase Auth |
| **Database** | MongoDB (via Express backend) |
| **State Management** | React Context API |
| **Routing** | React Router 7 |
| **HTTP Client** | Axios |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Alerts** | SweetAlert2 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication enabled
- MongoDB backend server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mehediScriptDev/Reeni.git
   cd Reeni
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory.
   
   > 💬 **Need the environment variables?** Message me or open an issue to request them!
 

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Add-new/        # Add transaction form
│   ├── Auth/           # Login & Registration
│   ├── Dashboard/      # Main transaction list
│   ├── Header/         # Navigation header
│   ├── History/        # Completed transactions
│   ├── Profile/        # User profile management
│   └── Footer/         # App footer
├── context/
│   └── AuthContext.tsx # Authentication state management
├── config/
│   └── api.ts          # API configuration
├── firebase/
│   └── firebase.init.ts # Firebase initialization
├── App.tsx             # Main app component
├── main.tsx            # Entry point with routing
└── ProtectedApp.tsx    # Auth-protected wrapper
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🌐 API Endpoints

The app connects to a backend server at `https://reeni-server.vercel.app`

> 🔗 **Backend Repository:** [github.com/mehediScriptDev/ReeniServer](https://github.com/mehediScriptDev/ReeniServer)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/new-list?userId=` | Get user's transactions |
| POST | `/new-list` | Create new transaction |
| PUT | `/new-list/:id` | Update transaction |
| DELETE | `/new-list/:id` | Delete transaction |
| GET | `/history?userId=` | Get user's history |
| POST | `/history` | Add to history |
| DELETE | `/history/:id` | Delete history item |

---

## 🔒 Security

- All data is user-specific (filtered by Firebase UID)
- Email verification required for new accounts
- Secure Firebase Authentication
- Environment variables for sensitive configuration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

> 💬 **Want to contribute or have questions?** Message me or open an issue - I'd love to help!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mehedi**

- GitHub: [@mehediScriptDev](https://github.com/mehediScriptDev)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ in Bangladesh 🇧🇩

</div>