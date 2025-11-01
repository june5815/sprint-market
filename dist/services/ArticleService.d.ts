interface ArticleListParams {
    page?: number;
    pageSize?: number;
    keyword?: string;
    orderBy?: string;
}
interface ArticleData {
    title: string;
    content: string;
    image?: string;
}
interface Article {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}
interface ArticleListResponse {
    totalCount: number;
    list: Article[];
}
export declare function getArticleList({ page, pageSize, keyword, orderBy, }?: ArticleListParams): Promise<ArticleListResponse>;
export declare function getArticle(articleId: string | number): Promise<Article>;
export declare function createArticle({ title, content, image, }: ArticleData): Promise<Article>;
export declare function patchArticle(articleId: string | number, { title, content, image }: ArticleData): Promise<Article>;
export declare function deleteArticle(articleId: string | number): Promise<{
    message: string;
}>;
export {};
