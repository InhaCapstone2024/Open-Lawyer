import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';

const Layout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {/* 메인 콘텐츠 영역 */}
      <MainSection className="flex-grow">
        {/* 여기에 Outlet을 넣음으로써 MainSection이 자식으로 Outlet을 포함 */}
        <Outlet />
      </MainSection>
      {/* 채팅 페이지에서는 푸터 렌더링 삭제 */}
      {!isChatPage && <Footer />}
    </div>
  );
};

export default Layout;
