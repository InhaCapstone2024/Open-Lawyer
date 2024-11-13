const Login = () => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const naverRedirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const handleSocialLogin = (provider) => {
    let loginUrl;
    switch (provider) {
      case 'kakao':
        loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
        break;
      case 'naver':
        loginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&response_type=code`;
        break;
      case 'google':
        loginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=openid%20email%20profile`;
        break;
      default:
        return;
    }
    window.location.href = loginUrl; // 외부 URL로 리다이렉트
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={() => handleSocialLogin('kakao')}>카카오 로그인</button>
      <button onClick={() => handleSocialLogin('naver')}>네이버 로그인</button>
      <button onClick={() => handleSocialLogin('google')}>구글 로그인</button>
    </div>
  );
};

export default Login;
