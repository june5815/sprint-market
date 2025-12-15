import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prismaClient } from "./prisma.client";
import { verifyToken } from "./jwt";

interface AuthenticatedSocket extends Socket {
  userId?: number;
}

type SocketCallback<T = NotificationResponse> = (response: T) => void;

interface NotificationResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
}

export let io: SocketIOServer;

export function initializeSocket(httpServer: HTTPServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    const userId = socket.userId;
    console.log(`사용자 ${userId} 연결되었습니다.`);

    socket.join(`user:${userId}`);

    socket.on("disconnect", () => {
      console.log(`사용자 ${userId} 연결 해제되었습니다.`);
    });

    socket.on(
      "get:notifications",
      async (callback: SocketCallback<NotificationResponse>) => {
        try {
          const notifications = await prismaClient.notification.findMany({
            where: { recipientId: userId },
            orderBy: { createdAt: "desc" },
            take: 50,
            include: {
              actor: {
                select: { id: true, nickname: true, image: true },
              },
            },
          });

          const unreadCount = await prismaClient.notification.count({
            where: { recipientId: userId, isRead: false },
          });

          if (typeof callback === "function") {
            callback({
              success: true,
              data: {
                notifications,
                unreadCount,
              },
            });
          }
        } catch (error) {
          if (typeof callback === "function") {
            callback({
              success: false,
              message: "알림 조회 실패했습니다.",
            });
          }
        }
      }
    );

    socket.on(
      "mark:notification-as-read",
      async (
        notificationId: number,
        callback: SocketCallback<NotificationResponse>
      ) => {
        try {
          const notification = await prismaClient.notification.findUnique({
            where: { id: notificationId },
          });

          if (!notification || notification.recipientId !== userId) {
            if (typeof callback === "function") {
              callback({
                success: false,
                message: "권한이 없습니다.",
              });
            }
            return;
          }

          const updated = await prismaClient.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
          });

          if (typeof callback === "function") {
            callback({
              success: true,
              data: updated,
            });
          }

          const unreadCount = await prismaClient.notification.count({
            where: { recipientId: userId, isRead: false },
          });

          socket.emit("notification:unread-count", unreadCount);
        } catch (error) {
          if (typeof callback === "function") {
            callback({
              success: false,
              message: "알림 읽음 처리 실패했습니다.",
            });
          }
        }
      }
    );

    socket.on(
      "mark:all-notifications-as-read",
      async (callback: SocketCallback<NotificationResponse>) => {
        try {
          await prismaClient.notification.updateMany({
            where: { recipientId: userId, isRead: false },
            data: { isRead: true },
          });

          if (typeof callback === "function") {
            callback({
              success: true,
              message: "모든 알림이 읽음으로 표시되었습니다.",
            });
          }

          socket.emit("notification:unread-count", 0);
        } catch (error) {
          if (typeof callback === "function") {
            callback({
              success: false,
              message: "전체 알림 읽음 처리 실패",
            });
          }
        }
      }
    );

    socket.on(
      "get:unread-count",
      async (callback: SocketCallback<NotificationResponse>) => {
        try {
          const unreadCount = await prismaClient.notification.count({
            where: { recipientId: userId, isRead: false },
          });

          if (typeof callback === "function") {
            callback({
              success: true,
              data: {
                unreadCount,
              },
            });
          }
        } catch (error) {
          if (typeof callback === "function") {
            callback({
              success: false,
              message: "안 읽은 알림 개수 조회 실패",
            });
          }
        }
      }
    );
  });

  return io;
}

export async function sendNotificationToUser(
  recipientId: number,
  notification: {
    type: string;
    message: string;
    actorId: number;
    articleId?: number;
    productId?: number;
    commentId?: number;
  }
) {
  try {
    const savedNotification = await prismaClient.notification.create({
      data: {
        recipientId,
        ...notification,
      },
      include: {
        actor: {
          select: { id: true, nickname: true, image: true },
        },
      },
    });

    if (io) {
      io.to(`user:${recipientId}`).emit("notification:new", savedNotification);
    }

    return savedNotification;
  } catch (error) {
    console.error("알림 전송 실패:", error);
    throw error;
  }
}

export function getConnectedUsersCount(): number {
  return io?.engine?.clientsCount || 0;
}
