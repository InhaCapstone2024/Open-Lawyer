/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

const layoutStyle = css`
  display: flex-start;
  flex-direction: column;
  min-height: 100vh;
`;

const headerStyle = css`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 390px) {
    padding-top: 0.5rem;
  }

  @media (min-width: 1024px) {
    padding-top: 1rem;
  }
`;

const mainStyle = css`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 390px) {
    padding: 0.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const footerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;

  @media (max-width: 390px) {
    padding-bottom: 0.5rem;
    p {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1024px) {
    padding-bottom: 2rem;
    p {
      font-size: 0.9rem;
    }
  }
`;

const Layout = () => {
  return (
    <div css={layoutStyle}>
      {/* 헤더 */}
      <header css={headerStyle}>
        <h1 className="text-xl">헤더</h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main css={mainStyle}>
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer css={footerStyle}>
        <p>
          &copy; {new Date().getFullYear()} Open-Lawyer. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
