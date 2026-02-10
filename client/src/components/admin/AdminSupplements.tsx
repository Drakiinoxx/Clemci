import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

type Supplement = {
  id: number;
  nom: string;
  prix: number;
  gratuit: boolean;
};

function AdminSupplements() {
  const navigate = useNavigate();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formNom, setFormNom] = useState("");
  const [formPrix, setFormPrix] = useState("");
  const [formGratuit, setFormGratuit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/jaimelepoulet");
      return;
    }
    fetchSupplements();
  }, [navigate]);

  const fetchSupplements = async () => {
    try {
      const res = await fetch("/api/admin/supplements");
      const data = await res.json();
      setSupplements(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  const filteredSupplements = supplements.filter((supplement) =>
    supplement.nom.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetForm = () => {
    setFormNom("");
    setFormPrix("");
    setFormGratuit(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/supplements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formNom,
          prix: formGratuit ? 0 : Number(formPrix),
          gratuit: formGratuit,
        }),
      });

      if (res.ok) {
        resetForm();
        setShowAddForm(false);
        fetchSupplements();
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
      const res = await fetch(`/api/admin/supplements/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formNom,
          prix: formGratuit ? 0 : Number(formPrix),
          gratuit: formGratuit,
        }),
      });

      if (res.ok) {
        resetForm();
        setEditingId(null);
        fetchSupplements();
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce supplément ?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/supplements/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchSupplements();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (supplement: Supplement) => {
    setEditingId(supplement.id);
    setFormNom(supplement.nom);
    setFormPrix(supplement.prix.toString());
    setFormGratuit(supplement.gratuit);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
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
            <h1 className="text-3xl font-light text-white">Suppléments</h1>
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
            placeholder="🔍 Rechercher un supplément..."
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
          />
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Nom</label>
                <input
                  type="text"
                  value={formNom}
                  onChange={(e) => setFormNom(e.target.value)}
                  className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                  placeholder="Ex: Supplément burrata"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="gratuit"
                  checked={formGratuit}
                  onChange={(e) => setFormGratuit(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="gratuit" className="text-gray-300">
                  Gratuit
                </label>
              </div>

              {!formGratuit && (
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
                    placeholder="Ex: 3.50"
                    required={!formGratuit}
                  />
                </div>
              )}

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
            {filteredSupplements.length} résultat
            {filteredSupplements.length > 1 ? "s" : ""}
          </div>
        )}

        {/* Liste des suppléments */}
        <div className="space-y-2">
          {filteredSupplements.map((supplement) => (
            <div
              key={supplement.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
            >
              {editingId === supplement.id ? (
                // Mode édition
                <form onSubmit={handleEdit} className="space-y-3">
                  <input
                    type="text"
                    value={formNom}
                    onChange={(e) => setFormNom(e.target.value)}
                    className="w-full p-2 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                    required
                    autoFocus
                  />

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`edit-gratuit-${supplement.id}`}
                      checked={formGratuit}
                      onChange={(e) => setFormGratuit(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={`edit-gratuit-${supplement.id}`}
                      className="text-gray-300"
                    >
                      Gratuit
                    </label>
                  </div>

                  {!formGratuit && (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formPrix}
                      onChange={(e) => setFormPrix(e.target.value)}
                      className="w-full p-2 rounded bg-black text-white border border-gray-800 focus:border-gray-600 focus:outline-none"
                      placeholder="Prix"
                      required={!formGratuit}
                    />
                  )}

                  <div className="flex gap-2">
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
                  </div>
                </form>
              ) : (
                // Mode affichage
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-lg">{supplement.nom}</span>
                    <span
                      className={`ml-3 text-sm font-medium ${supplement.gratuit ? "text-green-400" : "text-gray-400"}`}
                    >
                      {supplement.gratuit
                        ? "GRATUIT"
                        : `${Number(supplement.prix).toFixed(2)}€`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(supplement)}
                      className="text-gray-400 hover:text-white px-3 py-1 transition-colors text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(supplement.id)}
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
        {filteredSupplements.length === 0 && searchTerm && (
          <div className="text-center text-gray-500 py-12">
            Aucun résultat pour "{searchTerm}"
          </div>
        )}

        {supplements.length === 0 && !searchTerm && (
          <div className="text-center text-gray-500 py-12">
            Aucun supplément
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSupplements;
