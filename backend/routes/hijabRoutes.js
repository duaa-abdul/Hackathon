// hijabRoutes.js
import express from "express";
import {getAllStyles} from "../controllers/styleController.js";
const router = express.Router();

// routes
router.get("/", getAllStyles);

export { router };


