export interface QueueItem<T> {
  id: string;
  createdAt: number;
  attempts: number;
  payload: T;
}

export type ActionFn<T> = (payload: T) => Promise<void>;

export interface UseOfflineQueueOptions {
  storeName?: string;
  maxAttempts?: number;
  backoffBaseMs?: number;
  concurrency?: number;
}