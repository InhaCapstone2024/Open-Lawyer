/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const Price = ({ title, audience, price, features, ButtonComponent }) => {
  const navigate = useNavigate();

  const handleNavigatePayment = () => {
    navigate('/payment');
  };

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>{title}</h1>
      <p css={audienceStyle}>{audience}</p>
      <p css={priceStyle}>{price}</p>
      {ButtonComponent && (
        <Button onClick={handleNavigatePayment} label="지금 바로 결제하기" />
      )}
      <ul css={featureListStyle}>
        {features &&
          features.map((feature, index) => (
            <li key={index} css={featureStyle}>
              ✅ {feature}
            </li>
          ))}
      </ul>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  background-color: var(--sub);
  gap: 15px;
  flex-shrink: 0;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
`;

const audienceStyle = css`
  color: var(--gray3);
  text-align: center;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const priceStyle = css`
  font-family: 'Pretendard-Semibold';
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 90px;
  letter-spacing: -0.8px;
`;

const featureListStyle = css`
  list-style: none;
  padding: 0;
`;

const featureStyle = css`
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  color: #2a3342;
  margin-top: 8px;
`;

export default Price;
