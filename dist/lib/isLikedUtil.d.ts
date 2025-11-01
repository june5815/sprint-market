import { ID, LikeableItem, LikeableItemWithLiked } from "../types/common";
import { LikeTarget } from "../types/models";
export declare function attachIsLiked(items: LikeableItem[], userId: ID | null | undefined, type: LikeTarget): Promise<LikeableItemWithLiked[]>;
