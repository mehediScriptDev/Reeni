import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import AddNew from './Components/Add-new/AddNew.tsx';
import History from './Components/History/History.tsx';
import Profile from './Components/Profile/Profile.tsx';
import Auth from './Components/Auth/Auth.tsx';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "add-new",
        element: <AddNew />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],

    ErrorBoundary: () => <div>There was an error</div>,
  },
  {
    path:'login',
    element:<Auth/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
