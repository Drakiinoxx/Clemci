import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

type Ingredient = {
  id: number;
  nom: string;
};

function AdminIngredients() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formNom, setFormNom] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/jaimelepoulet");
      return;
    }
    fetchIngredients();
  }, [navigate]);

  const fetchIngredients = async () => {
    try {
      const res = await fetch("/api/admin/ingredients");
      const data = await res.json();
      setIngredients(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  // Filtrer les ingrédients selon la recherche
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.nom.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nom: formNom }),
      });

      if (res.ok) {
        setFormNom("");
        setShowAddForm(false);
        fetchIngredients();
      } else {
        alert("Erreur lors de l'ajout");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/ingredients/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nom: formNom }),
      });

      if (res.ok) {
        setFormNom("");
        setEditingId(null);
        fetchIngredients();
      } else {
        alert("Erreur lors de la modification");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/ingredients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchIngredients();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setFormNom(ingredient.nom);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormNom("");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Link to="/jaimelepoulet/dashboard">
              <button className="text-gray-400 hover:text-white transition-colors">
                ← Retour
              </button>
            </Link>
            <h1 className="text-3xl font-light text-white">Ingrédients</h1>
          </div>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingId(null);
              setFormNom("");
            }}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
          >
            {showAddForm ? "Annuler" : "+ Ajouter"}
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Rechercher un ingrédient..."
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
          />
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                value={formNom}
                onChange={(e) => setFormNom(e.target.value)}
                className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                placeholder="Nom de l'ingrédient"
                required
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? "Ajout..." : "Ajouter"}
              </button>
            </form>
          </div>
        )}

        {/* Compteur de résultats */}
        {searchTerm && (
          <div className="text-gray-400 text-sm mb-4">
            {filteredIngredients.length} résultat
            {filteredIngredients.length > 1 ? "s" : ""}
          </div>
        )}

        {/* Liste des ingrédients */}
        <div className="space-y-2">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
            >
              {editingId === ingredient.id ? (
                // Mode édition
                <form onSubmit={handleEdit} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={formNom}
                    onChange={(e) => setFormNom(e.target.value)}
                    className="flex-1 p-2 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-white px-4 py-2 transition-colors text-sm"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                // Mode affichage
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg">{ingredient.nom}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(ingredient)}
                      className="text-gray-400 hover:text-white px-3 py-1 transition-colors text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(ingredient.id)}
                      className="text-red-500 hover:text-red-400 px-3 py-1 transition-colors text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Messages vides */}
        {filteredIngredients.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-12">
            Aucun résultat pour "{searchTerm}"
          </div>
        )}

        {ingredients.length === 0 && !searchTerm && (
          <div className="text-center text-gray-500 py-12">
            Aucun ingrédient
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminIngredients;
