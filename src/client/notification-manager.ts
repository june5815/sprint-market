// 클라이언트 예제: 다중 클라이언트 지원 알림 시스템
// 한 사용자가 여러 기기에서 동시에 접속했을 때 효율적으로 처리

import io from "socket.io-client";

class NotificationManager {
  private socket: ReturnType<typeof io>;
  private deviceId: string;
  private connectedClients: Array<{ deviceId: string; connectedAt: Date }> = [];

  constructor(serverUrl: string, token: string, deviceId?: string) {
    this.deviceId = deviceId || this.generateDeviceId();

    // Socket.IO 연결
    this.socket = io(serverUrl, {
      auth: {
        token,
        deviceId: this.deviceId,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.setupEventListeners();
  }

  private generateDeviceId(): string {
    return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners(): void {
    // ===== 연결 이벤트 =====
    this.socket.on("connect", () => {
      console.log(`✅ 연결됨 (디바이스: ${this.deviceId})`);
    });

    this.socket.on("disconnect", () => {
      console.log(`❌ 연결 해제됨 (디바이스: ${this.deviceId})`);
    });

    // ===== 다른 클라이언트 이벤트 =====

    // 새로운 클라이언트 연결
    this.socket.on("client:connected", (data) => {
      console.log(`🆕 새로운 클라이언트 연결됨:`, {
        deviceId: data.deviceId,
        totalClients: data.totalClients,
        connectedDevices: data.connectedDevices,
      });
      this.connectedClients = data.connectedDevices;
      this.onClientsUpdated();
    });

    // 클라이언트 연결 해제
    this.socket.on("client:disconnected", (data) => {
      console.log(`🗑️ 클라이언트 연결 해제:`, {
        deviceId: data.deviceId,
        remainingClients: data.remainingClients,
      });
      this.connectedClients = data.connectedDevices;
      this.onClientsUpdated();
    });

    // 모든 클라이언트 연결 해제
    this.socket.on("all-clients:disconnected", () => {
      console.log("⚠️ 모든 클라이언트가 연결 해제됨");
      this.connectedClients = [];
    });

    // ===== 알림 이벤트 =====

    // 새로운 알림 수신 (모든 클라이언트가 동시에 수신)
    this.socket.on("notification:new", (notification) => {
      console.log("📬 새로운 알림:", notification);
      this.onNotificationReceived(notification);
    });

    // 읽지 않은 알림 개수 업데이트
    this.socket.on("notification:unread-count", (count) => {
      console.log(`📊 읽지 않은 알림: ${count}개`);
      this.onUnreadCountUpdated(count);
    });

    // ===== 동기화 이벤트 =====

    // 다른 클라이언트에서 실행한 작업 동기화
    this.socket.on("sync:notification-read", (data) => {
      console.log("🔄 다른 클라이언트에서 알림을 읽음:", data);
      this.onNotificationSynced(data);
    });

    // 직접 메시지 수신
    this.socket.on("message:direct", (data) => {
      console.log("💬 직접 메시지:", data);
    });
  }

  // ===== 알림 조회 =====

  public getNotifications(callback?: (response: any) => void): void {
    this.socket.emit("get:notifications", (response: any) => {
      console.log("📋 알림 목록:", response);
      callback?.(response);
    });
  }

  public getUnreadCount(callback?: (response: any) => void): void {
    this.socket.emit("get:unread-count", (response: any) => {
      console.log(`📊 읽지 않은 알림 개수:`, response.data.unreadCount);
      callback?.(response);
    });
  }

  // ===== 알림 관리 =====

  public markAsRead(
    notificationId: number,
    callback?: (response: any) => void
  ): void {
    this.socket.emit(
      "mark:notification-as-read",
      notificationId,
      (response: any) => {
        console.log("✅ 알림을 읽음으로 표시:", response);

        // 모든 클라이언트에 동기화
        this.broadcastToAllClients("notification-read", { notificationId });

        callback?.(response);
      }
    );
  }

  public markAllAsRead(callback?: (response: any) => void): void {
    this.socket.emit("mark:all-notifications-as-read", (response: any) => {
      console.log("✅ 모든 알림을 읽음으로 표시:", response);

      // 모든 클라이언트에 동기화
      this.broadcastToAllClients("all-notifications-read", {});

      callback?.(response);
    });
  }

  // ===== 다중 클라이언트 관리 =====

  public getConnectedClients(callback?: (response: any) => void): void {
    this.socket.emit("get:connected-clients", (response: any) => {
      console.log("📱 연결된 클라이언트:", response.data);
      this.connectedClients = response.data.clients;
      callback?.(response);
    });
  }

  public getConnectedDeviceIds(): string[] {
    return this.connectedClients.map((c) => c.deviceId);
  }

  public isCurrentDevice(deviceId: string): boolean {
    return deviceId === this.deviceId;
  }

  // ===== 클라이언트 간 통신 =====

  /**
   * 특정 디바이스로 직접 메시지 전송
   */
  public sendDirectMessage(
    targetDeviceId: string,
    message: string,
    callback?: (response: any) => void
  ): void {
    this.socket.emit(
      "send:direct-message",
      targetDeviceId,
      message,
      (response: any) => {
        console.log(`💬 메시지 전송 완료 (대상: ${targetDeviceId}):`, response);
        callback?.(response);
      }
    );
  }

  /**
   * 모든 클라이언트에 브로드캐스트
   */
  public broadcastToAllClients(event: string, data: unknown): void {
    console.log(`📢 모든 클라이언트에 브로드캐스트: ${event}`, data);
    this.socket.emit("broadcast:to-all-clients", event, data);
  }

  // ===== 콜백 메서드 =====

  private onNotificationReceived(notification: any): void {
    // 서브클래스에서 오버라이드
    console.log("알림 수신 처리:", notification);
  }

  private onUnreadCountUpdated(count: number): void {
    // 서브클래스에서 오버라이드
    console.log("읽지 않은 알림 개수 업데이트:", count);
  }

  private onClientsUpdated(): void {
    // 서브클래스에서 오버라이드
    console.log("연결된 클라이언트 정보 업데이트:", this.connectedClients);
  }

  private onNotificationSynced(data: any): void {
    // 서브클래스에서 오버라이드
    console.log("알림 동기화:", data);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

// ===== 사용 예제 =====

/*
// 1. 기본 사용
const manager = new NotificationManager(
  'http://localhost:3000',
  'your-jwt-token',
  'mobile-device-1'
);

// 2. 알림 조회
manager.getNotifications();
manager.getUnreadCount();

// 3. 알림 읽음 처리 (모든 클라이언트에 동기화)
manager.markAsRead(123);
manager.markAllAsRead();

// 4. 연결된 클라이언트 확인
manager.getConnectedClients();
console.log(manager.getConnectedDeviceIds()); // ['mobile-device-1', 'desktop-1', 'tablet-1']

// 5. 특정 디바이스에 메시지 전송
manager.sendDirectMessage('desktop-1', 'PC에서 확인해주세요');

// 6. 모든 클라이언트 동기화
manager.broadcastToAllClients('settings-updated', { theme: 'dark' });

// 7. 연결 해제
manager.disconnect();
*/

export default NotificationManager;
