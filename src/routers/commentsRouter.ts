import express from "express";
import { withAsync } from "../lib/withAsync";
import { authMiddleware } from "../lib/authMiddleware";
import {
  updateComment,
  deleteComment,
} from "../inbound/controllers/commentsController";

const commentsRouter = express.Router();

commentsRouter.patch("/:id", authMiddleware, withAsync(updateComment));
commentsRouter.delete("/:id", authMiddleware, withAsync(deleteComment));

export default commentsRouter;
