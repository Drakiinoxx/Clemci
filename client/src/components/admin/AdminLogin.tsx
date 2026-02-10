import { useState } from "react";
import { useNavigate } from "react-router";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("adminToken", token);
        navigate("/jaimelepoulet/dashboard");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gradient-to-br from-yellow-600/10 to-orange-600/5 border border-yellow-600/30 rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src="/ClemciLogo.jpeg"
            alt="Clemci Logo"
            className="w-24 h-24 rounded-full shadow-lg shadow-yellow-600/50"
          />
        </div>

        <h1 className="text-3xl font-serif text-yellow-500 mb-6 text-center">
          Admin Clemci
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-yellow-500 focus:outline-none"
              placeholder="Entrez le mot de passe admin"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold p-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
