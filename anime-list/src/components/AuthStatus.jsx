import { useEffect, useState } from "react";
import GoogleSignIn from "./GoogleSignIn.jsx";

export default function AuthStatus({ onSignedIn }) {
  const [user, setUser] = useState(null);

  const load = async () => {
    try {
      const r = await fetch("/api/auth/me", { credentials: "include" });
      if (r.ok) {
        const data = await r.json();
        setUser(data.user);
        onSignedIn?.(data.user);
      }
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    onSignedIn?.(null);
  };

  if (!user) return <GoogleSignIn onSuccess={(u)=>{ setUser(u); onSignedIn?.(u); }} />;

  return (
    <div className="d-flex align-items-center gap-2">
      <img src={user.picture} alt="" style={{width:32,height:32,borderRadius:16}}/>
      <span className="me-2">{user.name}</span>
      <button className="btn btn-sm btn-outline-secondary" onClick={logout}>Logout</button>
    </div>
  );
}
