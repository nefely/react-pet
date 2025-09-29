import React from "react";

export default function ConfirmModal({
  show,
  title = "Confirm",
  children,
  confirmText = "Delete",
  confirmVariant = "danger",
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <div className={`modal ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
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
              {busy ? "Deletion…" : confirmText}
            </button>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show" onClick={onCancel} />}
    </div>
  );
}
