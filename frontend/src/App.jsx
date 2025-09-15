import { useEffect, useState } from "react";
import {
  fetchAllModels,
  createModel,
  updateModel,
  deleteModel,
} from "./api";

function App() {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    api_key: "",
    is_active: true,
    model: "",
    provider: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const data = await fetchAllModels();
      setModels(data);
    } catch (err) {
      console.error("Error loading models:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateModel(editingId, form);
      } else {
        await createModel(form);
      }
      setForm({ api_key: "", is_active: true, model: "", provider: "" });
      setEditingId(null);
      loadModels();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (model) => {
    setForm({
      api_key: model.api_key,
      is_active: model.is_active,
      model: model.model,
      provider: model.provider,
    });
    setEditingId(model.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this model?")) {
      try {
        await deleteModel(id);
        loadModels();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleCancelEdit = () => {
    setForm({ api_key: "", is_active: true, model: "", provider: "" });
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>{editingId ? "Edit Model" : "Add Model"}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "1fr 1fr",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <input
          name="api_key"
          value={form.api_key}
          onChange={handleChange}
          placeholder="API Key"
          required
          style={{ gridColumn: "span 2", padding: "8px" }}
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          required
          style={{ padding: "8px" }}
        />
        <input
          name="provider"
          value={form.provider}
          onChange={handleChange}
          placeholder="Provider"
          required
          style={{ padding: "8px" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            {" "}Active
          </label>
        </div>

        <div style={{ textAlign: "right", gridColumn: "span 2" }}>
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              marginRight: "10px",
              cursor: "pointer"
            }}
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{ marginBottom: "10px" }}>Models</h2>
      <div>
        {models.length === 0 && <p>No models available.</p>}
        {models.map((m) => (
          <div
            key={m.id}
            style={{
              padding: "12px 16px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff"
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>{m.model}</div>
              <div style={{ fontSize: "14px", color: "#555" }}>
                {m.provider} —{" "}
                <span style={{
                  color: m.is_active ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {m.is_active ? "Active" : "Inactive"}
                </span>{" "}
                — Key: <span style={{ fontFamily: "monospace" }}>{m.api_key}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(m)}
                style={{
                  marginRight: "8px",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "1px solid #007bff",
                  background: "white",
                  color: "#007bff",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "1px solid #dc3545",
                  background: "white",
                  color: "#dc3545",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
