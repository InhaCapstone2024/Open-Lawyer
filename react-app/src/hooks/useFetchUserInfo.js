import { useState, useEffect } from 'react';
import accessToken from '../apis/accessToken';

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const ipAddress = import.meta.env.VITE_IP_ADDRESS;
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;

  // API URL fetching
  const updateUrl = (path) => `http://${ipAddress}:${springbootApiPort}${path}`;

  useEffect(() => {
    const token = accessToken.getToken();
    if (!token) {
      requestAccessTokenFromRefreshToken();
    } else {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    const apiUrl = updateUrl('/api/user/userinfo');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        return;
      }

      if (!response.ok) {
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
    const apiUrl = updateUrl('/api/auth/token');

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
      setLoading(false); // 리프레시 토큰이 없거나 만료된 경우 로딩 완료
    }
  };

  return { userInfo, loading };
};

export default useFetchUserInfo;
