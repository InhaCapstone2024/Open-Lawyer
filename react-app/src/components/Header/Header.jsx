/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Menu/Sidebar';
import Menu from './Menu/Menu';
import Button from '../Button/Button';
import LogoImage from '../../assets/images/logo/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogin = () => {
    if (location.pathname === '/login') {
      alert('현재 페이지입니다.');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <header css={HeaderWrapper}>
        <aside css={LogoWrapper} onClick={openSidebar}>
          <img src={LogoImage} alt="Logo" />
          <h1>Open-Lawyer</h1>
        </aside>
        <Menu />
        <Button label="로그인" onClick={handleLogin} />
      </header>
    </>
  );
};

const HeaderWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bluegray2);
  padding: 0.625rem 1.25rem; /* 10px 20px */
  @media (max-width: 768px) {
    position: relative;
  }
`;

const LogoWrapper = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 2rem;
    height: auto;
    margin-right: 0.625rem;
  }

  h1 {
    font-size: 1.25rem;
    color: var(--white);
    text-align: center;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -0.04rem;
  }
`;

export default Header;
