import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/jaimelepoulet");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative bg-black min-h-screen text-white overflow-hidden">
      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-8xl">🍕</div>
        <div className="absolute top-40 right-20 text-6xl">🍺</div>
        <div className="absolute bottom-20 left-20 text-7xl">⚙️</div>
        <div className="absolute bottom-40 right-10 text-6xl">📝</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <img
              src="/ClemciLogo.jpeg"
              alt="Clemci Logo"
              className="w-16 h-16 rounded-full shadow-lg shadow-yellow-600/50"
            />
            <h1 className="text-4xl font-serif text-yellow-500">
              Dashboard Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Déconnexion
          </button>
        </div>

        {/* Cartes de navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/jaimelepoulet/pizzas"
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🍕
            </div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Gérer les Pizzas
            </h2>
            <p className="text-gray-400">
              Ajouter, modifier ou supprimer des pizzas
            </p>
          </Link>

          <Link
            to="/jaimelepoulet/ingredients"
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🧀
            </div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Gérer les Ingrédients
            </h2>
            <p className="text-gray-400">
              Ajouter, modifier ou supprimer des ingrédients
            </p>
          </Link>

          <Link
            to="/jaimelepoulet/boissons"
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🍺
            </div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Gérer les Boissons
            </h2>
            <p className="text-gray-400">
              Ajouter, modifier ou supprimer des boissons
            </p>
          </Link>

          <Link
            to="/jaimelepoulet/supplements"
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              ➕
            </div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Gérer les Suppléments
            </h2>
            <p className="text-gray-400">
              Ajouter, modifier ou supprimer des suppléments
            </p>
          </Link>

          <Link
            to="/jaimelepoulet/evenements"
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Gérer les Événements
            </h2>
            <p className="text-gray-400">
              Ajouter, modifier ou supprimer des événements
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
