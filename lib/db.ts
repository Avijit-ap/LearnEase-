
export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  timestamp: string;
}

export class DB {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = "lms_db";
  private readonly DB_VERSION = 1;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores
        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("quiz_results")) {
          db.createObjectStore("quiz_results", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("badges")) {
          db.createObjectStore("badges", { keyPath: "id" });
        }
      };
    });
  }

  async saveProgress(userId: string, courseId: string, lessonId: string) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["progress"], "readwrite");
      const store = transaction.objectStore("progress");

      const progress = {
        id: `${userId}-${courseId}-${lessonId}`,
        userId,
        courseId,
        lessonId,
        timestamp: new Date().toISOString(),
      };

      const request = store.put(progress);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getProgress(userId: string): Promise<UserProgress[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["progress"], "readonly");
      const store = transaction.objectStore("progress");
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const allProgress = request.result;
        const userProgress = allProgress.filter(
          (progress) => progress.userId === userId
        );
        resolve(userProgress);
      };
    });
  }
}

export const db = new DB();