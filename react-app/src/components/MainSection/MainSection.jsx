/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const mainSectionStyle = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* 가로폭을 뷰포트에 맞게 조정 */
  flex-grow: 1; /* 가능한 공간을 채우도록 설정 */
  word-break: break-all;
  white-space: normal;

  @media (max-width: 768px) {
    max-width: 768px;
  }
`;

const MainSection = ({ children }) => {
  return <main css={mainSectionStyle}>{children}</main>;
};

export default MainSection;
