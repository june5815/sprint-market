import multer from "multer";

// 전역 에러 핸들러 미들웨어
export const errorHandler = (err, req, res, next) => {
  // multer 업로드 오류 처리
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: "파일 업로드 오류" });
  }

  //이미지 업로드 오류 처리
  if (err.message === "이미지 파일만 업로드 가능합니다.") {
    return res.status(400).json({ message: err.message });
  }

  // 로깅 (개발 환경에서는 에러 로그 확인)
  console.error(err);

  res.status(500).json({ message: "서버 오류" });
};
