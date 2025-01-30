import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createNewUser);

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

export default router;
