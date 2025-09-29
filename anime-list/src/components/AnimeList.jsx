import { useEffect, useState } from "react";
import EditAnimeModal from "./EditAnimeModal.jsx";

export default function AnimeList({ refreshKey = 0 }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editing, setEditing] = useState(null); // <- тут зберігаємо рядок для редагування

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/anime");
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      setRows(await res.json());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [refreshKey]);

  const filtered = rows.filter(a =>
    (a.name ?? "").toLowerCase().includes(q.toLowerCase())
  );

  const handleSaved = (updated) => {
    // оновлюємо локально без повторного запиту
    setRows(prev => prev.map(r => r.id === updated.id ? { ...r, ...updated } : r));
    setEditing(null);
  };

  return (
    <>
      <div className="vstack gap-3">
        <div className="input-group">
          <span className="input-group-text">Search</span>
          <input
            className="form-control"
            placeholder="type title…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="btn btn-outline-secondary" onClick={load}>Reload</button>
        </div>

        {loading && <div className="spinner-border" role="status" />}
        {err && <div className="alert alert-danger">Error: {err}</div>}

        {!loading && !err && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{width:70}}>ID</th>
                  <th style={{width:80}}>Image</th>
                  <th>Name</th>
                  <th>Seasons</th>
                  <th>Rating</th>
                  <th style={{width:1}}></th> {/* колонка Дії */}
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td><img src={a.image} alt={a.name} style={{height:40, width:40, objectFit:"cover"}}/></td>
                    <td>{a.name}</td>
                    <td>{a.seasons}</td>
                    <td>{a.rating}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(a)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center text-muted py-4">Nothing found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditAnimeModal
        show={!!editing}
        initial={editing}
        onClose={() => setEditing(null)}
        onSaved={handleSaved}
      />
    </>
  );
}
