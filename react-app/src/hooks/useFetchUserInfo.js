import { useState, useEffect, useCallback } from 'react';
import accessToken from '../apis/accessToken';

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ipAddress = import.meta.env.VITE_IP_ADDRESS;
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;

  // API URL fetching
  const updateUrl = useCallback(
    (path) => `http://${ipAddress}:${springbootApiPort}${path}`,
    [ipAddress, springbootApiPort]
  );

  const handleSessionExpired = useCallback(() => {
    // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉트
    if (
      !window.location.pathname.includes('/login') &&
      !window.location.pathname.includes('/')
    ) {
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      window.location.href = '/login';
    }
  }, []);

  const fetchUserInfo = useCallback(
    async (token) => {
      if (!token) {
        setLoading(false);
        return false;
      }

      try {
        const response = await fetch(updateUrl('/api/user/userinfo'), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            return true;
          }
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
        setError(null);
        return false;
      } catch (error) {
        setError('Failed to fetch user info');
        return false;
      }
    },
    [updateUrl]
  );

  const requestAccessTokenFromRefreshToken = useCallback(async () => {
    try {
      const response = await fetch(updateUrl('/api/auth/token'), {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        // refreshToken도 만료된 경우
        handleSessionExpired();
        return null;
      }

      const newToken = await response.text();
      const token = newToken.replace('Bearer ', ''); // "Bearer " 제거

      accessToken.setToken(token);
      return token;
    } catch (error) {
      handleSessionExpired();
      return null;
    }
  }, [updateUrl, handleSessionExpired]);

  useEffect(() => {
    let isSubscribed = true; // 컴포넌트 언마운트 추적

    const initialize = async () => {
      try {
        // 현재 토큰 확인
        let token = accessToken.getToken();

        if (!token) {
          // 토큰이 없는 경우 refresh 시도
          token = await requestAccessTokenFromRefreshToken();
          if (!token || !isSubscribed) return;
        }

        // userInfo 요청
        const needsRefresh = await fetchUserInfo(token);

        // 401 에러로 인한 토큰 갱신이 필요한 경우
        if (needsRefresh && isSubscribed) {
          token = await requestAccessTokenFromRefreshToken();
          if (token) {
            await fetchUserInfo(token);
          }
        }
      } catch (error) {
        if (isSubscribed) {
          setError('Failed to initialize user info');
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    initialize();

    // 클린업 함수
    return () => {
      isSubscribed = false;
    };
  }, [fetchUserInfo, requestAccessTokenFromRefreshToken]);

  return { userInfo, loading, error };
};

export default useFetchUserInfo;
