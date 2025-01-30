import express from "express";
import {
  createNewOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.post("/orders", createNewOrder);

router.put("/orders/:id", updateOrderById);

router.delete("/orders/:id", deleteOrderById);

export default router;
