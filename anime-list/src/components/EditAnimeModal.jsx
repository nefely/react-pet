import { useEffect, useState, useMemo } from "react";

export default function EditAnimeModal({ show, initial, onClose, onSaved }) {
    const [form, setForm] = useState({ id: null, name: "", image: "", seasons: "", rating: 10 });
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (initial) {
            setForm({
                id: initial.id,
                name: initial.name ?? "",
                image: initial.image ?? "",
                seasons: initial.seasons ?? "",
                rating: initial.rating ?? 10,
            });
            setErr(null);
        }
    }, [initial]);

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
        setSaving(true);
        try {
            const res = await fetch(`/api/anime/${form.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    image: form.image.trim(),
                    seasons: form.seasons.trim(),
                    rating: Number(form.rating),
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
            const updated = await res.json();
            onSaved && onSaved(updated);
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setSaving(false);
        }
    };

    // простий Bootstrap-like modal без маніпуляцій DOM
    return (
        <div className={`modal ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={submit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Anime Edit #{form.id}</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            {err && <div className="alert alert-danger">Error: {err}</div>}

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
                            <button className="btn btn-primary" disabled={saving}>
                                {saving ? "Saving…" : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {show && <div className="modal-backdrop fade show" onClick={onClose} />}
        </div>
    );
}
