/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
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
    // IAMPORT 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // 로딩이 완료되고 userInfo가 없는 경우에만 리다이렉트
    if (!loading && !userInfo) {
      alert('결제 시 로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    // userInfo가 있을 때만 이름 설정
    if (userInfo) {
      setBuyerName(userInfo.nickname || '김인하');
    }
  }, [loading, userInfo]);

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
      name: '주문명: Open-Lawyer 프리미엄 요금제', // 결제 상품명
      buyer_name: buyerName, // 구매자 이름
      buyer_tel: '010-1234-5678', // 구매자 전화번호 (필요 시 추가)
      buyer_addr: '인천광역시 미추홀구 인하로 100', // 구매자 주소 (인하대학교)
      buyer_postcode: '22212', // 구매자 우편번호 (인하대학교)
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
      alert('결제를 성공했습니다.');
    } else {
      alert(`결제를 실패했습니다.: ${error_msg}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-grow bg-inherit mt-10 justify-center items-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow bg-inherit mt-10">
      <Pay
        amount={amount}
        setAmount={setAmount}
        buyerName={buyerName}
        setBuyerName={setBuyerName}
        onPay={requestPayment}
      />
    </div>
  );
};

export default Payment;
