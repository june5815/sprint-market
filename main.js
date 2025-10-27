// 2) API 함수 불러오기 (services 폴더에서)
// =======================================
import { getArticleList } from "./services/ArticleService.js";
import { getProductList } from "./services/ProductService.js";


export class Product {
  constructor({
    name,
    description,
    price,
    tags = [],
    images = [],
    favoriteCount = 0,
  } = {}) {
    this.name = name ?? "";
    this.description = description ?? "";
    this.price = Number(price ?? 0);
    this.tags = Array.isArray(tags) ? tags : [];
    this.images = Array.isArray(images) ? images : [];
    this.favoriteCount = Number(favoriteCount ?? 0);
  }

  favorite() {
    this.favoriteCount += 1;
    return this.favoriteCount;
  }
}
// 전자제품 클래스
export class ElectronicProduct extends Product {
  constructor({ manufacturer = "", ...rest } = {}) {
    super(rest);
    this.manufacturer = manufacturer;
  }
}

export class Article {
  constructor({ title, content, writer, likeCount = 0 } = {}) {
    this.title = title ?? "";
    this.content = content ?? "";
    this.writer = writer ?? "";
    this.likeCount = Number(likeCount ?? 0);
    this.createdAt = new Date(); // 심화 요구사항
  }

  like() {
    this.likeCount += 1;
    return this.likeCount;
  }
}

// 3) 테스트 실행
// =======================================

// Article API 테스트
getArticleList({ page: 1, pageSize: 5, keyword: "", orderBy: "recent" })
  .then((data) => {
    console.log("✅ Article list 응답:", data);
  })
  .catch((e) => console.error("❌ Article API error:", e));

// Product API 테스트
(async () => {
  try {
    const { totalCount, products } = await getProductList({ page: 1, pageSize: 5, orderBy: "recent" });
    console.log("✅ Product list 총 개수:", totalCount);
    if (products.length > 0) {
      console.log("✅ 첫 번째 상품 인스턴스 타입:", products[0].constructor.name);
    }
  } catch (e) {
    console.error("❌ Product API error:", e);
  }
})();