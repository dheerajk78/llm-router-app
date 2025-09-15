import { useEffect, useState } from "react";
import {
  fetchAllModels,
  createModel,
  updateModel,
  deleteModel,
} from "./api";
import "./index.css"; // 👈 import your vanilla styles

export default function App() {
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
    const data = await fetchAllModels();
    setModels(data);
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
    if (editingId) {
      await updateModel(editingId, form);
    } else {
      await createModel(form);
    }
    setForm({ api_key: "", is_active: true, model: "", provider: "" });
    setEditingId(null);
    loadModels();
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
      await deleteModel(id);
      loadModels();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ api_key: "", is_active: true, model: "", provider: "" });
  };

  return (
    <div className="container">
      <h1>{editingId ? "Edit Model" : "Add Model"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="api_key"
            value={form.api_key}
            onChange={handleChange}
            placeholder="API Key"
            required
            type="text"
          />
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            required
            type="text"
          />
        </div>
        <div className="form-row">
          <input
            name="provider"
            value={form.provider}
            onChange={handleChange}
            placeholder="Provider"
            required
            type="text"
          />
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            <span style={{ marginLeft: "6px" }}>Active</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Models</h2>
      <div>
        {models.map((m) => (
          <div key={m.id} className="model-card">
            <div className="model-info">
              <div><strong>{m.model}</strong> ({m.provider})</div>
              <div>
                <span
                  className={`model-status ${
                    m.is_active ? "active" : "inactive"
                  }`}
                >
                  {m.is_active ? "Active" : "Inactive"}
                </span>{" "}
                — Key: <code>{m.api_key}</code>
              </div>
            </div>
            <div className="model-actions">
              <button onClick={() => handleEdit(m)} className="secondary">
                Edit
              </button>
              <button onClick={() => handleDelete(m.id)} className="danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
