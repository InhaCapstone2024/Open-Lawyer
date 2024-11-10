import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo, useFetchAccessToken } from '../hooks/useAuth';

const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const { data: userInfo, error, isLoading } = useUserInfo(accessToken);

  const handleSocialLogin = (provider) => {
    const clientIdMap = {
      kakao: import.meta.env.VITE_KAKAO_REST_API_KEY,
      naver: import.meta.env.VITE_NAVER_CLIENT_ID,
      google: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    };

    const redirectUriMap = {
      kakao: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      naver: import.meta.env.VITE_NAVER_REDIRECT_URI,
      google: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    };

    const loginUrl = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${clientIdMap.kakao}&redirect_uri=${redirectUriMap.kakao}&response_type=code`,
      naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${clientIdMap.naver}&redirect_uri=${redirectUriMap.naver}&response_type=code`,
      google: `https://accounts.google.com/o/oauth2/auth?client_id=${clientIdMap.google}&redirect_uri=${redirectUriMap.google}&response_type=code&scope=openid%20email%20profile`,
    }[provider];

    window.location.href = loginUrl;
  };

  const { mutate: requestAccessToken } = useFetchAccessToken((token) => {
    setAccessToken(token);
    navigate('/login'); // 로그인 성공 후 해당 path로 리다이렉션
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const provider = params.get('provider');

    if (code && provider) {
      requestAccessToken({ code, provider });
    }
  }, [requestAccessToken]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user info: {error.message}</div>;

  return (
    <div>
      <h2>소셜 로그인 테스트</h2>
      <button onClick={() => handleSocialLogin('kakao')}>Kakao 로그인</button>
      <button onClick={() => handleSocialLogin('naver')}>Naver 로그인</button>
      <button onClick={() => handleSocialLogin('google')}>Google 로그인</button>

      {userInfo && (
        <div>
          <h3>사용자 정보</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Login;
