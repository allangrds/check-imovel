"use client";

import type { ChecklistItemData, Severity } from "@/lib/checklist-data";

function severityTag(severity?: Severity) {
  if (severity === "critico") return { label: "Crítico", cls: "tag tag-accent" };
  if (severity === "importante") return { label: "Importante", cls: "tag tag-outline" };
  if (severity === "atencao") return { label: "Atenção", cls: "tag tag-neutral" };
  return null;
}

export function ChecklistItem({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItemData;
  checked: boolean;
  onToggle: () => void;
}) {
  const tag = severityTag(item.severity);

  return (
    <label className="flex items-start gap-3 py-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="ci-checkbox-input"
        aria-label={item.title}
      />
      <span className={`ci-checkbox-box ${checked ? "checked" : ""}`}>
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        )}
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-base leading-[1.4]"
            style={checked ? { textDecoration: "line-through", opacity: 0.55 } : undefined}
          >
            {item.title}
          </span>
          {tag && <span className={tag.cls}>{tag.label}</span>}
        </span>
        {item.description && (
          <p className="mt-0.75 mb-0 text-sm opacity-[0.68] leading-[1.45]">{item.description}</p>
        )}
      </span>
    </label>
  );
}
