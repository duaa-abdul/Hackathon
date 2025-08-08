// Example: routes/styleRoutes.js
import express from "express";
import { getAllStyles } from "../controllers/styleController.js";

const router = express.Router();

router.get("/", getAllStyles); // This handles GET /api/styles

export default router;
