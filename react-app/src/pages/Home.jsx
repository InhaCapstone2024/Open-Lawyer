import React from 'react';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import beforeImage from '../assets/images/before.png';
import afterImage from '../assets/images/after.png';
import mockupImage from '../assets/images/mockup.png';

const Home = () => {
  const navigate = useNavigate();
  const videoId = 'H-M9xLwouXc';

  return (
    <div className="flex flex-col justify-center items-center py-10 px-6 sm:px-10 lg:px-15 w-full">
      {/* 상단 섹션 */}
      <div className="text-center mb-10 w-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold pt-10">
          다음 사건에서 피고인의 승소 확률은 얼마일까요?
        </h1>
        <h4 className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 font-bold">
          아래 재생 버튼을 눌러 영상을 시청해보세요.
        </h4>
        <div className="mt-6 w-full max-w-xl mx-auto mb-20">
          <iframe
            width="100%"
            height="360px"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
      </div>

      {/* 중단 섹션 */}
      <div className="flex flex-col justify-between items-center w-full px-4 sm:px-10 lg:px-15 ">
        <div className="text-base flex flex-col items-left">
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
            💬 GPT 3.5 버전의 답변입니다.
          </p>
          <img
            src={beforeImage}
            alt="before"
            className="mt-4 w-full max-w-md lg:max-w-xl object-contain"
          />
        </div>
        <div className="text-base flex flex-col items-left mt-12">
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
            💬 Open-Lawyer의 답변입니다.
          </p>
          <img
            src={afterImage}
            alt="after"
            className="mt-4 w-full max-w-md lg:max-w-xl object-contain mb-20"
          />
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-10 mt-10 lg:pl-20">
        <div className="space-y-3 text-left lg:w-1/2 lg:pl-20">
          <h2 className="text-2xl font-bold mb-10">
            Open-Lawyer를 소개합니다🖐️
          </h2>
          <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-700">
            신뢰할 수 있는 대법원 데이터로 재판 승소 여부를 예측해요.
          </h3>
          <p className="text-sm sm:text-base text-gray-500 pb-6">
            BERT기반 NLP 모델과 사건 요약문 및 재판 결과가 포함된 대법원 판결문
            데이터를 크롤링합니다.
          </p>
          <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-700">
            값비싼 법률 상담은 이제 끝!
          </h3>
          <p className="text-sm sm:text-base text-gray-500 pb-6">
            적게는 수십, 많게는 천 단위를 오가는 부담스러운 법률 상담은 이제
            필요 없어요.
          </p>
          <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-700">
            법률과 재판 내용을 이해하기 쉬워요.
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            어려운 법률 용어를 알기 쉽게 해석하여 사용자에게 제공합니다.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={mockupImage}
            alt="mockup"
            className="w-3/4 sm:w-2/3 lg:w-3/4"
          />
        </div>
      </div>

      {/* 최하단 섹션 */}
      <div className="text-center mt-20 w-full mb-20">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-10">
          당신의 법률 고민을 손쉽게 해결해 줄 <br /> Open-Lawyer를 지금 바로
          시작해보세요!
        </h1>
        <div className="flex justify-center">
          <Button
            label="로그인하기"
            width="200px"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
