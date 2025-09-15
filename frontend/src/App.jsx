import { useEffect, useState } from "react";
import { fetchModels, createModel, updateModel, deleteModel } from "./api";

function App() {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    api_key: "",
    is_active: true,
    model: "",
    provider: ""
  });

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const data = await fetchModels();
    setModels(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createModel(form);
    setForm({ api_key: "", is_active: true, model: "", provider: "" });
    loadModels();
  };

  const handleDelete = async (id) => {
    await deleteModel(id);
    loadModels();
  };

  return (
    <div>
      <h1>Manage Models</h1>

      <form onSubmit={handleSubmit}>
        <input name="api_key" value={form.api_key} onChange={handleChange} placeholder="API Key" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
        <input name="provider" value={form.provider} onChange={handleChange} placeholder="Provider" required />
        <label>
          Active:
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
        </label>
        <button type="submit">Add Model</button>
      </form>

      <h2>Existing Models</h2>
      <ul>
        {models.map((m) => (
          <li key={m.id}>
            {m.model} ({m.provider}) - {m.is_active ? "Active" : "Inactive"} - Key: {m.api_key}
            <button onClick={() => handleDelete(m.id)}>Delete</button>
            {/* You could add "Edit" here too */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
