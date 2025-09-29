import { useEffect, useState } from "react";
import EditAnimeModal from "./EditAnimeModal.jsx";

export default function AnimeList({ refreshKey = 0 }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // <- id, що видаляється

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
    setRows(prev => prev.map(r => r.id === updated.id ? { ...r, ...updated } : r));
    setEditing(null);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Видалити «${row.name}» (id=${row.id})?`)) return;
    setErr(null);
    setDeletingId(row.id);
    try {
      const res = await fetch(`/api/anime/${row.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      // оптимістично прибираємо зі списку
      setRows(prev => prev.filter(r => r.id !== row.id));
    } catch (e) {
      setErr(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="vstack gap-3">
        <div className="input-group">
          <span className="input-group-text btn btn-secondary"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input
            className="form-control"
            placeholder="type title…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={load}><i className="fa-solid fa-rotate-right"></i></button>
        </div>

        {loading && <div className="spinner-border" role="status" />}
        {err && <div className="alert alert-danger">Error: {err}</div>}

        {!loading && !err && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{width:55}}></th>
                  <th>Name</th>
                  <th>Seasons</th>
                  <th>Rating</th>
                  <th style={{width:1}}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td><img src={a.image} alt={a.name} style={{height:40, width:40, objectFit:"cover"}}/></td>
                    <td>{a.name}</td>
                    <td>{a.seasons}</td>
                    <td>{a.rating}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setEditing(a)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(a)}
                          disabled={deletingId === a.id}
                        >
                          {deletingId === a.id ? "..." : <i className="fa-solid fa-trash"></i>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-muted py-4">Nothing found</td></tr>
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
