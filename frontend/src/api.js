const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", ${BACKEND_URL}); // <--- Add this line

export async function fetchModels() {
  const response = await fetch(`${BACKEND_URL}/api/models`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("Fetched models:", data); // <--- Add this line
  return data;
}


