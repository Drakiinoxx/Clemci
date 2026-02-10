import type { RequestHandler } from 'express';
import AdminRepository from './AdminRepository';

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
      res.status(404).json({ error: 'Ingredient not found' });
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
      res.status(404).json({ error: 'Pizza not found' });
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
};