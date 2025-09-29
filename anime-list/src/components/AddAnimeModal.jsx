import { useState, useMemo } from "react";

export default function AddAnimeModal({ show, onClose, onSaved }) {
    const [form, setForm] = useState({ name: "", image: "", seasons: "", rating: 10 });
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState(null);

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
        setSaving(true);
        try {
            const res = await fetch("/api/anime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    image: form.image.trim(),
                    seasons: form.seasons.trim(),
                    rating: Number(form.rating),
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
            const created = await res.json();
            onSaved?.(created); // повідомляємо батька
            setForm({ name: "", image: "", seasons: "", rating: 10 });
            onClose?.();
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={`modal ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={submit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add Anime</h5>
                            <button type="button" className="btn-close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            {err && <div className="alert alert-danger">Помилка: {err}</div>}

                            <div className="mb-3">
                                <label className="form-label">Name *</label>
                                <input className="form-control" name="name" value={form.name} onChange={update} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Image URL *</label>
                                <input type="url" className="form-control" name="image" value={form.image} onChange={update} required />
                                {previewOk && <img src={form.image} alt="preview" className="mt-2 rounded" style={{ height: 80, objectFit: "cover" }} />}
                            </div>

                            <div className="row g-3">
                                <div className="col-md-8">
                                    <label className="form-label">Seasons</label>
                                    <input className="form-control" name="seasons" value={form.seasons} onChange={update} placeholder="1, 2, 3" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Rating (0–10)</label>
                                    <input type="number" min="0" max="10" step="0.1" className="form-control" name="rating" value={form.rating} onChange={update} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn btn-success" disabled={saving}>
                                {saving ? "Adding…" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show" onClick={onClose} />}
        </div>
    );
}
