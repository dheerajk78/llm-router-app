const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL);

// GET /api/models — only active models
export async function fetchModels() {
  const response = await fetch(`${BACKEND_URL}/api/models`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("Fetched models:", data);
  return data;
}

// GET /api/models/all — all models (active & inactive)
export async function fetchAllModels() {
  const response = await fetch(`${BACKEND_URL}/api/models/all`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// POST /api/models — create a new model
export async function createModel(modelData) {
  const response = await fetch(`${BACKEND_URL}/api/models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create model: ${response.status}`);
  }

  return response.json();
}

// PUT /api/models/:id — update existing model
export async function updateModel(id, updatedData) {
  const response = await fetch(`${BACKEND_URL}/api/models/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update model ${id}: ${response.status}`);
  }

  return response.json();
}

// DELETE /api/models/:id — delete a model
export async function deleteModel(id) {
  const response = await fetch(`${BACKEND_URL}/api/models/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete model ${id}: ${response.status}`);
  }

  return response.json();
}
