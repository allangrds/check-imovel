"use client";

export function ConfirmClearDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="dialog-backdrop" style={{ zIndex: 50 }}>
      <div className="dialog">
        <div className="dialog-title">Limpar checklist?</div>
        <p className="dialog-body">Isso remove todas as marcações e observações salvas neste navegador. Essa ação não pode ser desfeita.</p>
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Limpar tudo
          </button>
        </div>
      </div>
    </div>
  );
}
