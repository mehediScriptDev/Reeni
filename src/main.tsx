import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard Page</div>,
      },
      {
        path: "add-new",
        element: <div>Add New Page</div>,
      },
      {
        path: "history",
        element: <div>History Page</div>,
      },
      {
        path: "profile",
        element: <div>Profile Page</div>,
      }
    ],
    ErrorBoundary: () => <div>There was an error</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
