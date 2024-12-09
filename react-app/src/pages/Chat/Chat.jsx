import React, { useState, useRef, useEffect } from 'react';
import { fetchPrediction, fetchChatAnswer } from '../../apis/chat';
import GraphRenderer from '../../components/GraphRenderer/GraphRenderer';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import { FaSpinner } from 'react-icons/fa';
import useFetchUserInfo from '../../hooks/useFetchUserInfo.js';
import Map from '../../components/Map/Map';
import accessToken from '../../apis/accessToken';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { userInfo, loading } = useFetchUserInfo();

  useEffect(() => {
    const initializeChat = async () => {
      const token = accessToken.getToken();
      if (!token) {
        console.warn('Access token is not available.');
        return;
      }

      setMessages([
        {
          user: 'AI',
          text: `안녕하세요. ${
            userInfo?.nickname || '사용자'
          }님👋 당신만을 위한 법률 상담 서비스 오픈로이어입니다! 어떤 문제로 어려움을 겪고 계신가요?`,
        },
      ]);
    };

    if (!loading) {
      initializeChat();
    }
  }, [userInfo, loading]);

  // 메시지 전송 처리
  const sendMessage = async (e) => {
    e.preventDefault();
    const userMessage = { user: 'User', text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // API 호출 순서대로 대기
    await handlePredictionAPI(inputMessage);
    await handleChatAnswerAPI(inputMessage);

    // Map
    setMessages((prev) => [...prev, { user: 'Map', jsx: <Map /> }]);
  };

  // 승소 확률 API 호출
  const handlePredictionAPI = async (input) => {
    setIsPredictionLoading(true);
    try {
      const predictionResponse = await fetchPrediction(input);
      const rawProbability = predictionResponse.probability;
      const probability = Math.round(rawProbability * 100);

      const aiMessage = {
        user: 'AI',
        jsx: <GraphRenderer probability={probability} />,
      };

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
        jsx: <MarkdownRenderer markdown={answerResponse.answer} />,
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
    <div className="relative flex flex-col h-full bg-gray-100 w-full">
      {/* 메시지 섹션 */}
      <div className="flex-1 overflow-y-auto p-4 mt-10 mb-[100px]">
        <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === 'User' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg text-base whitespace-pre-line break-words ${
                  msg.user === 'User'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {msg.jsx || msg.text} {/* JSX(그래프)가 있으면 우선 렌더링 */}
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
      <div className="fixed bottom-0 w-full bg-gray-100 border-t p-4 z-10">
        <form className="flex w-full max-w-full mx-auto" onSubmit={sendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border bg-white border-gray-400 rounded-l-lg text-gray-700"
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
