/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const ButtonWrapper = ($backgroundColor, $color, $width, $hoverColor) => css`
  display: flex;
  font-family: 'Pretendard-Semibold';
  background-color: ${$backgroundColor};
  color: ${$color};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  width: ${$width};
  justify-content: center;

  &:hover {
    background-color: ${$hoverColor};
  }
`;

const Button = ({
  onClick,
  label,
  $backgroundcolor = 'var(--key)',
  color = 'var(--white)',
  width = 'auto',
  $hovercolor = 'var(--key-hover)',
}) => {
  return (
    <button
      css={ButtonWrapper($backgroundcolor, color, width, $hovercolor)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
