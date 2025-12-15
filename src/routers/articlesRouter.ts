import express from "express";
import { withAsync } from "../lib/withAsync";
import { authMiddleware } from "../lib/authMiddleware";
import {
  createArticle,
  getArticleList,
  getArticle,
  updateArticle,
  deleteArticle,
  createComment,
  getCommentList,
} from "../inbound/controllers/articlesController";

const articlesRouter = express.Router();

articlesRouter.post("/", authMiddleware, withAsync(createArticle));
articlesRouter.get("/", withAsync(getArticleList));
articlesRouter.get("/:id", withAsync(getArticle));
articlesRouter.patch("/:id", authMiddleware, withAsync(updateArticle));
articlesRouter.delete("/:id", authMiddleware, withAsync(deleteArticle));
articlesRouter.post("/:id/comments", authMiddleware, withAsync(createComment));
articlesRouter.get("/:id/comments", withAsync(getCommentList));

export default articlesRouter;
