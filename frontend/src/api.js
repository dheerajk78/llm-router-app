const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchModels() {
  const response = await fetch(`${baseUrl}/models`);
  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
}

