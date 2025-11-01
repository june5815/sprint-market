import { prismaClient } from "../lib/prismaClient";
async function handleLike(req, res, type, action) {
    const userId = req.user?.userId;
    const itemId = Number(req.params.id);
    if (!userId) {
        res.status(401).send({ message: "로그인 필요" });
        return;
    }
    const where = { userId };
    if (type === "article")
        where.articleId = itemId;
    if (type === "product")
        where.productId = itemId;
    const existing = await prismaClient.like.findFirst({ where });
    if (action === "like") {
        if (existing) {
            res.status(409).send({ message: "이미 좋아요를 눌렀습니다." });
            return;
        }
        const data = { userId };
        if (type === "article")
            data.articleId = itemId;
        if (type === "product")
            data.productId = itemId;
        await prismaClient.like.create({ data });
        res.status(201).send({ message: "좋아요 완료" });
        return;
    }
    if (action === "unlike") {
        if (!existing) {
            res.status(404).send({ message: "좋아요 기록 없음" });
            return;
        }
        await prismaClient.like.delete({ where: { id: existing.id } });
        res.send({ message: "좋아요 취소 완료" });
        return;
    }
}
export async function likeArticle(req, res) {
    return handleLike(req, res, "article", "like");
}
export async function unlikeArticle(req, res) {
    return handleLike(req, res, "article", "unlike");
}
export async function likeProduct(req, res) {
    return handleLike(req, res, "product", "like");
}
export async function unlikeProduct(req, res) {
    return handleLike(req, res, "product", "unlike");
}
//# sourceMappingURL=likeController.js.map