import databaseClient from "../../../database/client";

interface Ingredient {
  id: number;
  nom: string;
}

interface Pizza {
  id: number;
  nom: string;
  prix: number;
}

interface Supplement {
  id: number;
  nom: string;
  prix: number;
  gratuit: boolean;
}

// ========== INGREDIENTS ==========
const readAllIngredients = async (): Promise<Ingredient[]> => {
  const [rows] = await databaseClient.query("SELECT * FROM ingredients");
  return rows as Ingredient[];
};

const readIngredientById = async (id: number): Promise<Ingredient | null> => {
  const [rows] = await databaseClient.query(
    "SELECT * FROM ingredients WHERE id = ?",
    [id],
  );
  const ingredients = rows as Ingredient[];
  return ingredients[0] || null;
};

const createIngredient = async (
  ingredient: Omit<Ingredient, "id">,
): Promise<Ingredient> => {
  const [result] = await databaseClient.query(
    "INSERT INTO ingredients (nom) VALUES (?)",
    [ingredient.nom],
  );
  const insertId = (result as any).insertId;
  return { id: insertId, ...ingredient };
};

const updateIngredient = async (
  id: number,
  ingredient: Partial<Ingredient>,
): Promise<void> => {
  await databaseClient.query("UPDATE ingredients SET nom = ? WHERE id = ?", [
    ingredient.nom,
    id,
  ]);
};

const deleteIngredient = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM ingredients WHERE id = ?", [id]);
};

// ========== PIZZAS ==========
const readAllPizzas = async (): Promise<Pizza[]> => {
  const [rows] = await databaseClient.query("SELECT * FROM pizzas");
  return rows as Pizza[];
};

const readPizzaById = async (id: number) => {
  // Pizza avec ses ingrédients (jointure)
  const [rows] = await databaseClient.query(
    `SELECT p.id, p.nom, p.prix, 
            JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'nom', i.nom)) as ingredients
     FROM pizzas p
     LEFT JOIN pizza_ingredients pi ON p.id = pi.pizza_id
     LEFT JOIN ingredients i ON pi.ingredient_id = i.id
     WHERE p.id = ?
     GROUP BY p.id`,
    [id],
  );
  const pizzas = rows as any[];
  return pizzas[0] || null;
};

const createPizza = async (pizza: {
  nom: string;
  prix: number;
  ingredients: number[];
}) => {
  const connection = await databaseClient.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Créer la pizza
    const [result] = await connection.query(
      "INSERT INTO pizzas (nom, prix) VALUES (?, ?)",
      [pizza.nom, pizza.prix],
    );
    const pizzaId = (result as any).insertId;

    // 2. Ajouter les ingrédients
    if (pizza.ingredients && pizza.ingredients.length > 0) {
      const values = pizza.ingredients.map((ingredientId) => [
        pizzaId,
        ingredientId,
      ]);
      await connection.query(
        "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES ?",
        [values],
      );
    }

    await connection.commit();
    return { id: pizzaId, nom: pizza.nom, prix: pizza.prix };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updatePizza = async (
  id: number,
  pizza: { nom?: string; prix?: number; ingredients?: number[] },
) => {
  const connection = await databaseClient.getConnection();
  try {
    await connection.beginTransaction();

    if (pizza.nom || pizza.prix) {
      await connection.query(
        "UPDATE pizzas SET nom = COALESCE(?, nom), prix = COALESCE(?, prix) WHERE id = ?",
        [pizza.nom, pizza.prix, id],
      );
    }

    if (pizza.ingredients) {
      await connection.query(
        "DELETE FROM pizza_ingredients WHERE pizza_id = ?",
        [id],
      );

      if (pizza.ingredients.length > 0) {
        const values = pizza.ingredients.map((ingredientId) => [
          id,
          ingredientId,
        ]);
        await connection.query(
          "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES ?",
          [values],
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deletePizza = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM pizzas WHERE id = ?", [id]);
};

// ========== SUPPLEMENTS ==========
const readAllSupplements = async (): Promise<Supplement[]> => {
  const [rows] = await databaseClient.query("SELECT * FROM supplements");
  return rows as Supplement[];
};

const readSupplementById = async (id: number): Promise<Supplement | null> => {
  const [rows] = await databaseClient.query(
    "SELECT * FROM supplements WHERE id = ?",
    [id],
  );
  const supplements = rows as Supplement[];
  return supplements[0] || null;
};

const createSupplement = async (
  supplement: Omit<Supplement, "id">,
): Promise<Supplement> => {
  const [result] = await databaseClient.query(
    "INSERT INTO supplements (nom, prix, gratuit) VALUES (?, ?, ?)",
    [supplement.nom, supplement.prix, supplement.gratuit],
  );
  const insertId = (result as any).insertId;
  return { id: insertId, ...supplement };
};

const updateSupplement = async (
  id: number,
  supplement: Partial<Supplement>,
): Promise<void> => {
  await databaseClient.query(
    "UPDATE supplements SET nom = COALESCE(?, nom), prix = COALESCE(?, prix), gratuit = COALESCE(?, gratuit) WHERE id = ?",
    [supplement.nom, supplement.prix, supplement.gratuit, id],
  );
};

const deleteSupplement = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM supplements WHERE id = ?", [id]);
};

export default {
  // Ingredients
  readAllIngredients,
  readIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,

  // Pizzas
  readAllPizzas,
  readPizzaById,
  createPizza,
  updatePizza,
  deletePizza,

  // Supplements
  readAllSupplements,
  readSupplementById,
  createSupplement,
  updateSupplement,
  deleteSupplement,
};
