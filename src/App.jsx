import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Introduce un nombre de usuario");
      setUserData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("Usuario no encontrado");
      }

      const data = await response.json();

      setUserData({
        login: data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
      });

      setError("");
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de usuarios de GitHub</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="card">
          <h2>{userData.login}</h2>
          <img src={userData.avatar_url} alt="Avatar" />
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            Ver perfil de GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default App;