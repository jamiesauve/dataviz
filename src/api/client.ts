import { getEnvVar } from '../utils/env';

const BASE_URL = getEnvVar('VITE_SERVER_URL');

export async function fetchMetadata() {
  const response = await fetch(`${BASE_URL}/metadata`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchData() {
  console.log('Fetching data from:', `${BASE_URL}/data`);
  const response = await fetch(`${BASE_URL}/data`, {
    headers: {
      'Range': 'events=0-499'  // Request first 500 events
    }
  });
  if (!response.ok) {
    console.error('Data fetch failed:', response.status, response.statusText);
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Received data:', data);
  return data;
} 