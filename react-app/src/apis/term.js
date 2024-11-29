const apiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
const ipUrl = import.meta.env.VITE_IP_ADDRESS;
const SERVER = `http://${ipUrl}:${apiPort}`;

export const fetchLegalTerms = async () => {
  const response = await fetch(`${SERVER}/api/term/terminfo`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
};

export const fetchLegalTermById = async (id) => {
  const response = await fetch(`${SERVER}/api/term/terminfo/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
