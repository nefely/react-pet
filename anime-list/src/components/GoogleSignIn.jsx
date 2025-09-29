import { useEffect, useRef, useState } from "react";

export default function GoogleSignIn({ onSuccess, onError, buttonProps }) {
  const hostRef = useRef(null);
  const buttonDivRef = useRef(null);
  const renderedOnce = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    let pollId;

    const init = () => {
      if (!alive) return;
      const gis = window.google?.accounts?.id;
      if (!gis) return;

      setReady(true);
      if (renderedOnce.current) return;
      renderedOnce.current = true;

      gis.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: async (resp) => {
          try {
            if (!resp?.credential) throw new Error("No credential from Google");
            const r = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ credential: resp.credential }),
            });
            if (!r.ok) throw new Error(await r.text());
            const data = await r.json();
            onSuccess?.(data.user);
          } catch (e) {
            onError?.(e);
            console.error("auth post failed:", e);
          }
        },
      });

      if (hostRef.current) {
        buttonDivRef.current = document.createElement("div");
        hostRef.current.appendChild(buttonDivRef.current);
        gis.renderButton(buttonDivRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          width: 240,
          ...buttonProps,
        });
      }
    };

    if (!window.google?.accounts?.id) {
      pollId = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(pollId);
          init();
        }
      }, 80);
    } else {
      init();
    }

    return () => {
      alive = false;
      if (pollId) clearInterval(pollId);
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [onSuccess, onError, buttonProps]);

  return (
    <div ref={hostRef}>
      {!ready && <span className="text-muted small">Loading Google…</span>}
    </div>
  );
}
