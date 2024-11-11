import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Example from './components/Example';
import Login from './pages/Login';
import Payment from './pages/Payment';
import PriceList from './pages/PriceList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 추가 라우팅
      {
        path: 'ex',
        element: <Example />,
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
    ],
  },
]);

export default router;
