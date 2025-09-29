// server/api/anime.js
import { Router } from "express";
import mysql from "mysql2/promise";

const router = Router();

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "anime",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5
});

// GET /api/anime
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM anime_list ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
});

// POST /api/anime   <-- ВАЖЛИВО
router.post("/", async (req, res) => {
  try {
    const { name, image, seasons = "", rating = 0 } = req.body ?? {};
    if (!name || !image) return res.status(400).json({ error: "name та image обовʼязкові" });

    const [result] = await pool.execute(
      "INSERT INTO anime_list (image, name, seasons, rating) VALUES (?, ?, ?, ?)",
      [image.trim(), name.trim(), seasons.trim(), Number(rating)]
    );

    res.status(201).json({ id: result.insertId, name, image, seasons, rating: Number(rating) });
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.message });
  }
});

export default router;
