import express from "express";
import userRouter from "./userRouter.js";
import orderRouter from "./orderRouter.js";

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(orderRouter);

export default mainRouter;
