import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from 'react-router';
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import AddNew from './Components/Add-new/AddNew.tsx';
import History from './Components/History/History.tsx';
import Profile from './Components/Profile/Profile.tsx';
import Auth from './Components/Auth/Auth.tsx';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedApp: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <App />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedApp />,
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
