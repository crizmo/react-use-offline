import { useCallback, useEffect, useState } from "react";
import { addItem, getAllItems, deleteItem, updateItem } from "./queueStore";
import { QueueItem, ActionFn, UseOfflineQueueOptions } from "./types";

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useOfflineQueue<T = any>(
  action: ActionFn<T>,
  options: UseOfflineQueueOptions = {}
) {
  const {
    storeName = "queue",
    maxAttempts = 3,
    backoffBaseMs = 1000,
    concurrency = 1,
  } = options;

  const [processing, setProcessing] = useState(false);

  const enqueue = useCallback(
    async (payload: T) => {
      const item: QueueItem<T> = {
        id: uuid(),
        createdAt: Date.now(),
        attempts: 0,
        payload,
      };
      await addItem(item, storeName);
      processQueue();
    },
    [storeName]
  );

  const processQueue = useCallback(async () => {
    if (processing || !navigator.onLine) return;
    setProcessing(true);

    try {
      const items = await getAllItems<T>(storeName);
      for (const item of items.slice(0, concurrency)) {
        // mark attempt before processing
        await updateItem({ ...item, attempts: item.attempts + 1 }, storeName);

        try {
          await action(item.payload);
          await deleteItem(item.id, storeName);
        } catch (err) {
          console.warn("Retry later:", err);
          if (item.attempts + 1 >= maxAttempts) {
            await deleteItem(item.id, storeName);
          }
        }
      }
    } finally {
      setProcessing(false);
    }
  }, [processing, action, storeName, maxAttempts, concurrency]);

  useEffect(() => {
    if (navigator.onLine) processQueue();
    const online = () => processQueue();
    window.addEventListener("online", online);
    return () => window.removeEventListener("online", online);
  }, [processQueue]);

  return { enqueue, processing };
}