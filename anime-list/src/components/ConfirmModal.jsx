// src/components/ConfirmModal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ConfirmModal({
  show,
  title = "Confirm",
  children,
  confirmText = "Delete",
  confirmVariant = "danger",
  busy = false,
  busyText = "Deleting…",
  onConfirm,
  onCancel,
}) {
  // не рендеримо взагалі, якщо модалка закрита → менше шансів на DOM-конфлікти
  if (!show) return null;

  // закривати по Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const modal = (
    <>
      {/* backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={onCancel}
        style={{ zIndex: 1050 }}
      />
      {/* dialog */}
      <div
        className="modal show d-block"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 1051 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel} disabled={busy}>
                Cancel
              </button>
              <button
                className={`btn btn-${confirmVariant}`}
                onClick={onConfirm}
                disabled={busy}
              >
                {busy ? busyText : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // рендеримо поза основним деревом — у <body>
  return createPortal(modal, document.body);
}
