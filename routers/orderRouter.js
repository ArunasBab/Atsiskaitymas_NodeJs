import express from "express";
import { createNewOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.get("/orders");

router.get("/orders/:id");

router.post("/orders", createNewOrder);

router.put("/orders/:id");

router.delete("/orders/:id");

export default router;
