import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Example from './components/Example';
import Login from './pages/Login';
import Payment from './components/Payment';

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
    ],
  },
]);

export default router;
