import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

type Ingredient = {
  id: number;
  nom: string;
};

type Pizza = {
  id: number;
  nom: string;
  prix: number;
  ingredients?: Ingredient[];
};

function AdminPizzas() {
  const navigate = useNavigate();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formNom, setFormNom] = useState("");
  const [formPrix, setFormPrix] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/jaimelepoulet");
      return;
    }
    fetchPizzas();
    fetchIngredients();
  }, [navigate]);

  const fetchPizzas = async () => {
    try {
      const res = await fetch("/api/admin/pizzas");
      const pizzasData = await res.json();

      // Pour chaque pizza, récupérer ses ingrédients
      const pizzasWithIngredients = await Promise.all(
        pizzasData.map(async (pizza: Pizza) => {
          const detailRes = await fetch(`/api/admin/pizzas/${pizza.id}`);
          return await detailRes.json();
        }),
      );

      setPizzas(pizzasWithIngredients);
    } catch (err) {
      console.error("Erreur fetch pizzas:", err);
    }
  };

  const fetchIngredients = async () => {
    try {
      const res = await fetch("/api/admin/ingredients");
      const data = await res.json();
      setIngredients(data);
    } catch (err) {
      console.error("Erreur fetch ingredients:", err);
    }
  };

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.nom.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetForm = () => {
    setFormNom("");
    setFormPrix("");
    setSelectedIngredients([]);
  };

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id)
        ? prev.filter((ingredientId) => ingredientId !== id)
        : [...prev, id],
    );
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formNom,
          prix: Number(formPrix),
          ingredients: selectedIngredients,
        }),
      });

      if (res.ok) {
        resetForm();
        setShowAddForm(false);
        fetchPizzas();
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
      const res = await fetch(`/api/admin/pizzas/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formNom,
          prix: Number(formPrix),
          ingredients: selectedIngredients,
        }),
      });

      if (res.ok) {
        resetForm();
        setEditingId(null);
        fetchPizzas();
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette pizza ?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/pizzas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchPizzas();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (pizza: Pizza) => {
    setEditingId(pizza.id);
    setFormNom(pizza.nom);
    setFormPrix(pizza.prix.toString());
    setSelectedIngredients(pizza.ingredients?.map((ing) => ing.id) || []);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Link to="/jaimelepoulet/dashboard">
              <button className="text-gray-400 hover:text-white transition-colors">
                ← Retour
              </button>
            </Link>
            <h1 className="text-3xl font-light text-white">Pizzas</h1>
          </div>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingId(null);
              resetForm();
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
            placeholder="🔍 Rechercher une pizza..."
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
          />
        </div>

        {/* Formulaire d'ajout/édition */}
        {(showAddForm || editingId) && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl text-white mb-4">
              {editingId ? "Modifier la pizza" : "Nouvelle pizza"}
            </h2>
            <form
              onSubmit={editingId ? handleEdit : handleAdd}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formNom}
                    onChange={(e) => setFormNom(e.target.value)}
                    className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                    placeholder="Ex: Margherita"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formPrix}
                    onChange={(e) => setFormPrix(e.target.value)}
                    className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                    placeholder="Ex: 9.50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-3 text-sm">
                  Ingrédients ({selectedIngredients.length} sélectionné
                  {selectedIngredients.length > 1 ? "s" : ""})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-3 bg-black rounded border border-gray-800">
                  {ingredients.map((ingredient) => (
                    <label
                      key={ingredient.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedIngredients.includes(ingredient.id)
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-900 text-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient.id)}
                        onChange={() => toggleIngredient(ingredient.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{ingredient.nom}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 font-medium"
                >
                  {loading
                    ? "Enregistrement..."
                    : editingId
                      ? "Modifier"
                      : "Ajouter"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-white px-4 py-2 transition-colors"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Compteur de résultats */}
        {searchTerm && (
          <div className="text-gray-400 text-sm mb-4">
            {filteredPizzas.length} résultat
            {filteredPizzas.length > 1 ? "s" : ""}
          </div>
        )}

        {/* Liste des pizzas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {pizza.nom}
                  </h3>
                  <p className="text-yellow-500 font-bold text-lg mt-1">
                    {Number(pizza.prix).toFixed(2)}€
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(pizza)}
                    className="text-gray-400 hover:text-white px-3 py-1 transition-colors text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(pizza.id)}
                    className="text-red-500 hover:text-red-400 px-3 py-1 transition-colors text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="text-gray-400 text-sm">
                {pizza.ingredients && pizza.ingredients.length > 0 ? (
                  <p>{pizza.ingredients.map((ing) => ing.nom).join(" • ")}</p>
                ) : (
                  <p className="italic">Aucun ingrédient</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Messages vides */}
        {filteredPizzas.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-12">
            Aucun résultat pour "{searchTerm}"
          </div>
        )}

        {pizzas.length === 0 && !searchTerm && (
          <div className="text-center text-gray-500 py-12">Aucune pizza</div>
        )}
      </div>
    </div>
  );
}

export default AdminPizzas;
