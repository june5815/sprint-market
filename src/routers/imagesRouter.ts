import express from "express";
import { withAsync } from "../lib/withAsync";
import { authMiddleware } from "../lib/authMiddleware";
import { upload, uploadImage } from "../inbound/controllers/imagesController";

const imagesRouter = express.Router();

imagesRouter.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  withAsync(uploadImage),
);

export default imagesRouter;
