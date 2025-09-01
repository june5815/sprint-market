// services/ProductService.js
import { Product, ElectronicProduct } from "../main.js";

const BASE_URL = "https://panda-market-api-crud.vercel.app/products";

// 상품 목록 조회
export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
} = {}) {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { totalCount, list } = await res.json();

    const products = list.map((item) =>
      item.tags.includes("전자제품")
        ? new ElectronicProduct(item)
        : new Product(item)
    );

    return { totalCount, products };
  } catch (err) {
    console.error("❌ getProductList:", err.message);
    throw err;
  }
}

// 상품 상세 조회
export async function getProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
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
}) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("createProduct Error:", err.message);
    throw err;
  }
}

// 상품 수정
export async function patchProduct(
  productId,
  { name, description, price, tags, images }
) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("patchProduct Error:", err.message);
    throw err;
  }
}

// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("deleteProduct Error:", err.message);
    throw err;
  }
}
