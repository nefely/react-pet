import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import animeRoutes from "./api/anime.js";
import authRoutes from "./api/auth.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
}));
app.use(express.json());
app.use(cookieParser());

// Debug-лог
app.use((req, _res, next) => { console.log(req.method, req.url); next(); });

app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);

app.listen(3001, "0.0.0.0", () => console.log("✅ API on http://127.0.0.1:3001"));
