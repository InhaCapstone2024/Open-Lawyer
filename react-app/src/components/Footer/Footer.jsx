/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GithubIcon from '../../assets/images/icons/icon-github.png';
import LogoImage from '../../assets/images/logo/logo.png';

const footerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15rem; /* 240px */
  flex-shrink: 0;
  color: var(--white);
  background-color: var(--bluegray2);

  @media (max-width: 390px) {
    p {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1024px) {
    p {
      font-size: 0.9rem;
    }
  }
`;

const LogoWrapper = css`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  img {
    width: 2rem;
    height: auto;
    margin-right: 0.625rem;
  }

  h1 {
    font-size: 1.25rem;
    color: var(--white);
    text-align: center;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -0.04rem;
  }
`;

const Footer = () => {
  return (
    <>
      <footer css={footerStyle}>
        <aside css={LogoWrapper}>
          <img src={LogoImage} alt="Logo" />
          <h1>Open-Lawyer</h1>
        </aside>
        <p>
          {' '}
          &copy; {new Date().getFullYear()} Open-Lawyer. All rights reserved.
        </p>
        <img
          src={GithubIcon}
          onClick={() =>
            window.open(
              'https://github.com/InhaCapstone2024/Open-Lawyer',
              '_blank'
            )
          }
          alt=""
          css={css`
            cursor: pointer;
            padding: 1.5rem;
            :hover {
              opacity: 0.8;
              transition: opacity 0.3s ease-in-out;
            }
          `}
        />
      </footer>
    </>
  );
};

export default Footer;
