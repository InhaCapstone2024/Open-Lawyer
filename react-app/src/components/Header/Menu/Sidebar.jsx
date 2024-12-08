/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import accessToken from '../../../apis/accessToken';

const itemStyle = css`
  font-size: 1rem;
  color: var(--gray1);
  padding-top: 0.6rem;
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const buttonStyle = css`
  margin-bottom: 1.2rem;
`;

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const checkAuthenticationAndNavigate = (path) => {
    const token = accessToken.getToken();
    if (!token) {
      alert('로그인이 필요합니다!');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div
      css={css`
        position: fixed;
        height: 100%;
        width: 13.75rem;
        padding: 2rem;
        background-color: var(--bluegray2);
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
        transform: ${isOpen ? 'translateX(0)' : 'translateX(-101%)'};
        transition: transform 0.3s ease;
        z-index: 1000;
      `}
    >
      <section css={buttonStyle}>
        <Button onClick={closeSidebar} label="닫기" />
      </section>
      <div
        css={itemStyle}
        onClick={() => checkAuthenticationAndNavigate('/chat')}
      >
        챗봇과 대화하기
      </div>
      <div
        css={itemStyle}
        onClick={() => checkAuthenticationAndNavigate('/dictionary')}
      >
        법률 용어 사전
      </div>
      <div css={itemStyle} onClick={() => navigate('/price')}>
        가격
      </div>
    </div>
  );
};

export default Sidebar;
