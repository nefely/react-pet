// server/api/anime.js
import { Router } from "express";
import mysql from "mysql2/promise";
import { authRequired } from "./auth.js";

const router = Router();

// Пул до спільної БД (де живе таблиця users). Далі для кожного юзера
// переключаємося в його персональну БД через USE.
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "anime",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Назва персональної БД (uid має бути додатнім цілим)
function dbNameForUid(uid) {
  const n = Number(uid);
  if (!Number.isInteger(n) || n <= 0) throw new Error("Bad uid");
  return `anime_u${n}`;
}

// Створюємо БД і таблицю юзера (якщо нема) і переходимо в неї
async function useUserDb(conn, uid) {
  const db = dbNameForUid(uid);

  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${db}\`
     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  await conn.query(`USE \`${db}\``);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS anime_list (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      image      VARCHAR(500) NOT NULL,
      name       VARCHAR(255) NOT NULL,
      seasons    VARCHAR(100) DEFAULT '',
      rating     INT          DEFAULT 0,
      created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

// Хелпер: виконуємо функцію з конекшеном, вже переключеним на БД юзера
async function withUserDb(uid, fn) {
  const conn = await pool.getConnection();
  try {
    await useUserDb(conn, uid);
    return await fn(conn);
  } finally {
    conn.release();
  }
}

/* ====================== ROUTES ====================== */

// GET /api/anime → список для поточного юзера
router.get("/", authRequired, async (req, res) => {
  try {
    const uid = req.user.uid;
    const rows = await withUserDb(uid, async (conn) => {
      const [r] = await conn.query(
        "SELECT id, image, name, seasons, rating FROM anime_list ORDER BY id DESC"
      );
      return r;
    });
    res.json(rows);
  } catch (e) {
    console.error("GET /anime error:", e);
    res.status(500).json({ message: e.message });
  }
});

// POST /api/anime → додати запис у список поточного юзера
router.post("/", authRequired, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { name, image, seasons = "", rating = 0 } = req.body ?? {};
    if (!name || !image) {
      return res.status(400).json({ error: "name та image обовʼязкові" });
    }

    const insertId = await withUserDb(uid, async (conn) => {
      const [r] = await conn.execute(
        "INSERT INTO anime_list (image, name, seasons, rating) VALUES (?, ?, ?, ?)",
        [String(image).trim(), String(name).trim(), String(seasons).trim(), Number(rating)]
      );
      return r.insertId;
    });

    res.status(201).json({
      id: insertId,
      name,
      image,
      seasons,
      rating: Number(rating),
    });
  } catch (e) {
    console.error("POST /anime error:", e);
    res.status(500).json({ message: e.message });
  }
});

// PUT /api/anime/:id → оновити запис у списку поточного юзера
router.put("/:id", authRequired, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const { name, image, seasons = "", rating = 0 } = req.body ?? {};
    if (!name || !image) {
      return res.status(400).json({ error: "name та image обовʼязкові" });
    }

    const affected = await withUserDb(uid, async (conn) => {
      const [r] = await conn.execute(
        "UPDATE anime_list SET name=?, image=?, seasons=?, rating=? WHERE id=?",
        [String(name).trim(), String(image).trim(), String(seasons).trim(), Number(rating), Number(id)]
      );
      return r.affectedRows;
    });

    if (!affected) return res.status(404).json({ error: "Not found" });

    res.json({
      id: Number(id),
      name,
      image,
      seasons,
      rating: Number(rating),
    });
  } catch (e) {
    console.error("PUT /anime/:id error:", e);
    res.status(500).json({ message: e.message });
  }
});

// DELETE /api/anime/:id → видалити запис зі списку поточного юзера
router.delete("/:id", authRequired, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { id } = req.params;

    const affected = await withUserDb(uid, async (conn) => {
      const [r] = await conn.execute(
        "DELETE FROM anime_list WHERE id = ?",
        [Number(id)]
      );
      return r.affectedRows;
    });

    if (!affected) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    console.error("DELETE /anime/:id error:", e);
    res.status(500).json({ message: e.message });
  }
});

export default router;
