import { useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import accessToken from '../apis/accessToken';

const Connect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('accessToken');

    if (token) {
      accessToken.setToken(token.substring(7)); // 액세스 토큰을 메모리에 저장
      // 이후 홈 페이지로 리다이렉트 (외부 URL일 경우 window.location.href 사용)
      // window.location.href = '/home';
      navigate('/home');
    } else {
      alert('잘못된 접근 방법');
      window.location.href = '/';
    }
  }, [location]);

  return (
    <div>
      <h1>...</h1>
    </div>
  );
};

export default Connect;
