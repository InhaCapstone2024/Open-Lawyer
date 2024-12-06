import accessToken from './accessToken';

const apiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
const ipUrl = import.meta.env.VITE_IP_ADDRESS;
const SERVER = `http://${ipUrl}:${apiPort}`;

const logout = async () => {
  const token = accessToken.getToken();
  if (!token) {
    console.error('Not have token!');
    return false;
  }

  try {
    const apiUrl = `${SERVER}/api/user/logout`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      accessToken.setToken(null); // 로그아웃 시 토큰 삭제
      return true;
    } else {
      console.error('Logout error:', response.error);
      return false;
    }
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export default logout;
