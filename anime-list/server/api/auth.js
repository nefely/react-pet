// server/api/auth.js
import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const router = Router();

// 1) MySQL pool (спільна БД з таблицею users)
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "anime",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// 2) Таблиця users (створюємо, якщо нема)
async function ensureUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id        INT AUTO_INCREMENT PRIMARY KEY,
      google_id VARCHAR(64) NOT NULL UNIQUE,
      email     VARCHAR(255),
      name      VARCHAR(255),
      picture   VARCHAR(512),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
}
ensureUsersTable().catch(console.error);

// 3) Google OAuth клієнт
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 4) JWT хелпери
function signAppJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function authRequired(req, res, next) {
  try {
    const token = req.cookies?.session;
    if (!token) return res.status(401).json({ error: "unauth" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data; // { uid, email, name, picture }
    next();
  } catch {
    return res.status(401).json({ error: "unauth" });
  }
}

// 5) Логін через Google: створюємо юзера, якщо його ще нема
// POST /api/auth/google { credential: <id_token> }
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body ?? {};
    if (!credential) return res.status(400).json({ error: "no credential" });

    // Перевіряємо id_token і аудитора (має дорівнювати GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); // sub, email, name, picture...
    const googleId = payload.sub;

    // UPSERT: шукаємо існуючого, якщо нема — створюємо
    let uid;
    const [rows] = await pool.query(
      "SELECT id FROM users WHERE google_id=?",
      [googleId]
    );
    if (rows.length) {
      uid = rows[0].id;
      await pool.execute(
        "UPDATE users SET email=?, name=?, picture=? WHERE id=?",
        [payload.email || null, payload.name || null, payload.picture || null, uid]
      );
    } else {
      const [ins] = await pool.execute(
        "INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)",
        [googleId, payload.email || null, payload.name || null, payload.picture || null]
      );
      uid = ins.insertId;
    }

    // Ставимо httpOnly cookie з JWT
    const token = signAppJwt({
      uid,
      email: payload.email || null,
      name: payload.name || null,
      picture: payload.picture || null,
    });

    res.cookie("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // у проді → true + HTTPS
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
    });

    res.json({
      ok: true,
      user: { uid, email: payload.email || null, name: payload.name || null, picture: payload.picture || null },
    });
  } catch (e) {
    console.error("auth error:", e?.message || e);
    // типові причини: 403 (origin не дозволений у Google), audience mismatch (інший client_id)
    res.status(401).json({ error: "invalid token" });
  }
});

// 6) Поточний користувач
router.get("/me", authRequired, (req, res) => {
  res.json({ user: req.user });
});

// 7) Логаут
router.post("/logout", (_req, res) => {
  res.clearCookie("session", { sameSite: "lax", path: "/" });
  res.json({ ok: true });
});

export default router;
