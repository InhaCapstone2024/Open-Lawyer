import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import GraphRenderer from '../../components/GraphRenderer/GraphRenderer';

const Compare = () => {
  const MessageContainer = ({ isUser, children }) => {
    // 초기 마운트 시 애니메이션 실행을 위한 상태 관리
    const [hasAnimated, setHasAnimated] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 70 }} // 초기 상태
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // 상태에 따라 다르게 애니메이션
        transition={{ duration: 1 }}
        onViewportEnter={() => {
          if (!hasAnimated) {
            setHasAnimated(true); // 마운트 상태 변경 처리
          }
        }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[85%] px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-gray-200 text-black rounded-tl-none'
          }`}
        >
          {children}
        </div>
      </motion.div>
    );
  };

  const openLawyerAnalysis = `## 주어진 상황을 단계별로 분석해보겠습니다:

### 1. 동기:
- 7개월 전 헤어진 연인인 피해자와 대화를 하고 싶어함

### 2. 행위:
- a) 공동출입문 비밀번호를 알고 있어 이를 이용해 건물에 진입
- b) 엘리베이터를 타고 피해자의 집 현관문 앞까지 이동
- c) 피해자 집 현관문 비밀번호를 누르며 진입 시도
- d) 피해자가 반응하자 도주

### 3. 법적 쟁점:
- a) 주거침입죄 성립 여부
- b) 피고인의 의도 (대화 목적 vs 범죄 목적)
- c) 실제 주거 내부 진입 여부

### 4. 분석:
- a) 공동출입문 진입은 과거 관계로 인해 알고 있던 정보를 이용한 것으로, 그 자체로는 불법이 아닐 수 있음
- b) 그러나 피해자의 집 현관문 비밀번호를 누르는 행위는 주거침입 시도로 볼 수 있음
- c) 실제로 집 내부에 진입하지는 않았으나, 주거침입 미수에 해당할 수 있음
- d) 피해자의 반응에 즉시 도주한 점은 범죄 의도가 강하지 않았음을 시사할 수 있음

### 5. 결론:
- 주어진 상황만으로는 완전한 무죄를 주장하기 어려울 것으로 보입니다. 주거침입 미수죄가 성립할 가능성이 있습니다.
- 그러나 실제 내부 진입이 이루어지지 않았고, 피해자의 반응에 즉시 도주한 점, 그리고 대화를 목적으로 했다는 주장 등을 고려하면 정상참작의 여지는 있을 것으로 보입니다.
- 최종적으로, 완전한 무죄 판결을 받기는 어려울 것으로 보이나, 정상참작을 통해 가벼운 처벌을 받을 가능성이 있습니다. 정확한 판단을 위해서는 더 자세한 정황과 증거, 그리고 법정에서의 변론이 필요할 것입니다.
`;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl py-6">
      <h1 className="text-2xl font-bold mb-6">GPT 3.5의 답변은...</h1>

      <div className="space-y-4">
        <MessageContainer isUser={true}>
          <p>
            7개월 전 헤어진 전 여자친구랑 대화를 하고 싶어서 그녀의 아파트
            앞까지 찾아갔어. 아파트 공동현관문 비밀번호를 누르고 그녀의 집
            앞에서 비밀번호를 누르려고 했지. 하지만 놀란 목소리로 누구냐고
            물어오는 그녀의 목소리를 듣고 바로 도망쳐나왔어.
          </p>
        </MessageContainer>

        <MessageContainer isUser={false}>
          <p>
            해당 상황에서 법적 결과를 예측하는 것은 복잡한 문제입니다. 우선, 이
            사건에서 발생할 수 있는 법적 쟁점들은 여러 가지가 있을 수 있습니다.
            <br /> <br />
            ... <br /> <br /> 이와 같은 상황에서 "승소" 여부를 판단하기 위해서는
            법적인 세부 사항, 피해자의 신고 여부, 사건의 경과 등을 모두 고려해야
            합니다. 변호사와 상담하는 것이 가장 중요하며, 구체적인 법적 조언을
            받아야 할 필요가 있습니다. 법원은 이 사건의 특수성과 피해자의 입장을
            종합적으로 판단할 것입니다. 또한, 심리적 압박을 느끼지 않더라도
            무단으로 집 앞에 가는 행위 자체가 법적으로 문제가 될 수 있기 때문에,
            앞으로는 상대방의 의사를 존중하는 방법을 선택하는 것이 중요합니다.
          </p>
        </MessageContainer>

        <MessageContainer isUser={false}>
          <p>혹시 답변이 마음에 들지 않으셨나요?</p>
        </MessageContainer>

        <MessageContainer isUser={true}>
          <p>흠..내가 원하는 건 이런 답변이 아니야😥</p>
        </MessageContainer>

        <MessageContainer isUser={true}>
          <p>
            나처럼 법률을 모르는 사람도 사건에 대한 판결 결과를 바로 예측할 수는
            없을까?
          </p>
        </MessageContainer>

        <p className="h-32"></p>
        <h1 className="text-2xl font-bold mt-10">
          <br />✅ Open-Lawyer의 답변입니다.
        </h1>

        <MessageContainer isUser={true}>
          <p>
            7개월 전 헤어진 전 여자친구랑 대화를 하고 싶어서 그녀의 아파트
            앞까지 찾아갔어. 아파트 공동현관문 비밀번호를 누르고 그녀의 집
            앞에서 비밀번호를 누르려고 했지. 하지만 놀란 목소리로 누구냐고
            물어오는 그녀의 목소리를 듣고 바로 도망쳐나왔어.
          </p>
        </MessageContainer>

        <MessageContainer isUser={false}>
          <GraphRenderer probability={15} />
        </MessageContainer>

        <MessageContainer isUser={false}>
          <MarkdownRenderer markdown={openLawyerAnalysis} />
        </MessageContainer>

        <MessageContainer isUser={true}>
          <p>아하.. 그렇구나. 덕분에 많은 도움이 될 것 같아!😊</p>
        </MessageContainer>
      </div>
    </div>
  );
};

export default Compare;
