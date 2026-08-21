"use client";

import type { Category } from "@/lib/checklist-data";

const CATEGORIES: { id: Category; title: string }[] = [
  { id: "compra", title: "Compra de imóvel" },
  { id: "manutencao", title: "Manutenção de imóvel" },
  { id: "construcao", title: "Construção de casa" },
];

export function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Finalidade do checklist"
      className="flex gap-1 overflow-x-auto py-2"
    >
      {CATEGORIES.map((category) => {
        const active = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(category.id)}
            className="text-sm whitespace-nowrap px-3 py-1.5 rounded-full border"
            style={{
              borderColor: active ? "var(--color-accent)" : "var(--color-divider)",
              background: active ? "var(--color-accent)" : "transparent",
              color: active ? "var(--color-neutral-100)" : "var(--color-text)",
            }}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}
