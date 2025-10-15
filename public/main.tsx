import "./styles/globals.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { ReceivedData } from "~/components/received-data";
import { TestUart } from "~/components/test-uart";

const App: React.FC = () => {
  return (
    <main className="container py-4">
      <h1 className="text-3xl font-bold mb-4 text-balance">
        422001504303 - Du An Ky Thuat - Nhom 4
      </h1>

      <section className="grid md:grid-cols-2 gap-4">
        <h2 className="sr-only">UART Communication Tester and Received Data</h2>

        <TestUart />
        <ReceivedData />
      </section>
    </main>
  );
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
