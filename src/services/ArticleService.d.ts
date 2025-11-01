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
export declare function getArticleList({ page, pageSize, keyword, orderBy, }?: ArticleListParams): Promise<any>;
export declare function getArticle(articleId: string | number): Promise<any>;
export declare function createArticle({ title, content, image }: ArticleData): Promise<any>;
export declare function patchArticle(articleId: string | number, { title, content, image }: ArticleData): Promise<any>;
export declare function deleteArticle(articleId: string | number): Promise<any>;
export {};
