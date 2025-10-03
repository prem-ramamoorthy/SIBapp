import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'

import Dashboard from './MainPage/Dashboard';
import Members from './Members/Members';
import Myactivity from './MyActivity/Myactivity';
import Meetings from './Meetings/Meetings';
import Mychapter from './ChapterPage/Mychapter';
import Profile from './ProfilePage/Profile';
import Settings from './Settings/Settings';
import NotFound404 from './Notfound/Notfound';
import FunctionalPage from './ButtonPages/FunctionalPage'
import SignInPage from './SigninPage/SignInPage';
import ProtectedRoute from './hooks/protectedRoute';

import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <SignInPage />, errorElement: <NotFound404 /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/members', element: <Members /> },
      { path: '/myactivity', element: <Myactivity /> },
      { path: '/meetings', element: <Meetings /> },
      { path: '/mychapter', element: <Mychapter /> },
      { path: '/profile', element: <Profile /> },
      { path: '/settings', element: <Settings /> },
      { path: '/slips', element: <FunctionalPage /> }
    ]
  },
  { path: '/logout', element: <SignInPage /> }
]);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
