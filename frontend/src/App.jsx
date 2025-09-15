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
        console.log("Model updated:", editingId);
      } else {
        await createModel(form);
        console.log("Model created");
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
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{editingId ? "Edit Model" : "Add Model"}</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="api_key"
          value={form.api_key}
          onChange={handleChange}
          placeholder="API Key"
          required
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          name="provider"
          value={form.provider}
          onChange={handleChange}
          placeholder="Provider"
          required
        />
        <label style={{ marginLeft: "10px" }}>
          Active:
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            style={{ marginLeft: "5px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Models</h2>
      <ul>
        {models.map((m) => (
          <li key={m.id}>
            <strong>{m.model}</strong> ({m.provider}) -{" "}
            {m.is_active ? "Active" : "Inactive"} - Key: {m.api_key}
            <button onClick={() => handleEdit(m)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(m.id)} style={{ marginLeft: "5px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
