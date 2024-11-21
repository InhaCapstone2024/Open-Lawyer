import { useEffect, useState } from 'react';
import accessToken from '../apis/accessToken';

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const ipAddress = import.meta.env.VITE_IP_ADDRESS;
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;

  useEffect(() => {
    if (!accessToken.getToken()) {
      // 새로고침시 리프래시 토큰으로 액세스 토큰 발급
      requestAccessTokenFromRefreshToken();
    } else {
      fetchUserInfo(accessToken.getToken()); // 액세스 토큰으로 사용자 정보 가져오기
    }
  }, []);

  const fetchUserInfo = async (token) => {
    const apiUrl = `http://${ipAddress}:${springbootApiPort}/api/user/userinfo`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      console.log('response: ', response);

      if (response.status === 401) {
        // 401 에러가 발생한 경우
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        return;
      }

      if (!response.ok) {
        console.log('response: ', response);
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const requestAccessTokenFromRefreshToken = async () => {
    const apiUrl = `http://${ipAddress}:${springbootApiPort}/api/auth/token`; // 재발급 API 경로

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include', // 쿠키를 포함하여 요청
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const newToken = await response.text();
      accessToken.setToken(newToken.substring(7)); // 새로운 액세스 토큰 저장
      fetchUserInfo(newToken.substring(7)); // 새로운 토큰으로 사용자 정보 가져오기
    } catch (error) {
      console.error(error);
      // 리프레시 토큰이 없거나 만료된 경우 로딩 완료
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>홈 화면</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : userInfo ? (
        <div>
          <h2>안녕하세요, {userInfo.nickname}님!</h2>
          <p>Email: {userInfo.email}</p>
          <p>로그인 유형: {userInfo.loginType}</p>
          <p>소셜로그인 ID: {userInfo.socialLoginId}</p>
        </div>
      ) : (
        <p>사용자 정보가 없습니다. 로그인해주세요.</p>
        // 사용자 정보 없음 출력 대신 로그인 페이지로 리다이랙트해도 됩니다.
      )}
    </div>
  );
};

export default HomePage;
