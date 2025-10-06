import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const getBlynkValue = async (req, res) => {
  try {
    const token = String(req.query.token || "").trim();
    const pin = String(req.query.pin || "").trim();
    if (!token || !pin) {
      res.status(400).json({ error: "Missing token or pin" });
      return;
    }
    const url = `https://blynk.cloud/external/api/get?token=${encodeURIComponent(token)}&${encodeURIComponent(pin)}`;
    const r = await fetch(url);
    if (!r.ok) {
      res.status(r.status).json({ error: `Blynk error ${r.status}` });
      return;
    }
    const text = await r.text();
    const value = parseFloat(text);
    res.json({ value: Number.isFinite(value) ? value : text });
  } catch (e) {
    res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/blynk/value", getBlynkValue);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
