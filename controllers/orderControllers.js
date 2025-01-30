import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/userModel.js";

export async function createNewOrder(req, res) {
  const { userId, product, quantity, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const newOrder = new OrderModel({
      userId,
      product,
      quantity,
      status,
    });

    const orderResponse = await newOrder.save();

    res.json(orderResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
