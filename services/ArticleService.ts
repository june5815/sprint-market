// services/ArticleService.ts
const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";

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

// 게시글 목록 조회
export function getArticleList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ArticleListParams = {}): Promise<any> {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

// 게시글 상세 조회
export function getArticle(articleId: string | number): Promise<any> {
  return fetch(`${BASE_URL}/${articleId}`).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

// 게시글 생성
export function createArticle({
  title,
  content,
  image,
}: ArticleData): Promise<any> {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

// 게시글 수정
export function patchArticle(
  articleId: string | number,
  { title, content, image }: ArticleData
): Promise<any> {
  return fetch(`${BASE_URL}/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

// 게시글 삭제
export function deleteArticle(articleId: string | number): Promise<any> {
  return fetch(`${BASE_URL}/${articleId}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}
