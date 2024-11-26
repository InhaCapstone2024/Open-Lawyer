import useFetchUserInfo from '../../hooks/useFetchUserInfo';

const Chat = () => {
  const ipAddress = import.meta.env.VITE_IP_ADDRESS;
  const springbootApiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
  const { userInfo, loading } = useFetchUserInfo(ipAddress, springbootApiPort);

  return (
    <div>
      <h1>채팅 메인화면</h1>
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
      )}
    </div>
  );
};

export default Chat;
