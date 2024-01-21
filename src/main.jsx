import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
const RootLayout = lazy(() => import('./routes/rootLayout.jsx'))
const Layout = lazy(() => import('./routes/layout.jsx'))
const PaymentLayout = lazy(() => import('./routes/paymentLayout.jsx'))
import SplashScreen, { loader as splashScreenLoader } from './routes/splashScreen.jsx'
import Home from './routes/home.jsx'
import Aave from './routes/aave.jsx'
import GHO from './routes/gho.jsx'
import PaymentProcess from './routes/paymentProcess.jsx'
import Badge from './routes/badge.jsx'
import Dashboard from './routes/dashboard.jsx'
import Test from './routes/test.jsx'
import Merchant, {loader as merchantLoader} from './routes/merchant.jsx'
import Invoice, {loader as invoiceLoader} from './routes/invoice.jsx'
import Borrow, {loader as borrowLoader} from './routes/borrow.jsx'
// import Feedback from './routes/feedback.jsx'
import About from './routes/about.jsx'
// import FAQ from './routes/faq.jsx'
import Loading from './routes/components/LoadingSpinner'
import Gateway, { loader as gatewayLoader } from './routes/gateway.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          {' '}
          <RootLayout />
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
        path: 'aave',
        element: <Aave title={`Aave`} />,
      },
      {
        path: 'gho',
        element: <GHO title={`GHO`} />,
      },
      {
        path: 'payment-process',
        element: <PaymentProcess title={`Payment Process`} />,
      },
      {
        path: 'badge',
        element: <Badge title={`Badge`} />,
      },
      {
        path: 'about',
        element: <About title={`About`} />,
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
        element: <Navigate to="/" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard title={`Dashboard`} />,
      },
      {
        path: 'merchant',
        loader: merchantLoader,
        element: <Merchant title={`Merchant`}/>,
      },
      {
        path: 'invoice',
        loader: invoiceLoader,
        element: <Invoice title={`Merchant`}/>,
      },
      {
        path: 'borrow',
        loader: borrowLoader,
        element: <Borrow title={`Borrow`}/>,
      },

    ],
  },
  {
    path: '/invoice',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <PaymentLayout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },
      {
        path: ':invoice_id',
        element: <Gateway title={`Gateway`} />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
