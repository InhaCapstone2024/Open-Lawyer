/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../../Button/Button';

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

const Sidebar = ({ isOpen, closeSidebar }) => (
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
    <div css={itemStyle}>챗봇과 대화하기</div>
    <div css={itemStyle}>법률 용어 사전</div>
  </div>
);

export default Sidebar;
