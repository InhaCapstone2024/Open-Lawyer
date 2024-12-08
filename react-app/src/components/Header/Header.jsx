/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Menu/Sidebar';
import Menu from './Menu/Menu';
import Button from '../Button/Button';
import LogoImage from '../../assets/images/logo/logo.png';
import logout from '../../apis/logout';
import useFetchUserInfo from '../../hooks/useFetchUserInfo';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useFetchUserInfo();
  const [isLogin, setIsLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsLogin(!!userInfo); // userInfo가 있으면 로그인 상태 true로 설정
  }, [userInfo]);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogin = () => {
    if (location.pathname === '/login') {
      alert('현재 페이지입니다.');
      return;
    }
    navigate('/login');
  };

  const handleLogout = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      alert('로그아웃 되었습니다.');
      // 로그아웃 시 상태 초기화
      setIsLogin(false);
      navigate('/');
    }
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-700 py-2 px-5 flex justify-between items-center">
        <aside
          className="flex items-center cursor-pointer"
          onClick={openSidebar}
        >
          <img src={LogoImage} alt="Logo" className="w-8 h-auto mr-2" />
          <h1 className="text-white text-xl font-bold font-ubuntu">
            Open-Lawyer
          </h1>
        </aside>
        <Menu />
        <Button
          label={isLogin ? '로그아웃' : '로그인'}
          onClick={isLogin ? handleLogout : handleLogin}
        />
      </header>
    </>
  );
};

export default Header;
