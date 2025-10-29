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
import ResetPassword from './ResetPassword/ResetPassword';
import AnimatedRoute from './hooks/AnimatedRoutes';

import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <SignInPage />, errorElement: <NotFound404 /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <AnimatedRoute><Dashboard /></AnimatedRoute> },
      { path: '/members', element: <AnimatedRoute><Members /></AnimatedRoute> },
      { path: '/myactivity', element: <AnimatedRoute><Myactivity /></AnimatedRoute> },
      { path: '/meetings', element: <AnimatedRoute><Meetings /></AnimatedRoute> },
      { path: '/mychapter', element: <AnimatedRoute><Mychapter /></AnimatedRoute> },
      { path: '/settings', element: <AnimatedRoute><Settings /></AnimatedRoute> },
      { path: '/slips', element: <AnimatedRoute><FunctionalPage /></AnimatedRoute> },
      { path: '/profile', element: <AnimatedRoute><Profile /></AnimatedRoute> },
    ]
  },
  { path: '/profile/:id', element: <AnimatedRoute><Profile /></AnimatedRoute> },
  { path: '/reset-password', element: <ResetPassword /> }
]);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
