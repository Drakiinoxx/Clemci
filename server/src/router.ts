import express from 'express';
import AdminAction from './modules/Admin/AdminAction';

const router = express.Router();

// ========== INGREDIENTS ==========
router.get("/api/admin/ingredients", AdminAction.browseIngredients);
router.get("/api/admin/ingredients/:id", AdminAction.readIngredient);
router.post("/api/admin/ingredients", AdminAction.addIngredient);
router.put("/api/admin/ingredients/:id", AdminAction.editIngredient);
router.delete("/api/admin/ingredients/:id", AdminAction.destroyIngredient);

// ========== PIZZAS ==========
router.get("/api/admin/pizzas", AdminAction.browsePizzas);
router.get("/api/admin/pizzas/:id", AdminAction.readPizza);
router.post("/api/admin/pizzas", AdminAction.addPizza);
router.put("/api/admin/pizzas/:id", AdminAction.editPizza);
router.delete("/api/admin/pizzas/:id", AdminAction.destroyPizza);


// ========== SUPPLEMENTS ==========
router.get("/api/admin/supplements", AdminAction.browseSupplements);
router.get("/api/admin/supplements/:id", AdminAction.readSupplement);
router.post("/api/admin/supplements", AdminAction.addSupplement);
router.put("/api/admin/supplements/:id", AdminAction.editSupplement);
router.delete("/api/admin/supplements/:id", AdminAction.destroySupplement);
export default router;