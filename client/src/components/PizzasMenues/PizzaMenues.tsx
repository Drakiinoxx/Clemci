import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

type Pizza ={
  nom:string,
  prix:number
}

type PizzaIngredients = {
  nom:string
}

function PizzaMenues() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("/api/admin/pizzas") // Attention : ton endpoint c'est /api/admin/pizzas
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        console.log("Pizzas récupérées :", data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des pizzas :", err);
      });
  }, []);

  return (
    <article>
      <Navbar />
      <h1 className="flex justify-center text-7xl mt-15 text-yellow-500">
        Nos Pizzas
      </h1>

      <td></td>
    </article>
  );
}

export default PizzaMenues;
