import express from "express";
import cors from "cors";
import animeRoutes from "./api/anime.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/ping", (_req, res) => res.json({ ok: true })); // тест
app.use("/api/anime", animeRoutes);

app.listen(3001, "0.0.0.0", () => {
  console.log("✅ API on http://127.0.0.1:3001");
});
