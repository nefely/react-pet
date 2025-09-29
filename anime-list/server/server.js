import express from "express";
import cors from "cors";
import animeRoutes from "./api/anime.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);
app.use(express.json());

// ЛОГ кожного запиту — побачимо чи доходить PUT
app.use((req, _res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/anime", animeRoutes);

app.listen(3001, "0.0.0.0", () => console.log("✅ API on http://127.0.0.1:3001"));
