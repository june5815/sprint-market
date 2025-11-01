import { prismaClient } from './prismaClient.js';

interface LikeableItem {
  id: number;
  [key: string]: any;
}

interface LikeableItemWithLiked extends LikeableItem {
  isLiked: boolean;
}

export async function attachIsLiked(
  items: LikeableItem[], 
  userId: number | null | undefined, 
  type: 'article' | 'product'
): Promise<LikeableItemWithLiked[]> {
  if (!userId) {
    return items.map((item) => ({ ...item, isLiked: false }));
  }
  
  let likeWhere: any = { userId };
  if (type === 'article') {
    likeWhere.articleId = { in: items.map((i) => i.id) };
  } else if (type === 'product') {
    likeWhere.productId = { in: items.map((i) => i.id) };
  }
  
  const likes = await prismaClient.like.findMany({
    where: likeWhere,
    select: type === 'article' ? { articleId: true } : { productId: true },
  });
  
  const likedIds = likes.map((like) => (type === 'article' ? like.articleId : like.productId));
  return items.map((item) => ({ ...item, isLiked: likedIds.includes(item.id) }));
}
