# 📦 react-use-offline

A lightweight React hook for **queuing actions while offline** and syncing automatically when back online.

🔗 [Live Demo on Vercel](https://your-vercel-demo-url.vercel.app)

---

## ✨ Features
- Queue actions when offline (stored in **IndexedDB**).
- Automatic retry when network comes back.
- Survives browser restarts.
- Configurable retries, concurrency, and backoff.

---

## 📦 Installation
```bash
npm install react-use-offline
```

---

## 🚀 Quick Start
```tsx
import React from "react";
import { useOfflineQueue, OfflineQueueProvider } from "react-use-offline";

async function sendToServer(payload: { msg: string }) {
  if (!navigator.onLine) throw new Error("Offline!");
  await new Promise((res) => setTimeout(res, 500));
  console.log("Synced:", payload);
}

function Demo() {
  const { enqueue } = useOfflineQueue<{ msg: string }>(sendToServer);
  return (
    <button onClick={() => enqueue({ msg: "Hello " + Date.now() })}>
      Enqueue
    </button>
  );
}

export default function App() {
  return (
    <OfflineQueueProvider>
      <Demo />
    </OfflineQueueProvider>
  );
}
```

---

## ⚙️ API

### `useOfflineQueue<T>(action, options)`
- `action`: async function to run when online.
- `options`:  
  - `storeName` (default: `"queue"`)
  - `maxAttempts` (default: `3`)
  - `backoffBaseMs` (default: `1000`)
  - `concurrency` (default: `1`)

**Returns:**
- `enqueue(payload: T)` → Add to queue.
- `processing: boolean` → Syncing state.

---

## 👀 Demo App
Run locally:
```bash
cd example
npm install
npm run dev
```

Or try it live here:  
🔗 [Vercel Demo](https://your-vercel-demo-url.vercel.app)
