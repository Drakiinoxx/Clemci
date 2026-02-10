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
  const result = await databaseClient.query("SELECT * FROM ingredients");
  return result.rows as Ingredient[];
};

const readIngredientById = async (id: number): Promise<Ingredient | null> => {
  const result = await databaseClient.query(
    "SELECT * FROM ingredients WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
};

const createIngredient = async (
  ingredient: Omit<Ingredient, "id">,
): Promise<Ingredient> => {
  const result = await databaseClient.query(
    "INSERT INTO ingredients (nom) VALUES ($1) RETURNING *",
    [ingredient.nom],
  );
  return result.rows[0] as Ingredient;
};

const updateIngredient = async (
  id: number,
  ingredient: Partial<Ingredient>,
): Promise<void> => {
  await databaseClient.query("UPDATE ingredients SET nom = $1 WHERE id = $2", [
    ingredient.nom,
    id,
  ]);
};

const deleteIngredient = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM ingredients WHERE id = $1", [id]);
};

// ========== PIZZAS ==========
const readAllPizzas = async (): Promise<Pizza[]> => {
  const result = await databaseClient.query("SELECT * FROM pizzas");
  return result.rows as Pizza[];
};

const readPizzaById = async (id: number) => {
  const result = await databaseClient.query(
    `SELECT p.id, p.nom, p.prix, 
            COALESCE(json_agg(json_build_object('id', i.id, 'nom', i.nom)) FILTER (WHERE i.id IS NOT NULL), '[]') as ingredients
     FROM pizzas p
     LEFT JOIN pizza_ingredients pi ON p.id = pi.pizza_id
     LEFT JOIN ingredients i ON pi.ingredient_id = i.id
     WHERE p.id = $1
     GROUP BY p.id`,
    [id],
  );
  return result.rows[0] || null;
};

const createPizza = async (pizza: {
  nom: string;
  prix: number;
  ingredients: number[];
}) => {
  const client = await databaseClient.connect();
  try {
    await client.query("BEGIN");

    // 1. Créer la pizza
    const result = await client.query(
      "INSERT INTO pizzas (nom, prix) VALUES ($1, $2) RETURNING *",
      [pizza.nom, pizza.prix],
    );
    const newPizza = result.rows[0];

    // 2. Ajouter les ingrédients
    if (pizza.ingredients && pizza.ingredients.length > 0) {
      for (const ingredientId of pizza.ingredients) {
        await client.query(
          "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES ($1, $2)",
          [newPizza.id, ingredientId],
        );
      }
    }

    await client.query("COMMIT");
    return newPizza;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const updatePizza = async (
  id: number,
  pizza: { nom?: string; prix?: number; ingredients?: number[] },
) => {
  const client = await databaseClient.connect();
  try {
    await client.query("BEGIN");

    if (pizza.nom || pizza.prix) {
      await client.query(
        "UPDATE pizzas SET nom = COALESCE($1, nom), prix = COALESCE($2, prix) WHERE id = $3",
        [pizza.nom, pizza.prix, id],
      );
    }

    if (pizza.ingredients) {
      await client.query("DELETE FROM pizza_ingredients WHERE pizza_id = $1", [
        id,
      ]);

      if (pizza.ingredients.length > 0) {
        for (const ingredientId of pizza.ingredients) {
          await client.query(
            "INSERT INTO pizza_ingredients (pizza_id, ingredient_id) VALUES ($1, $2)",
            [id, ingredientId],
          );
        }
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const deletePizza = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM pizzas WHERE id = $1", [id]);
};

// ========== SUPPLEMENTS ==========
const readAllSupplements = async (): Promise<Supplement[]> => {
  const result = await databaseClient.query("SELECT * FROM supplements");
  return result.rows as Supplement[];
};

const readSupplementById = async (id: number): Promise<Supplement | null> => {
  const result = await databaseClient.query(
    "SELECT * FROM supplements WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
};

const createSupplement = async (
  supplement: Omit<Supplement, "id">,
): Promise<Supplement> => {
  const result = await databaseClient.query(
    "INSERT INTO supplements (nom, prix, gratuit) VALUES ($1, $2, $3) RETURNING *",
    [supplement.nom, supplement.prix, supplement.gratuit],
  );
  return result.rows[0] as Supplement;
};

const updateSupplement = async (
  id: number,
  supplement: Partial<Supplement>,
): Promise<void> => {
  await databaseClient.query(
    "UPDATE supplements SET nom = COALESCE($1, nom), prix = COALESCE($2, prix), gratuit = COALESCE($3, gratuit) WHERE id = $4",
    [supplement.nom, supplement.prix, supplement.gratuit, id],
  );
};

const deleteSupplement = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM supplements WHERE id = $1", [id]);
};

interface CategorieBoisson {
  id: number;
  nom: string;
  ordre: number;
}

interface Boisson {
  id: number;
  nom: string;
  prix_33cl?: number;
  prix_25cl?: number;
  prix_50cl?: number;
  prix_100cl?: number;
  categorie_id: number;
}

// ========== CATÉGORIES BOISSONS ==========
const readAllCategoriesBoissons = async (): Promise<CategorieBoisson[]> => {
  const result = await databaseClient.query(
    "SELECT * FROM categories_boissons ORDER BY ordre",
  );
  return result.rows as CategorieBoisson[];
};

// ========== BOISSONS ==========
const readAllBoissons = async (): Promise<Boisson[]> => {
  const result = await databaseClient.query("SELECT * FROM boissons");
  return result.rows as Boisson[];
};

const readBoissonsByCategorie = async (
  categorieId: number,
): Promise<Boisson[]> => {
  const result = await databaseClient.query(
    "SELECT * FROM boissons WHERE categorie_id = $1",
    [categorieId],
  );
  return result.rows as Boisson[];
};

const readBoissonById = async (id: number): Promise<Boisson | null> => {
  const result = await databaseClient.query(
    "SELECT * FROM boissons WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
};

const createBoisson = async (
  boisson: Omit<Boisson, "id">,
): Promise<Boisson> => {
  const result = await databaseClient.query(
    "INSERT INTO boissons (nom, prix_33cl, prix_25cl, prix_50cl, prix_100cl, categorie_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      boisson.nom,
      boisson.prix_33cl,
      boisson.prix_25cl,
      boisson.prix_50cl,
      boisson.prix_100cl,
      boisson.categorie_id,
    ],
  );
  return result.rows[0] as Boisson;
};

const updateBoisson = async (
  id: number,
  boisson: Partial<Boisson>,
): Promise<void> => {
  await databaseClient.query(
    "UPDATE boissons SET nom = COALESCE($1, nom), prix_33cl = COALESCE($2, prix_33cl), prix_25cl = COALESCE($3, prix_25cl), prix_50cl = COALESCE($4, prix_50cl), prix_100cl = COALESCE($5, prix_100cl), categorie_id = COALESCE($6, categorie_id) WHERE id = $7",
    [
      boisson.nom,
      boisson.prix_33cl,
      boisson.prix_25cl,
      boisson.prix_50cl,
      boisson.prix_100cl,
      boisson.categorie_id,
      id,
    ],
  );
};

const deleteBoisson = async (id: number): Promise<void> => {
  await databaseClient.query("DELETE FROM boissons WHERE id = $1", [id]);
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

  // Catégories Boissons
  readAllCategoriesBoissons,

  // Boissons
  readAllBoissons,
  readBoissonsByCategorie,
  readBoissonById,
  createBoisson,
  updateBoisson,
  deleteBoisson,
};
