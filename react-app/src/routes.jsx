import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import Connect from './pages/Login/Connect';
import Chat from './pages/Chat/Chat';
import Dictionary from './pages/Dictionary/Dictionary';
import Payment from './pages/Payment/Payment';
import PriceList from './pages/Payment/PriceList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'price',
        element: <PriceList />,
      },
      {
        path: 'connect',
        element: <Connect />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'dictionary',
        element: <Dictionary />,
      },
    ],
  },
]);

export default router;