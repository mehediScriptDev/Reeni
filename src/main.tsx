import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import { AuthProvider } from './context/AuthContext';

// Lazy-load route components and Auth for code-splitting
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard.tsx'));
const AddNew = lazy(() => import('./Components/Add-new/AddNew.tsx'));
const History = lazy(() => import('./Components/History/History.tsx'));
const Profile = lazy(() => import('./Components/Profile/Profile.tsx'));
const Auth = lazy(() => import('./Components/Auth/Auth.tsx'));
const ProtectedApp = lazy(() => import('./ProtectedApp.tsx'));

const LoadingFallback = () => (
  <div className="p-6 text-center text-gray-600">লোড হচ্ছে…</div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedApp />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "add-new",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddNew />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <History />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        ),
      }
    ],

    ErrorBoundary: () => <div>There was an error</div>,
  },
  {
    path:'login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Auth />
      </Suspense>
    )
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
