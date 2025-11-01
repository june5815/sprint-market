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
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
}
interface ProductListResponse {
    totalCount: number;
    products: Product[];
}
export declare function getProductList({ page, pageSize, keyword, orderBy, }?: ProductListParams): Promise<ProductListResponse>;
export declare function getProduct(productId: string | number): Promise<Product>;
export declare function createProduct({ name, description, price, tags, images, }: ProductData): Promise<Product>;
export declare function patchProduct(productId: string | number, { name, description, price, tags, images }: ProductData): Promise<Product>;
export declare function deleteProduct(productId: string | number): Promise<{
    message: string;
}>;
export {};
