import { openDB } from "idb";
import { QueueItem } from "./types";

async function getDB(storeName = "queue") {
  return openDB("offline-queue", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    }
  });
}

export async function addItem<T>(item: QueueItem<T>, storeName = "queue") {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  tx.store.add(item);
  await tx.done;
}

export async function getAllItems<T>(storeName = "queue") {
  const db = await getDB(storeName);
  return await db.getAll(storeName) as QueueItem<T>[];
}

export async function deleteItem(id: string, storeName = "queue") {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  tx.store.delete(id);
  await tx.done;
}

export async function updateItem<T>(item: QueueItem<T>, storeName = "queue") {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  tx.store.put(item);
  await tx.done;
}