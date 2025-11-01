import { Product, ProductCreateData, ProductListParams, ProductListResponse } from "../types/models";
import { StringOrNumber, PromiseResult } from "../types/common";
export declare function getProductList({ page, pageSize, keyword, orderBy, }?: ProductListParams): PromiseResult<ProductListResponse>;
export declare function getProduct(productId: StringOrNumber): Promise<Product>;
export declare function createProduct(data: ProductCreateData): Promise<Product>;
export declare function patchProduct(productId: StringOrNumber, data: ProductCreateData): Promise<Product>;
export declare function deleteProduct(productId: StringOrNumber): Promise<{
    message: string;
}>;
