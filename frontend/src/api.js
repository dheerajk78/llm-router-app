const BACKEND_URL = process.env.VITE_APP_BACKEND_URL;

export async function fetchModels() {
  const response = await fetch(`${BACKEND_URL}/api/models`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}


