import React, { useState, useRef, useEffect } from 'react';
import { fetchPrediction, fetchChatAnswer } from '../../apis/chat'; // API 연결
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

    // 승소확률 API 호출
    const predictionResponse = await fetchPrediction(inputMessage);
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

    // 2. 답변 출력 API 호출
    const answerResponse = await fetchChatAnswer(inputMessage);
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
                {typeof msg.text === 'string' ? (
                  msg.text
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                )}
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
