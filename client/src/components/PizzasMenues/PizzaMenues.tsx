import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

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

type Supplement = {
  id: number;
  nom: string;
  prix: number;
  gratuit: boolean;
};

function PizzaMenues() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  useEffect(() => {
    // Fetch pizzas
    fetch("/api/admin/pizzas")
      .then((res) => res.json())
      .then((pizzasData) => {
        const pizzasWithIngredients = pizzasData.map((pizza: Pizza) =>
          fetch(`/api/admin/pizzas/${pizza.id}`).then((res) => res.json()),
        );

        return Promise.all(pizzasWithIngredients);
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des pizzas :", err);
      });

    // Fetch supplements
    fetch("/api/admin/supplements")
      .then((res) => res.json())
      .then((data) => {
        setSupplements(data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des suppléments :", err);
      });
  }, []);

  return (
    <article className="relative bg-black min-h-screen text-white pb-16 overflow-hidden">
      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-30 left-10 text-8xl">🍕</div>
        <div className="absolute top-40 right-20 text-6xl">🍄</div>
        <div className="absolute bottom-20 left-20 text-7xl">🧀</div>
        <div className="absolute bottom-40 right-10 text-6xl">🍕</div>
        <div className="absolute top-1/2 left-5 text-5xl">🌿</div>
        <div className="absolute top-1/3 right-10 text-6xl">🍄</div>
      </div>

      <Navbar />

      <div className="relative z-10">
        <h1 className="flex justify-center text-7xl mt-15 text-yellow-500 mb-12">
          Nos Pizzas
        </h1>

        {/* Grid des pizzas */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-gradient-to-br from-yellow-600/10 to-orange-600/5 border border-yellow-600/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">
                {pizza.nom}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {pizza.ingredients?.map((ing) => ing.nom).join(" - ")}
              </p>
              <p className="text-white text-xl font-bold">{pizza.prix}€</p>
            </div>
          ))}
        </div>

        {/* Section Modifications */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-yellow-600/10 to-orange-600/5 border border-yellow-600/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-yellow-500 mb-6 border-b border-yellow-600/30 pb-4">
              TOUTES LES PIZZAS PEUVENT ÊTRE MODIFIÉES
            </h2>

            <div className="space-y-3">
              {supplements.map((supplement, index) => (
                <div
                  key={supplement.id}
                  className={`flex justify-between items-center ${index > 0 ? "border-t border-gray-800 pt-3" : ""}`}
                >
                  <span className="text-gray-300">{supplement.nom}</span>
                  <span
                    className={`font-bold ${supplement.gratuit ? "text-green-400" : "text-yellow-500"}`}
                  >
                    {supplement.gratuit
                      ? "GRATUIT"
                      : `${Number(supplement.prix).toFixed(2)}€`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PizzaMenues;
