import React, { useState, useRef, useEffect } from 'react';
// 추후 API와 연결 필요
import { fetchPrediction, fetchChatAnswer } from '../../apis/chat';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [probability, setProbability] = useState(null);

  const messagesEndRef = useRef(null);

  // 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송 처리
  const sendMessage = async (e) => {
    e.preventDefault();

    const userMessage = { user: 'User', text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);

    // 승소확률 API 호출 (더미 데이터, 추후 변경 필요)
    const predictionResponse = { probability: 77.7 };
    const probability = predictionResponse.probability;
    setProbability(probability);

    // 1. 승소확률 예측 파이 그래프
    const aiMessage1 = {
      user: 'AI',
      text: (
        <div className="flex flex-col items-center">
          <p>예상 승소 확률은 {probability}%입니다.</p>
          <div className="w-56 h-56">
            <Pie
              data={{
                labels: ['승소 확률', '패소 확률'],
                datasets: [
                  {
                    data: [probability, 100 - probability],
                    backgroundColor: ['#5A85DA', '#EF4444'],
                  },
                ],
              }}
            />
          </div>
        </div>
      ),
    };

    // 2. 답변 출력
    const answerResponse = {
      answer: `주어진 상황을 단계별로 분석해보겠습니다:
    1. 동기: 7개월 전 헤어진 연인인 피해자와 대화를 하고 싶어함
    2. 행위:
       a) 공동출입문 비밀번호를 알고 있어 이를 이용해 건물에 진입
       b) 엘리베이터를 타고 피해자의 집 현관문 앞까지 이동
       c) 피해자 집 현관문 비밀번호를 누르며 진입 시도
       d) 피해자가 반응하자 도주
    3. 법적 쟁점:
       a) 주거침입죄 성립 여부
       b) 피고인의 의도 (대화 목적 vs 범죄 목적)
       c) 실제 주거 내부 진입 여부
    4. 분석:
       a) 공동출입문 진입은 과거 관계로 인해 알고 있던 정보를 이용한 것으로, 그 자체로는 불법이 아닐 수 있음
       b) 그러나 피해자의 집 현관문 비밀번호를 누르는 행위는 주거침입 시도로 볼 수 있음
       c) 실제로 집 내부에 진입하지는 않았으나, 주거침입 미수에 해당할 수 있음
       d) 피해자의 반응에 즉시 도주한 점은 범죄 의도가 강하지 않았음을 시사할 수 있음
    5. 결론:
    주어진 상황만으로는 완전한 무죄를 주장하기 어려울 것으로 보입니다. 주거침입 미수죄가 성립할 가능성이 있습니다. 그러나 실제 내부 진입이 이루어지지 않았고, 피해자의 반응에 즉시 도주한 점, 그리고 대화를 목적으로 했다는 주장 등을 고려하면 정상참작의 여지는 있을 것으로 보입니다.
    최종적으로, 완전한 무죄 판결을 받기는 어려울 것으로 보이나, 정상참작을 통해 가벼운 처벌을 받을 가능성이 있습니다. 정확한 판단을 위해서는 더 자세한 정황과 증거, 그리고 법정에서의 변론이 필요할 것입니다.`,
    };
    const aiMessage2 = {
      user: 'AI',
      text: answerResponse.answer.replace(/\n/g, '\n'),
    };

    setMessages((prev) => [...prev, aiMessage1, aiMessage2]);
    setInputMessage('');
  };

  return (
    <div className="relative flex flex-col w-full h-screen bg-gray-100">
      {/* 메시지 섹션 */}
      <div className="flex-1 overflow-y-auto p-4 mb-20 w-full">
        <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === 'User' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg min-w-md text-base whitespace-pre-line break-words ${
                  msg.user === 'User'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {typeof msg.text === 'string' ? msg.text : msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 메시지 입력 창 */}
      <div className="absolute bottom-0 w-full bg-gray-100 border-t p-4 z-10">
        <form className="flex w-full max-w-full mx-auto" onSubmit={sendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border border-gray-400 rounded-l-lg text-gray-700"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-r-lg flex-shrink-0"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
