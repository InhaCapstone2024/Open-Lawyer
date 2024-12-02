import React, { useState, useRef, useEffect } from 'react';
import { fetchPrediction, fetchChatAnswer } from '../../apis/chat';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      user: 'AI',
      text: '안녕하세요. 당신만을 위한 법률 상담 서비스 오픈로이어입니다! 어떤 문제로 어려움을 겪고 계신가요?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

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
    setInputMessage('');

    handlePredictionAPI(inputMessage);
    handleChatAnswerAPI(inputMessage);
  };

  // 승소 확률 API 호출
  const handlePredictionAPI = async (input) => {
    setIsPredictionLoading(true);
    try {
      const predictionResponse = await fetchPrediction(input);
      const rawProbability = predictionResponse.probability;
      const probability = Math.round(rawProbability * 100);

      // 1. 승소확률 예측 파이 그래프
      const aiMessage = {
        user: 'AI',
        text: `예상 승소 확률은 ${probability}%입니다.`,
        jsx: (
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

      // 2. 답변 출력 API 호출
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('승소 확률 API 오류:', error);
      setMessages((prev) => [
        ...prev,
        { user: 'AI', text: '승소 확률을 가져오는 데 실패했습니다.' },
      ]);
    } finally {
      setIsPredictionLoading(false);
    }
  };

  // 답변 API 호출
  const handleChatAnswerAPI = async (input) => {
    setIsAnswerLoading(true);
    try {
      const answerResponse = await fetchChatAnswer(input);
      const aiMessage = {
        user: 'AI',
        text: answerResponse.answer.replace(/\n/g, '\n'),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('api 2 err:', error);
      setMessages((prev) => [
        ...prev,
        { user: 'AI', text: '답변을 가져오는 데 실패했습니다.' },
      ]);
    } finally {
      setIsAnswerLoading(false);
    }
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
                {msg.jsx || msg.text} {/* JSX(그래프)부터 우선 렌더링 */}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* 로딩 상태 표시 */}
          {(isPredictionLoading || isAnswerLoading) && (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-gray-700 text-2xl" />
              <span className="ml-2">답변을 생성 중입니다...</span>
            </div>
          )}
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
            disabled={isPredictionLoading || isAnswerLoading}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-r-lg flex-shrink-0"
            disabled={isPredictionLoading || isAnswerLoading}
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
