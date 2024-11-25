export const fetchUserInfo = async (accessToken) => {
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
  const ipUrl = import.meta.env.VITE_IP_ADDRESS;
  const apiUrl = `http://${ipUrl}:${springbootApiPort}/api/user/userinfo`;

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info', response.error);
  }

  return response.json();
};

export const fetchAccessToken = async (code, provider) => {
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
  const ipUrl = import.meta.env.VITE_IP_ADDRESS;
  const response = await fetch(
    `http://${ipUrl}:${springbootApiPort}/api/auth/${provider}/callback`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch access token', response.error);
  }

  const data = await response.json();
  return data.accessToken;
};
