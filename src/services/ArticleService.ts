import {
  Article,
  ArticleCreateData,
  ArticleListParams,
  ArticleListResponse,
} from "../types/models";
import { StringOrNumber } from "../types/common";
import { PORT } from "../lib/constants";

const BASE_URL = `http://localhost:${PORT}/articles`;

export function getArticleList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ArticleListParams = {}): Promise<ArticleListResponse> {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

export function getArticle(articleId: StringOrNumber): Promise<Article> {
  return fetch(`${BASE_URL}/${articleId}`).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

export function createArticle(data: ArticleCreateData): Promise<Article> {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

export function patchArticle(
  articleId: StringOrNumber,
  data: ArticleCreateData,
): Promise<Article> {
  return fetch(`${BASE_URL}/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

export function deleteArticle(
  articleId: StringOrNumber,
): Promise<{ message: string }> {
  return fetch(`${BASE_URL}/${articleId}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}
