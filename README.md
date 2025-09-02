# 스프린트 미션
# 5-Sprint-Mission

## 요구사항 체크리스트

### 기본
- [x] 본인 브랜치에 스프린트 미션 업로드
- [x] 적절한 커밋 메시지 작성
- [x] 레포지토리 fork 완료
- [x] upstream 본인 브랜치로 PR 생성
- [x] PR 코멘트에 체크리스트 포함


### 클래스 구현
- [x] Product 클래스 생성 (name, description, price, tags, images, favoriteCount)  
- [x] Product 클래스에 `favorite()` 메서드 구현  
- [x] ElectronicProduct 클래스 생성 (Product 상속 + manufacturer)  
- [x] Article 클래스 생성 (title, content, writer, likeCount, createdAt)  
- [x] Article 클래스에 `like()` 메서드 구현  

### Article API
- [x] getArticleList() 구현 (GET, page/pageSize/keyword 쿼리 지원)  
- [x] getArticle() 구현 (GET)  
- [x] createArticle() 구현 (POST, title/content/image)  
- [x] patchArticle() 구현 (PATCH)  
- [x] deleteArticle() 구현 (DELETE)  
- [x] `.then().catch()`를 사용하여 비동기 처리  
- [x] 2xx 외 상태코드 시 에러 출력  

### Product API
- [x] getProductList() 구현 (GET, page/pageSize/keyword 쿼리 지원)  
- [x] getProduct() 구현 (GET)  
- [x] createProduct() 구현 (POST, name/description/price/tags/images)  
- [x] patchProduct() 구현 (PATCH)  
- [x] deleteProduct() 구현 (DELETE)  
- [x] `async/await + try/catch` 사용하여 비동기 처리  
- [x] getProductList() 결과를 Product / ElectronicProduct 인스턴스로 변환  

### 파일 구조
- [x] ProductService.js : Product API 관련 함수
- [x] ArticleService.js : Article API 관련 함수
- [x] main.js : 실행 코드

### 심화
- [ ] 심화 항목 1
- [ ] 심화 항목 2

---

## 주요 변경사항
- .
- .

---

## 스크린샷
![image](./image.png)

---

## 멘토에게
- 셀프 코드 리뷰를 통해 질문 이어가겠습니다.
- .
