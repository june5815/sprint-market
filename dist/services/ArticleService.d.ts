import { Article, ArticleCreateData, ArticleListParams, ArticleListResponse } from "../types/models";
import { StringOrNumber } from "../types/common";
export declare function getArticleList({ page, pageSize, keyword, orderBy, }?: ArticleListParams): Promise<ArticleListResponse>;
export declare function getArticle(articleId: StringOrNumber): Promise<Article>;
export declare function createArticle(data: ArticleCreateData): Promise<Article>;
export declare function patchArticle(articleId: StringOrNumber, data: ArticleCreateData): Promise<Article>;
export declare function deleteArticle(articleId: StringOrNumber): Promise<{
    message: string;
}>;
