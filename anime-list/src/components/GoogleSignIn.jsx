// src/components/GoogleSignIn.jsx
import { useEffect, useRef } from "react";

// singleton для підвантаження скрипта один раз на весь застосунок
let _gisPromise = null;
function ensureGisLoaded() {
  if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id);
  if (_gisPromise) return _gisPromise;

  const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  if (existing) {
    _gisPromise = new Promise((resolve, reject) => {
      const done = () => resolve(window.google.accounts.id);
      existing.addEventListener("load", done, { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load GIS script")), { once: true });
      if (window.google?.accounts?.id) done();
    });
    return _gisPromise;
  }

  _gisPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(window.google.accounts.id);
    s.onerror = () => reject(new Error("Failed to load GIS script"));
    document.head.appendChild(s);
  });
  return _gisPromise;
}

export default function GoogleSignIn({ onSuccess, onError, buttonProps }) {
  const mountRef = useRef(null);
  const renderedOnce = useRef(false);

  useEffect(() => {
    let canceled = false;

    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!CLIENT_ID) {
      console.error("Missing VITE_GOOGLE_CLIENT_ID in frontend .env");
      if (mountRef.current) mountRef.current.textContent = "Google Sign-In is not configured.";
      return;
    }

    async function boot() {
      try {
        const gis = await ensureGisLoaded();
        if (canceled || renderedOnce.current) return;

        gis.initialize({
          client_id: CLIENT_ID,
          ux_mode: "popup",
          callback: async ({ credential }) => {
            try {
              if (!credential) throw new Error("No credential from Google");
              const r = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ credential }),
              });
              if (!r.ok) {
                const text = await r.text();
                throw new Error(text || `HTTP ${r.status}`);
              }
              const data = await r.json();

              // 🔔 повідомляємо всіх слухачів, що авторизація змінилась
              window.dispatchEvent(new Event("auth:changed"));

              onSuccess?.(data.user);
            } catch (e) {
              console.error("auth post failed:", e);
              onError?.(e);
            }
          },
        });

        if (mountRef.current && !mountRef.current.firstChild) {
          gis.renderButton(mountRef.current, {
            theme: "outline",
            size: "large",
            shape: "pill",
            width: 240,
            ...buttonProps,
          });
          renderedOnce.current = true;
        }
      } catch (e) {
        console.error(e);
        if (mountRef.current) mountRef.current.textContent = "Failed to load Google Sign-In.";
      }
    }

    boot();

    return () => {
      canceled = true;
      // при розмонтуванні очищаємо контейнер, щоб уникнути дублю кнопки у StrictMode
      if (mountRef.current) mountRef.current.textContent = "";
    };
  }, [onSuccess, onError, buttonProps]);

  return <div ref={mountRef} aria-live="polite" />;
}
