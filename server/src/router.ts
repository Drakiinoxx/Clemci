import express from "express";
import AdminAction from "./modules/Admin/AdminAction";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// ========== CATÉGORIES BOISSONS ==========
router.get(
  "/api/admin/categories-boissons",
  AdminAction.browseCategoriesBoissons,
);

// ========== BOISSONS ==========
router.get("/api/admin/boissons", AdminAction.browseBoissons);
router.get(
  "/api/admin/boissons/categorie/:categorieId",
  AdminAction.browseBoissonsByCategorie,
);
router.get("/api/admin/boissons/:id", AdminAction.readBoisson);
router.post("/api/admin/boissons", AdminAction.addBoisson);
router.put("/api/admin/boissons/:id", AdminAction.editBoisson);
router.delete("/api/admin/boissons/:id", AdminAction.destroyBoisson);

// ========== AUTH ==========
// Route de login (GARDE UNIQUEMENT CELLE-CI)
router.post("/api/auth/login", async (req, res) => {
  try {
    const { password } = req.body;

    console.log("========== DEBUG LOGIN ==========");
    console.log("Password reçu:", password);
    console.log("Hash dans .env:", process.env.ADMIN_PASSWORD_HASH);
    console.log("JWT_SECRET présent?", !!process.env.JWT_SECRET);

    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH || "",
    );

    console.log("Comparaison résultat:", isValid);
    console.log("================================");

    if (isValid) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "", {
        expiresIn: "24h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Mot de passe incorrect" });
    }
  } catch (error) {
    console.error("❌ ERREUR:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Middleware de protection
const requireAdmin = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token manquant" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "");
    next();
  } catch {
    res.status(403).json({ error: "Token invalide" });
  }
};

// Protège toutes les routes admin qui modifient (POST, PUT, DELETE)
router.post("/api/admin/pizzas", requireAdmin, AdminAction.addPizza);
router.put("/api/admin/pizzas/:id", requireAdmin, AdminAction.editPizza);
router.delete("/api/admin/pizzas/:id", requireAdmin, AdminAction.destroyPizza);

router.post("/api/admin/ingredients", requireAdmin, AdminAction.addIngredient);
router.put(
  "/api/admin/ingredients/:id",
  requireAdmin,
  AdminAction.editIngredient,
);
router.delete(
  "/api/admin/ingredients/:id",
  requireAdmin,
  AdminAction.destroyIngredient,
);

router.post("/api/admin/supplements", requireAdmin, AdminAction.addSupplement);
router.put(
  "/api/admin/supplements/:id",
  requireAdmin,
  AdminAction.editSupplement,
);
router.delete(
  "/api/admin/supplements/:id",
  requireAdmin,
  AdminAction.destroySupplement,
);

router.post("/api/admin/boissons", requireAdmin, AdminAction.addBoisson);
router.put("/api/admin/boissons/:id", requireAdmin, AdminAction.editBoisson);
router.delete(
  "/api/admin/boissons/:id",
  requireAdmin,
  AdminAction.destroyBoisson,
);

export default router;
