/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const MenuWrapper = css`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    display: none; /* 모바일 뷰에서는 메뉴바 숨기기 */
  }
`;

const MenuItem = css`
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  color: var(--gray1);
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const Menu = () => {
  return (
    <nav>
      <ul css={MenuWrapper}>
        <li css={MenuItem}>챗봇과 대화하기</li>
        <li css={MenuItem}>법률 용어 사전</li>
        <li css={MenuItem}>가격</li>
      </ul>
    </nav>
  );
};

export default Menu;
