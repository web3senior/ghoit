import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
const Layout = lazy(() => import('./routes/layout.jsx'))
const UserLayout = lazy(() => import('./routes/layout.jsx'))
import SplashScreen, { loader as splashScreenLoader } from './routes/splashScreen.jsx'
import Home from './routes/home.jsx'
import Dashboard from './routes/dashboard.jsx'
import Profile from './routes/profile.jsx'
import IPFS from './routes/ipfs.jsx'
import Setting from './routes/setting.jsx'
// import Feedback from './routes/feedback.jsx'
// import About from './routes/about.jsx'
// import FAQ from './routes/faq.jsx'
import Loading from './routes/components/LoadingSpinner'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: splashScreenLoader,
        element: <SplashScreen title={`Welcome`} />,
      },
      {
        path: 'home',
        element: <Home title={`Home`} />,
      },
    ],
  },
  {
    path: '/usr',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: splashScreenLoader,
        element: <SplashScreen title={`Welcome`} />,
      },
      {
        path: 'home',
        element: <Home title={`Home`} />,
      },

      {
        path: 'usr',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/" replace />,
          },
          {
            path: 'dashboard',
            element: <Dashboard title={`Dashboard`} />,
          },
          {
            path: 'allo',
            element: <></>,
          },
          {
            path: 'profile',
            children: [
              {
                index: true,
                element: <Profile title={`Profile`} />,
              },
              {
                path: ':profileId',
                element: <></>,
              },
            ],
          },
          {
            path: 'setting',
            element: <Setting title={`Setting`} />,
          },
          {
            path: 'pool',
            children: [
              {
                index: true,
                element: <></>,
              },
              {
                path: ':poolId',
                element: <></>,
              },
              {
                path: 'new',
                element: <></>,
              },
            ],
          },
          {
            path: 'ipfs',
            element: <IPFS title={`IPFS`} />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
