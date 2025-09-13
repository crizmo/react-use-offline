import React, { useEffect, useState } from "react";
import { OfflineQueueProvider, useOfflineQueue, getAllItems, QueueItem } from "react-use-offline";

type Payload = { msg: string };

async function fakeApi(payload: Payload) {
  if (!navigator.onLine) throw new Error("Offline!");
  await new Promise((res) => setTimeout(res, 500));
  console.log("✅ Synced:", payload);
}

function Demo() {
  const { enqueue, processing } = useOfflineQueue<Payload>(fakeApi);
  const [queue, setQueue] = useState<QueueItem<Payload>[]>([]);
  const [synced, setSynced] = useState<Payload[]>([]);
  const [online, setOnline] = useState(navigator.onLine);

  const refreshQueue = async () => {
    const items = await getAllItems<Payload>("queue");
    setQueue(items);
  };

  useEffect(() => {
    refreshQueue();
    const interval = setInterval(refreshQueue, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  const customEnqueue = async (payload: Payload) => {
    enqueue(payload);
    const interval = setInterval(async () => {
      const currentQueue = await getAllItems<Payload>("queue");
      if (!currentQueue.find((i) => i.payload.msg === payload.msg)) {
        setSynced((prev) => [...prev, payload]);
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📦 React Offline Queue Demo & Docs</h1>
      <p style={{ textAlign: "center", color: "#7f8c8d" }}>
        In order to test it , Turn off your network and try enqueueing messages.
      </p>
      <p style={{ textAlign: "center", color: "#7f8c8d" }}>
        Then turn the network back on to see them sync automatically!
      </p>
      {/* Demo controls */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={() => customEnqueue({ msg: "Hello " + new Date().toLocaleTimeString() })}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ➕ Enqueue Message
        </button>
      </div>

      {/* Status */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <strong>Status:</strong>{" "}
        <span style={{ color: online ? "green" : "red" }}>{online ? "🟢 Online" : "🔴 Offline"}</span> |{" "}
        <span style={{ color: processing ? "orange" : "green" }}>{processing ? "⏳ Syncing..." : "✅ Idle"}</span>
      </div>

      {/* Queues */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
        <div style={{ flex: 1, minWidth: 250, padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: 8 }}>📋 Pending Queue</h2>
          {queue.length === 0 ? (
            <p>No queued items 🎉</p>
          ) : (
            <ul>
              {queue.map((item) => (
                <li key={item.id}>
                  <code>{item.payload.msg}</code> (attempts: {item.attempts})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 250, padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: 8 }}>✅ Synced Items</h2>
          {synced.length === 0 ? (
            <p>No items synced yet</p>
          ) : (
            <ul>
              {synced.map((item, idx) => (
                <li key={idx}>
                  <code>{item.msg}</code>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Docs section */}
      <div style={{ backgroundColor: "#f7f7f7", padding: 30, borderRadius: 8 }}>
        <h2>📦 react-use-offline Documentation</h2>

        <h3>✨ Features</h3>
        <ul>
          <li>Queue actions while offline (stored in IndexedDB)</li>
          <li>Automatic retry when network comes back</li>
          <li>Survives browser restarts</li>
          <li>Configurable retries, concurrency, and backoff</li>
        </ul>

        <h3>📦 Installation</h3>
        <pre style={{ background: "#222", color: "#f8f8f2", padding: 12, borderRadius: 6 }}>
          <code>npm install react-use-offline</code>
        </pre>

        <h3>🚀 Quick Start</h3>
        <pre style={{ background: "#222", color: "#f8f8f2", padding: 12, borderRadius: 6, overflowX: "auto" }}>
          <code>{`import { useOfflineQueue, OfflineQueueProvider } from "react-use-offline";

async function sendToServer(payload) {
  if (!navigator.onLine) throw new Error("Offline!");
  await new Promise(res => setTimeout(res, 500));
  console.log("Synced:", payload);
}

function Demo() {
  const { enqueue } = useOfflineQueue(sendToServer);
  return <button onClick={() => enqueue({ msg: "Hello " + Date.now() })}>Enqueue</button>;
}

export default function App() {
  return <OfflineQueueProvider><Demo /></OfflineQueueProvider>;
}`}</code>
        </pre>

        <h3>⚙️ API</h3>
        <ul>
          <li><code>useOfflineQueue&lt;T&gt;(action, options)</code> – hook for queueing actions</li>
          <li><strong>action</strong>: async function to run when online</li>
          <li><strong>options</strong>: storeName, maxAttempts, backoffBaseMs, concurrency</li>
          <li>Returns <code>enqueue(payload)</code> & <code>processing</code></li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OfflineQueueProvider>
      <Demo />
    </OfflineQueueProvider>
  );
}
