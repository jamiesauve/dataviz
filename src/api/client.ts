const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function fetchMetadata() {
  const response = await fetch(`${BASE_URL}/metadata`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
} 