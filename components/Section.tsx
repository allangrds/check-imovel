"use client";

import type { ChecklistSectionData } from "@/lib/checklist-data";
import { ChecklistItem } from "./ChecklistItem";

export function Section({
  section,
  checked,
  onToggleItem,
  noteOpen,
  noteValue,
  onToggleNote,
  onNoteChange,
}: {
  section: ChecklistSectionData;
  checked: Record<string, boolean>;
  onToggleItem: (id: string) => void;
  noteOpen: boolean;
  noteValue: string;
  onToggleNote: () => void;
  onNoteChange: (value: string) => void;
}) {
  const total = section.items.length;
  const checkedCount = section.items.filter((i) => checked[i.id]).length;

  let lastGroup: string | undefined;

  return (
    <section
      id={section.id}
      data-screen-label={section.title}
      className="py-6 border-b"
      style={{ borderColor: "var(--color-divider)" }}
    >
      <h2 className="text-2xl mb-1">{section.title}</h2>
      <p className="m-0 text-sm opacity-65">{section.subtitle}</p>
      <p className="mt-[2px] mb-3 text-sm opacity-50 [font-variant-numeric:tabular-nums]">
        {checkedCount} de {total} verificados
      </p>

      {section.items.map((item) => {
        const showGroup = item.group && item.group !== lastGroup;
        if (item.group) lastGroup = item.group;
        return (
          <div key={item.id}>
            {showGroup && (
              <div className="mt-4 mb-1 text-sm tracking-[0.08em] uppercase opacity-55">{item.group}</div>
            )}
            <ChecklistItem item={item} checked={!!checked[item.id]} onToggle={() => onToggleItem(item.id)} />
          </div>
        );
      })}

      <div className="mt-4">
        <button type="button" className="btn btn-ghost text-sm px-2 py-1" onClick={onToggleNote}>
          {noteOpen ? "Ocultar observação" : "Adicionar observação"}
        </button>
        {noteOpen && (
          <div className="field mt-2">
            <label htmlFor={`note-${section.id}`}>Observação</label>
            <textarea
              className="input"
              id={`note-${section.id}`}
              rows={2}
              value={noteValue}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Ex.: quarto recebe sol só até 9h"
            />
          </div>
        )}
      </div>
    </section>
  );
}
