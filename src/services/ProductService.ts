import {
  Product,
  ProductCreateData,
  ProductListParams,
  ProductListResponse,
} from "../types/models";
import { StringOrNumber } from "../types/common";
import { PORT } from "../lib/constants";

const BASE_URL = `http://localhost:${PORT}/products`;

export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ProductListParams = {}): Promise<ProductListResponse> {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { totalCount, list } = await res.json();

    return { totalCount, list };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("getProductList:", error.message);
    throw error;
  }
}

export async function getProduct(productId: StringOrNumber) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return (await res.json()) as Product;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("getProduct Error:", error.message);
    throw error;
  }
}

export async function createProduct(data: ProductCreateData) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return (await res.json()) as Product;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("createProduct Error:", error.message);
    throw error;
  }
}

export async function patchProduct(
  productId: StringOrNumber,
  data: ProductCreateData,
) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return (await res.json()) as Product;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("patchProduct Error:", error.message);
    throw error;
  }
}

export async function deleteProduct(productId: StringOrNumber) {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return (await res.json()) as { message: string };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("deleteProduct Error:", error.message);
    throw error;
  }
}
