/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const mainSectionStyle = css`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  min-height: 600px; /* 최소 높이 */
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
