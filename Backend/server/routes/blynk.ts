import type { RequestHandler } from "express";

export const getBlynkValue: RequestHandler = async (req, res) => {
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
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
};
