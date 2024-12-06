/** @jsxImportSource @emotion/react */
import { useState, useEffect} from 'react';
import Pay from '../../components/Pay/Pay';
import useFetchUserInfo from '../../hooks/useFetchUserInfo';

const Payment = () => {
  const [amount, setAmount] = useState(3900); // 결제 금액
  const [buyerName, setBuyerName] = useState(''); // 구매자 이름

  // IAMPORT 환경 변수
  const IMP_ID = import.meta.env.VITE_IAMPORT_IMP;
  const IAMPORT_PG = import.meta.env.VITE_IAMPORT_PG;

  // 사용자 정보 가져오기
  const { userInfo, loading } = useFetchUserInfo();

  useEffect(() => {
    if (userInfo && !loading) {
      setBuyerName(userInfo.nickname || '김인하');
    }
  }, [userInfo, loading]);

  const requestPayment = () => {
    // IAMPORT 설정
    const { IMP } = window;
    IMP.init(IMP_ID);

    // 요청 데이터 설정
    const data = {
      pg: IAMPORT_PG, // 결제 PG사
      pay_method: 'card', // 결제 방법: card or trans(계좌이쳬)
      merchant_uid: `order_${new Date().getTime()}`, // 가맹점 고유 ID (예시로 사용)
      amount: amount, // 결제 금액
      name: '주문명:결제테스트', // 결제 상품명
      buyer_name: buyerName, // 구매자 이름
      buyer_tel: '010-1234-5678', // 구매자 전화번호 (필요 시 추가)
      buyer_addr: '서울특별시 강남구 삼성동', // 구매자 주소 (필요 시 추가)
      buyer_postcode: '123-456', // 구매자 우편번호 (필요 시 추가)
    };

    // 결제 요청
    IMP.request_pay(data, callback);
  };

  // 결제 응답 처리 함수
  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <Pay
      amount={amount}
      setAmount={setAmount}
      buyerName={buyerName}
      setBuyerName={setBuyerName}
      onPay={requestPayment}
    />
  );
};

export default Payment;
