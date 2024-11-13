import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Example from './components/Example';
import Login from './pages/Login';
import Home from './pages/Home';
import Connect from './pages/Connect';

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
        path: 'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'connect',
        element: <Connect />,
      },
    ],
  },
]);

export default router;
