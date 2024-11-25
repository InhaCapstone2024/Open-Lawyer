/** @jsxImportSource @emotion/react */
import { SiKakao, SiNaver, SiGoogle } from 'react-icons/si';
import Button from '../../components/Button/Button';
import logoImage from '../../assets/images/logo-text/black.png';

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
    <div className="flex flex-col md:flex-row justify-center items-center w-full bg-white">
      <div className="md:flex-grow md:max-w-md w-full flex flex-col justify-center items-center ">
        <img
          src={logoImage}
          alt="Login"
          className="items-start w-auto h-10 mb-4"
        />
        <h1 className="text-2xl font-bold pb-8">
          로그인이 필요한 서비스입니다.
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            onClick={() => handleSocialLogin('kakao')}
            label={
              <div className="flex items-center justify-center w-full">
                <SiKakao className="mr-2 text-2xl" />
                카카오 로그인
              </div>
            }
            $backgroundcolor="var(--kakao)"
            color="black"
            width="20rem"
            height="50px"
            $hovercolor="var(--kakao-hover)"
          />
          <Button
            onClick={() => handleSocialLogin('naver')}
            label={
              <div className="flex items-center justify-center w-full">
                <SiNaver className="mr-2 text-2xl" />
                네이버 로그인
              </div>
            }
            $backgroundcolor="var(--naver)"
            color="white"
            width="20rem"
            height="50px"
            $hovercolor="var(--naver-hover)"
          />
          <Button
            onClick={() => handleSocialLogin('google')}
            label={
              <div className="flex items-center justify-center w-full">
                <SiGoogle className="mr-2 text-2xl" />
                구글 로그인
              </div>
            }
            $backgroundcolor="var(--google)"
            color="white"
            width="20rem"
            height="50px"
            $hovercolor="var(--google-hover)"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
