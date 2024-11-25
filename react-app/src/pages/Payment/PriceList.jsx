import Price from '../../components/Price/Price';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const features = [
  '토큰 제한 없는 챗봇 사용',
  '광고 제거',
  '전문 법조인과의 상담 연결',
];

const PriceList = () => {
  const navigate = useNavigate();

  const handleNavigatePayment = () => {
    navigate('/payment');
  };

  return (
    <Price
      title="프리미엄 플랜"
      audience="For Individual Users"
      price="₩3,900/월"
      features={features}
      ButtonComponent={
        <Button onClick={handleNavigatePayment} label="지금 바로 결제하기" />
      }
    />
  );
};
export default PriceList;
