import { AuthenticatedRequest } from "./common";
import {
  ArticleCreateData,
  ArticleUpdateData,
  ProductCreateData,
  ProductUpdateData,
  CommentCreateData,
  CommentUpdateData,
} from "./models";

export interface IdParams {
  id: string;
  [key: string]: string;
}


export interface CreateArticleRequest extends AuthenticatedRequest {
  body: ArticleCreateData;
}

export interface UpdateArticleRequest extends AuthenticatedRequest {
  body: ArticleUpdateData;
  params: IdParams;
}

export interface GetArticleRequest extends AuthenticatedRequest {
  params: IdParams;
}


export interface CreateProductRequest extends AuthenticatedRequest {
  body: ProductCreateData;
}

export interface UpdateProductRequest extends AuthenticatedRequest {
  body: ProductUpdateData;
  params: IdParams;
}

export interface GetProductRequest extends AuthenticatedRequest {
  params: IdParams;
}


export interface CreateCommentRequest extends AuthenticatedRequest {
  body: CommentCreateData;
  params: IdParams;
}

export interface UpdateCommentRequest extends AuthenticatedRequest {
  body: CommentUpdateData;
  params: IdParams;
}


export interface LikeRequest extends AuthenticatedRequest {
  params: IdParams;
}

export interface RegisterRequest extends AuthenticatedRequest {
  body: {
    email: string;
    nickname: string;
    password: string;
  };
}

export interface LoginRequest extends AuthenticatedRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface RefreshTokenRequest extends AuthenticatedRequest {
  body: {
    refreshToken: string;
  };
}

export interface UpdateUserInfoRequest extends AuthenticatedRequest {
  body: {
    nickname?: string;
    image?: string;
  };
}

export interface ChangePasswordRequest extends AuthenticatedRequest {
  body: {
    currentPassword: string;
    newPassword: string;
  };
}
