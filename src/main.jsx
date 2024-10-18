import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import
  {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { UserProvider } from '../src/components/UserContext';
import Users from '../src/components/Users';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Users />
      </Suspense>
    ),
    loader: () => fetch("http://localhost:3000/users"),
  },
]);

createRoot(document.getElementById('root')).render(
  <UserProvider> 
    <RouterProvider router={router} />
  </UserProvider>
);
