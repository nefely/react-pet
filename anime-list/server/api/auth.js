import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const router = Router();
export default router;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "anime",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
});

const signAppJwt = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies?.session;
    if (!token) return res.status(401).json({ error: "unauth" });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "unauth" });
  }
};

// POST /api/auth/google  { credential }
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body ?? {};
    if (!credential) return res.status(400).json({ error: "no credential" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const p = ticket.getPayload(); // { sub, email, name, picture }

    // upsert user
    const [rows] = await pool.query("SELECT id FROM users WHERE google_id=?", [p.sub]);
    let uid;
    if (rows.length) {
      uid = rows[0].id;
      await pool.execute("UPDATE users SET email=?, name=?, picture=? WHERE id=?",
        [p.email, p.name, p.picture, uid]);
    } else {
      const [ins] = await pool.execute(
        "INSERT INTO users (google_id,email,name,picture) VALUES (?,?,?,?)",
        [p.sub, p.email, p.name, p.picture]
      );
      uid = ins.insertId;
    }

    const token = signAppJwt({ uid, email: p.email, name: p.name, picture: p.picture });
    res.cookie("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // у проді true + HTTPS
      path: "/",
    });
    res.json({ ok: true, user: { uid, email: p.email, name: p.name, picture: p.picture } });
  } catch (e) {
    console.error("auth error:", e.message);
    res.status(401).json({ error: "invalid token" });
  }
});

router.get("/me", authRequired, (req, res) => res.json({ user: req.user }));
router.post("/logout", (_req, res) => {
  res.clearCookie("session", { sameSite: "lax", path: "/" });
  res.json({ ok: true });
});
