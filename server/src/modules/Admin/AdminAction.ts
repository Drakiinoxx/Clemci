import type { RequestHandler } from "express";
import AdminRepository from "./AdminRepository";

// ========== INGREDIENTS ==========
const browseIngredients: RequestHandler = async (req, res, next) => {
  try {
    const ingredients = await AdminRepository.readAllIngredients();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

const readIngredient: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const ingredient = await AdminRepository.readIngredientById(id);

    if (!ingredient) {
      res.status(404).json({ error: "Ingredient not found" });
      return;
    }

    res.json(ingredient);
  } catch (err) {
    next(err);
  }
};

const addIngredient: RequestHandler = async (req, res, next) => {
  try {
    const newIngredient = await AdminRepository.createIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};

const editIngredient: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.updateIngredient(id, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const destroyIngredient: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.deleteIngredient(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// ========== PIZZAS ==========
const browsePizzas: RequestHandler = async (req, res, next) => {
  try {
    const pizzas = await AdminRepository.readAllPizzas();
    res.json(pizzas);
  } catch (err) {
    next(err);
  }
};

const readPizza: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pizza = await AdminRepository.readPizzaById(id);

    if (!pizza) {
      res.status(404).json({ error: "Pizza not found" });
      return;
    }

    res.json(pizza);
  } catch (err) {
    next(err);
  }
};

const addPizza: RequestHandler = async (req, res, next) => {
  try {
    const newPizza = await AdminRepository.createPizza(req.body);
    res.status(201).json(newPizza);
  } catch (err) {
    next(err);
  }
};

const editPizza: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.updatePizza(id, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const destroyPizza: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.deletePizza(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const browseSupplements: RequestHandler = async (req, res, next) => {
  try {
    const supplements = await AdminRepository.readAllSupplements();
    res.json(supplements);
  } catch (err) {
    next(err);
  }
};

const readSupplement: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const supplement = await AdminRepository.readSupplementById(id);

    if (!supplement) {
      res.status(404).json({ error: "Supplement not found" });
      return;
    }

    res.json(supplement);
  } catch (err) {
    next(err);
  }
};

const addSupplement: RequestHandler = async (req, res, next) => {
  try {
    const newSupplement = await AdminRepository.createSupplement(req.body);
    res.status(201).json(newSupplement);
  } catch (err) {
    next(err);
  }
};

const editSupplement: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.updateSupplement(id, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const destroySupplement: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.deleteSupplement(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
// ========== CATÉGORIES BOISSONS ==========
const browseCategoriesBoissons: RequestHandler = async (req, res, next) => {
  try {
    const categories = await AdminRepository.readAllCategoriesBoissons();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// ========== BOISSONS ==========
const browseBoissons: RequestHandler = async (req, res, next) => {
  try {
    const boissons = await AdminRepository.readAllBoissons();
    res.json(boissons);
  } catch (err) {
    next(err);
  }
};

const browseBoissonsByCategorie: RequestHandler = async (req, res, next) => {
  try {
    const categorieId = Number(req.params.categorieId);
    const boissons = await AdminRepository.readBoissonsByCategorie(categorieId);
    res.json(boissons);
  } catch (err) {
    next(err);
  }
};

const readBoisson: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const boisson = await AdminRepository.readBoissonById(id);

    if (!boisson) {
      res.status(404).json({ error: "Boisson not found" });
      return;
    }

    res.json(boisson);
  } catch (err) {
    next(err);
  }
};

const addBoisson: RequestHandler = async (req, res, next) => {
  try {
    const newBoisson = await AdminRepository.createBoisson(req.body);
    res.status(201).json(newBoisson);
  } catch (err) {
    next(err);
  }
};

const editBoisson: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.updateBoisson(id, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const destroyBoisson: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await AdminRepository.deleteBoisson(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default {
  // Ingredients
  browseIngredients,
  readIngredient,
  addIngredient,
  editIngredient,
  destroyIngredient,

  // Pizzas
  browsePizzas,
  readPizza,
  addPizza,
  editPizza,
  destroyPizza,

  // Supplements
  browseSupplements,
  readSupplement,
  addSupplement,
  editSupplement,
  destroySupplement,

  // Catégories Boissons
  browseCategoriesBoissons,

  // Boissons
  browseBoissons,
  browseBoissonsByCategorie,
  readBoisson,
  addBoisson,
  editBoisson,
  destroyBoisson,
};
