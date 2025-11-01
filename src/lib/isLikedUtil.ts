import { prismaClient } from "./prismaClient";

interface LikeableItem {
  id: number;
  [key: string]: any; 
}

interface LikeableItemWithLiked extends LikeableItem {
  isLiked: boolean;
}

interface LikeWhereClause {
  userId: number;
  articleId?: { in: number[] };
  productId?: { in: number[] };
}

interface LikeRecord {
  articleId?: number;
  productId?: number;
}

export async function attachIsLiked(
  items: LikeableItem[],
  userId: number | null | undefined,
  type: "article" | "product"
): Promise<LikeableItemWithLiked[]> {
  if (!userId) {
    return items.map((item) => ({ ...item, isLiked: false }));
  }

  let likeWhere: LikeWhereClause = { userId };
  if (type === "article") {
    likeWhere.articleId = { in: items.map((i) => i.id) };
  } else if (type === "product") {
    likeWhere.productId = { in: items.map((i) => i.id) };
  }

  const likes = await prismaClient.like.findMany({
    where: likeWhere,
    select: type === "article" ? { articleId: true } : { productId: true },
  });

  const likedIds = likes.map((like: LikeRecord) =>
    type === "article" ? like.articleId : like.productId
  );
  return items.map((item) => ({
    ...item,
    isLiked: likedIds.includes(item.id),
  }));
}
