import mongoose from "mongoose";
import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/userModel.js";

export async function getAllOrders(req, res) {
  try {
    const orders = await OrderModel.find({}, { __v: 0 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const order = await OrderModel.findById(id, { __v: 0 });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

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

export async function updateOrderById(req, res) {
  const { id } = req.params;
  const { userId, product, quantity, status } = req.body;

  try {
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.product = product;
    order.quantity = quantity;
    order.status = status;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteOrderById(req, res) {
  const { id } = req.params;

  try {
    const deleteOrder = await OrderModel.findByIdAndDelete(id);

    if (!deleteOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(deleteOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
