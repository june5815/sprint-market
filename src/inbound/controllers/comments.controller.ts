import { Request, Response } from "express";
import { create } from "superstruct";
import { prismaClient } from "../../common/lib/prisma.client";
import { UpdateCommentBodyStruct } from "../../common/validation/comments.struct";
import { IdParamsStruct } from "../../common/validation/common.structs";
import { AuthenticatedHandler } from "../../common/types/common";
import {
  BusinessException,
  BusinessExceptionType,
} from "../../common/errors/business.exception";

export const updateComment: AuthenticatedHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);
  const { content } = create(req.body, UpdateCommentBodyStruct);
  const userId = req.user?.userId;

  const existingComment = await prismaClient.comment.findUnique({
    where: { id },
  });
  if (!existingComment) {
    throw new BusinessException({
      type: BusinessExceptionType.COMMENT_NOT_FOUND,
    });
  }
  if (existingComment.userId !== userId) {
    throw new BusinessException({
      type: BusinessExceptionType.UNAUTHORIZED_MODIFICATION,
    });
  }

  const updatedComment = await prismaClient.comment.update({
    where: { id },
    data: { content },
  });

  res.send(updatedComment);
};

export const deleteComment: AuthenticatedHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);
  const userId = req.user?.userId;

  const existingComment = await prismaClient.comment.findUnique({
    where: { id },
  });
  if (!existingComment) {
    throw new BusinessException({
      type: BusinessExceptionType.COMMENT_NOT_FOUND,
    });
  }
  if (existingComment.userId !== userId) {
    throw new BusinessException({
      type: BusinessExceptionType.UNAUTHORIZED_MODIFICATION,
    });
  }

  await prismaClient.comment.delete({ where: { id } });
  res.status(204).send();
};
