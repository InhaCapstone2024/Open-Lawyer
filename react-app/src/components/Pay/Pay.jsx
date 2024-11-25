/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../Button/Button';

const Pay = ({ amount, setAmount, buyerName, setBuyerName, onPay }) => {
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

  const formGroupStyle = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--black);
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--gray1);
      border-radius: 6px;
      font-size: 16px;
      color: var(--gray3);
    }
  `;

  const titleStyle = css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    color: var(--black);
    text-align: center;
  `;

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>프리미엄 구독을 결제합니다.</h2>
      <div css={formGroupStyle}>
        <label htmlFor="amount">결제금액</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="결제 금액"
          readOnly
        />
      </div>
      <div css={formGroupStyle}>
        <label htmlFor="buyerName">이름</label>
        <input
          id="buyerName"
          type="text"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          placeholder="구매자 이름"
          readOnly
        />
      </div>
      <Button label="토스페이 결제하기" onClick={onPay} />
    </div>
  );
};

export default Pay;
