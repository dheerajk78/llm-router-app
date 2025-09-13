import { useEffect, useState } from "react";
import { fetchModels } from "./api";

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    fetchModels().then(setModels).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Select LLM Model</h1>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="">-- Select a model --</option>
        {models.map((m, i) => (
          <option key={i} value={`${m.provider}:${m.model}`}>
            {m.provider} - {m.model}
          </option>
        ))}
      </select>

      {selectedModel && <p>You selected: {selectedModel}</p>}
    </div>
  );
}

export default App;

