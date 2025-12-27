import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import { AuthProvider } from './context/AuthContext';

// Import Dashboard eagerly so the app shell + dashboard skeleton render immediately
import Dashboard from './Components/Dashboard/Dashboard';
const AddNew = lazy(() => import('./Components/Add-new/AddNew.tsx'));
const History = lazy(() => import('./Components/History/History.tsx'));
const Profile = lazy(() => import('./Components/Profile/Profile.tsx'));
const Guide = lazy(() => import('./Components/Guide/Guide.js'));
const Auth = lazy(() => import('./Components/Auth/Auth.tsx'));
import ProtectedApp from './ProtectedApp';
import DashboardSkeleton from './Components/Common/DashboardSkeleton';


// App-level skeleton fallback shown while lazy routes load.
// This avoids a white flash between the initial HTML splash and the app render,
// and provides an immediate skeleton similar to the dashboard.
// No global fallback here — render the app shell immediately and let
// route components show their own skeletons while data loads.
const AppFallback = () => null;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedApp />
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "add-new",
        element: (
          <Suspense fallback={null}>
            <AddNew />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={null}>
            <History />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        ),
      }
      ,
      {
        path: "guide",
        element: (
          <Suspense fallback={null}>
            <Guide />
          </Suspense>
        ),
      }
    ],

    ErrorBoundary: () => <div>There was an error</div>,
  },
  {
    path:'login',
    element: (
      <Suspense fallback={<AppFallback />}>
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
