import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "./services/api";

const STATIC_INFO = {
  url: "https://github.com/Rocketseat/umbriel",
  title: "Umbriel",
  techs: ["Node", "Express", "TypeScript"],
};

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const { data } = await api.get("/repositories");

      setRepositories(data);
    }

    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const { data: newRepo } = await api.post("/repositories", STATIC_INFO);

    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const repoIdx = repositories.findIndex((repo) => repo.id === id);

    const newRepositories = [...repositories];
    newRepositories.splice(repoIdx, 1);

    await api.delete(`/repositories/${id}`);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.title}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
