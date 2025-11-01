// services/ProductService.ts
interface ProductListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}

const BASE_URL = "https://panda-market-api-crud.vercel.app/products";

// 상품 목록 조회
export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ProductListParams = {}): Promise<any> {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { totalCount, list } = await res.json();

    return { totalCount, products: list };
  } catch (err: any) {
    console.error("❌ getProductList:", err.message);
    throw err;
  }
}

// 상품 상세 조회
export async function getProduct(productId: string | number): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("getProduct Error:", err.message);
    throw err;
  }
}

// 상품 생성
export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}: ProductData): Promise<any> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("createProduct Error:", err.message);
    throw err;
  }
}

// 상품 수정
export async function patchProduct(
  productId: string | number,
  { name, description, price, tags, images }: ProductData
): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("patchProduct Error:", err.message);
    throw err;
  }
}

// 상품 삭제
export async function deleteProduct(productId: string | number): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("deleteProduct Error:", err.message);
    throw err;
  }
}
