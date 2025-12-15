import { Request, Response } from "express";
import { create } from "superstruct";
import { prismaClient } from "../../lib/prismaClient";
import NotFoundError from "../../lib/errors/NotFoundError";
import BadRequestError from "../../lib/errors/BadRequestError";
import { IdParamsStruct } from "../../structs/commonStructs";
import {
  CreateArticleBodyStruct,
  UpdateArticleBodyStruct,
  GetArticleListParamsStruct,
} from "../../structs/articlesStructs";
import {
  CreateCommentBodyStruct,
  GetCommentListParamsStruct,
} from "../../structs/commentsStruct";
import { attachIsLiked } from "../../lib/isLikedUtil";
import { AuthenticatedHandler, ExpressHandler } from "../../types/common";

export const createArticle: AuthenticatedHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user?.userId;
  if (!userId) {
    res
      .status(401)
      .send({ message: "로그인된 사용자만 게시글을 등록할 수 있습니다." });
    return;
  }
  const data = create(req.body, CreateArticleBodyStruct);
  const article = await prismaClient.article.create({
    data: { ...data, userId },
  });

  // 응답 형식 정렬
  const response = {
    updatedAt: article.updatedAt,
    createdAt: article.createdAt,
    image: article.image,
    content: article.content,
    title: article.title,
    id: article.id,
  };

  res.status(201).send(response);
};

export const getArticle: ExpressHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);
  const userId = req.user?.userId;

  const article = await prismaClient.article.findUnique({ where: { id } });
  if (!article) {
    throw new NotFoundError("article", id);
  }

  const [articleWithLiked] = await attachIsLiked([article], userId, "article");

  // 응답 형식 정렬
  const response = {
    updatedAt: articleWithLiked.updatedAt,
    createdAt: articleWithLiked.createdAt,
    image: articleWithLiked.image,
    content: articleWithLiked.content,
    title: articleWithLiked.title,
    id: articleWithLiked.id,
  };

  res.send(response);
};

export const updateArticle: AuthenticatedHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);
  const data = create(req.body, UpdateArticleBodyStruct);
  const userId = req.user?.userId;
  const article = await prismaClient.article.findUnique({ where: { id } });
  if (!article) {
    throw new NotFoundError("article", id);
  }
  if (article.userId !== userId) {
    res
      .status(403)
      .send({ message: "게시글 등록한 사용자만 수정할 수 있습니다." });
    return;
  }
  const updatedArticle = await prismaClient.article.update({
    where: { id },
    data,
  });

  // 응답 형식 정렬
  const response = {
    updatedAt: updatedArticle.updatedAt,
    createdAt: updatedArticle.createdAt,
    image: updatedArticle.image,
    content: updatedArticle.content,
    title: updatedArticle.title,
    id: updatedArticle.id,
  };

  res.send(response);
};

export const deleteArticle: AuthenticatedHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);
  const userId = req.user?.userId;
  const existingArticle = await prismaClient.article.findUnique({
    where: { id },
  });
  if (!existingArticle) {
    throw new NotFoundError("article", id);
  }
  if (existingArticle.userId !== userId) {
    res
      .status(403)
      .send({ message: "게시글 등록한 사용자만 삭제할 수 있습니다." });
    return;
  }
  await prismaClient.article.delete({ where: { id } });

  res.send({ id });
};

export async function getArticleList(
  req: Request,
  res: Response,
): Promise<void> {
  const { page, pageSize, orderBy, keyword } = create(
    req.query,
    GetArticleListParamsStruct,
  );
  const userId = req.user?.userId;

  const where = {
    title: keyword ? { contains: keyword } : undefined,
  };

  const totalCount = await prismaClient.article.count({ where });
  const articles = await prismaClient.article.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy:
      orderBy === "recent" ? { createdAt: "desc" } : { createdAt: "asc" },
    where,
  });

  const articlesWithIsLiked = await attachIsLiked(articles, userId, "article");

  // 응답 형식 정렬
  const formattedList = articlesWithIsLiked.map((article) => ({
    updatedAt: article.updatedAt,
    createdAt: article.createdAt,
    image: article.image,
    content: article.content,
    title: article.title,
    id: article.id,
  }));

  res.send({
    totalCount,
    list: formattedList,
  });
}

export async function createComment(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res
      .status(401)
      .send({ message: "로그인된 사용자만 댓글을 등록할 수 있습니다." });
    return;
  }
  const { id: articleId } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, CreateCommentBodyStruct);

  const existingArticle = await prismaClient.article.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) {
    throw new NotFoundError("article", articleId);
  }

  const comment = await prismaClient.comment.create({
    data: {
      articleId,
      content,
      userId,
    },
  });

  res.status(201).send(comment);
}

export async function getCommentList(
  req: Request,
  res: Response,
): Promise<void> {
  const { id: articleId } = create(req.params, IdParamsStruct);
  const { cursor, limit } = create(req.query, GetCommentListParamsStruct);

  const article = await prismaClient.article.findUnique({
    where: { id: articleId },
  });
  if (!article) {
    throw new NotFoundError("article", articleId);
  }

  const commentsWithCursor = await prismaClient.comment.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: { articleId },
    orderBy: { createdAt: "desc" },
  });
  const comments = commentsWithCursor.slice(0, limit);
  const cursorComment = commentsWithCursor[limit];
  const nextCursor = cursorComment ? cursorComment.id : null;

  res.send({
    list: comments,
    nextCursor,
  });
}
