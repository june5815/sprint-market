interface LikeableItem {
    id: number;
    [key: string]: any;
}
interface LikeableItemWithLiked extends LikeableItem {
    isLiked: boolean;
}
export declare function attachIsLiked(items: LikeableItem[], userId: number | null | undefined, type: "article" | "product"): Promise<LikeableItemWithLiked[]>;
export {};
