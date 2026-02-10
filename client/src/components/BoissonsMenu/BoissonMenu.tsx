import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

type CategorieBoisson = {
  id: number;
  nom: string;
  ordre: number;
};

type Boisson = {
  id: number;
  nom: string;
  prix_33cl?: number;
  prix_25cl?: number;
  prix_50cl?: number;
  prix_100cl?: number;
  categorie_id: number;
};

function BoissonsMenu() {
  const [categories, setCategories] = useState<CategorieBoisson[]>([]);
  const [boissonsByCategorie, setBoissonsByCategorie] = useState<{
    [key: number]: Boisson[];
  }>({});

  useEffect(() => {
    // Fetch catégories
    fetch("/api/admin/categories-boissons")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);

        // Pour chaque catégorie, fetch ses boissons
        data.forEach((cat: CategorieBoisson) => {
          fetch(`/api/admin/boissons/categorie/${cat.id}`)
            .then((res) => res.json())
            .then((boissons) => {
              setBoissonsByCategorie((prev) => ({
                ...prev,
                [cat.id]: boissons,
              }));
            });
        });
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des catégories :", err);
      });
  }, []);

  const formatPrix = (boisson: Boisson) => {
    const prix = [];

    if (boisson.prix_33cl)
      prix.push(`${Number(boisson.prix_33cl).toFixed(2)}€`);
    if (boisson.prix_25cl && boisson.prix_50cl) {
      prix.push(
        `${Number(boisson.prix_25cl).toFixed(2)}€ (25cl) / ${Number(boisson.prix_50cl).toFixed(2)}€ (50cl)`,
      );
    } else if (boisson.prix_50cl) {
      prix.push(`${Number(boisson.prix_50cl).toFixed(2)}€ (50cl)`);
    }
    if (boisson.prix_100cl)
      prix.push(`${Number(boisson.prix_100cl).toFixed(2)}€ (100cl)`);

    return prix.join(" | ");
  };

  return (
    <article className="relative bg-black min-h-screen text-white pb-16 overflow-hidden">
      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-80 left-10 text-8xl">🍺</div>
        <div className="absolute top-40 right-20 text-6xl">🥤</div>
        <div className="absolute bottom-70 left-20 text-7xl">☕</div>
        <div className="absolute bottom-40 right-10 text-6xl">🍷</div>
        <div className="absolute top-1/2 left-20 text-5xl">🍹</div>
        <div className="absolute top-1/3 right-10 text-6xl">🍾</div>
      </div>

      <Navbar />

      <div className="relative z-10">
        <h1 className="flex justify-center text-7xl mt-15 text-yellow-500 mb-16">
          Nos Boissons
        </h1>

        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          {categories.map((categorie) => (
            <div key={categorie.id} className="mb-12">
              {/* Titre de la catégorie */}
              <h2 className="text-4xl font-serif text-yellow-500 mb-8 text-center border-b border-yellow-600/30 pb-4">
                {categorie.nom}
              </h2>

              {/* Liste des boissons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {boissonsByCategorie[categorie.id]?.map((boisson) => (
                  <div
                    key={boisson.id}
                    className="bg-gradient-to-br from-yellow-600/10 to-orange-600/5 border border-yellow-600/20 rounded-xl p-4 hover:border-yellow-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-white">
                        {boisson.nom}
                      </h3>
                      <span className="text-yellow-500 font-bold text-lg whitespace-nowrap ml-4">
                        {formatPrix(boisson)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BoissonsMenu;
