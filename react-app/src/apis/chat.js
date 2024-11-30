const apiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
const ipUrl = import.meta.env.VITE_IP_ADDRESS;
const SERVER = `http://${ipUrl}:${apiPort}`;

// 승소 확률 예측 API
export const fetchPrediction = async (question) => {
  const response = await fetch(`${SERVER}/api/chat/prediction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    return { probability: 77.7 };
  }
  if (!response.ok) {
    throw new Error('Failed to fetch winning-rate', response.error);
  }
  return response.json();
};

// 답변 API
export const fetchChatAnswer = async (question) => {
  const response = await fetch(`${SERVER}/api/chat/question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch answer', response.error);
  }
  return response.json();
};
