import express from "express";
import { withAsync } from "../lib/withAsync";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductList,
  createComment,
  getCommentList,
} from "../inbound/controllers/productsController";
import { authMiddleware } from "../lib/authMiddleware";

const productsRouter = express.Router();

productsRouter.post("/", authMiddleware, withAsync(createProduct));
productsRouter.get("/", withAsync(getProductList));
productsRouter.get("/:id", withAsync(getProduct));
productsRouter.patch("/:id", authMiddleware, withAsync(updateProduct));
productsRouter.delete("/:id", authMiddleware, withAsync(deleteProduct));
productsRouter.post("/:id/comments", authMiddleware, withAsync(createComment));
productsRouter.get("/:id/comments", withAsync(getCommentList));

export default productsRouter;
