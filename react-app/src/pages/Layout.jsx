// src/components/Layout.jsx (1-27)
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

const Layout = () => {
  return (
    <div css={layoutStyle}>
      <Header />
      {/* 메인 콘텐츠 영역 */}
      <MainSection>
        <Outlet />{' '}
        {/* 여기에 Outlet을 넣음으로써 MainSection이 자식으로 Outlet을 포함 */}
      </MainSection>
      <Footer />
    </div>
  );
};

export default Layout;
