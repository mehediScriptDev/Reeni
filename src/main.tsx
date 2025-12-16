import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import AddNew from './Components/Add-new/AddNew.tsx';
import History from './Components/History/History.tsx';

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
