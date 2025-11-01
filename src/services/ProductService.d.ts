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
export declare function getProductList({ page, pageSize, keyword, orderBy, }?: ProductListParams): Promise<any>;
export declare function getProduct(productId: string | number): Promise<any>;
export declare function createProduct({ name, description, price, tags, images, }: ProductData): Promise<any>;
export declare function patchProduct(productId: string | number, { name, description, price, tags, images }: ProductData): Promise<any>;
export declare function deleteProduct(productId: string | number): Promise<any>;
export {};
