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
    const initialize = async () => {
      const token = accessToken.getToken();
      if (!token) {
        await requestAccessTokenFromRefreshToken();
      } else {
        await fetchUserInfo(token);
      }
    };

    initialize();
  }, []);

  const fetchUserInfo = async (token) => {
    const apiUrl = updateUrl('/api/user/userinfo');

    // 로그인 상태 확인 후 로딩
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestAccessTokenFromRefreshToken = async () => {
    const apiUrl = updateUrl('/api/auth/token');
    const token = accessToken.getToken();

    if (!token) return;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const newToken = await response.text();
      const token = newToken.substring(7); // "Bearer " 제거
      accessToken.setToken(token);
      await fetchUserInfo(token); // refresh 토큰으로 사용자 정보 가져오기
    } catch (error) {
      console.error('Error refreshing access token:', error);
      handleSessionExpired();
    }
  };

  const handleSessionExpired = () => {
    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  };

  return { userInfo, loading };
};

export default useFetchUserInfo;
