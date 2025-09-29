import { useState, useMemo } from "react";

export default function AddAnime({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    seasons: "",
    rating: 10,
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const previewOk = useMemo(() => {
    try {
      if (!form.image) return false;
      const u = new URL(form.image);
      return /\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname);
    } catch {
      return false;
    }
  }, [form.image]);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!form.name.trim() || !form.image.trim()) {
      setErr("Поля *Name та *Image обовʼязкові");
      return;
    }
    const r = Number(form.rating);
    if (Number.isNaN(r) || r < 0 || r > 10) {
      setErr("Rating має бути числом у діапазоні 0–10");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          image: form.image.trim(),
          seasons: form.seasons.trim(),
          rating: r,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      const created = await res.json();
      setMsg(`Додано #${created.id}: ${created.name}`);
      setForm({ name: "", image: "", seasons: "", rating: 10 });
      onAdded && onAdded(created); // оновити список у Main
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Додати аніме</h2>

        {msg && <div className="alert alert-success py-2">{msg}</div>}
        {err && <div className="alert alert-danger py-2">Помилка: {err}</div>}

        <form onSubmit={submit} className="row g-3">
          <div className="col-12">
            <label className="form-label">* Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={update}
              placeholder="Магічна битва"
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">* Image URL</label>
            <input
              type="url"
              name="image"
              className="form-control"
              value={form.image}
              onChange={update}
              placeholder="https://example.com/image.jpg"
              required
            />
            {previewOk && (
              <div className="mt-2">
                <img
                  src={form.image}
                  alt="preview"
                  style={{ height: 80, objectFit: "cover", borderRadius: 6 }}
                />
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Seasons (через кому)</label>
            <input
              name="seasons"
              className="form-control"
              value={form.seasons}
              onChange={update}
              placeholder="1, 2, 3"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rating (0–10)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              className="form-control"
              value={form.rating}
              onChange={update}
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" disabled={submitting}>
              {submitting ? "Зберігаю…" : "Додати"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setForm({ name: "", image: "", seasons: "", rating: 10 });
                setErr(null);
                setMsg(null);
              }}
              disabled={submitting}
            >
              Очистити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
