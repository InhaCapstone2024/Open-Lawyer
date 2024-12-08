const apiPort = import.meta.env.VITE_SPRINGBOOT_HOST_PORT;
const ipUrl = import.meta.env.VITE_IP_ADDRESS;
const SERVER = `http://${ipUrl}:${apiPort}`;

export const fetchNearbyLegalInstitutions = async (
  longitude,
  latitude,
  count = 3
) => {
  const response = await fetch(`${SERVER}/api/legal-institution/nearby`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ longitude, latitude, count }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch nearby legal institutions');
  }

  return response.json();
};
