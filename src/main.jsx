import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'

import Dashboard from './MainPage/Dashboard';
import Members from './Members/Members';
import Myactivity from './MyActivity/Myactivity';
import Meetings from './Meetings/Meetings';
import Mychapter from './ChapterPage/Mychapter';
import Profile from './ProfilePage/Profile';

import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/members', element: <Members /> },
  { path: '/myactivity', element: <Myactivity /> },
  { path: '/meetings', element: <Meetings /> },
  { path: '/mychapter', element: <Mychapter /> },
  { path: '/profile', element: <Profile /> }
]);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
