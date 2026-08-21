"use client";

import type { NavItem } from "./Sidebar";

export function MobileFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="ci-mobile-fab btn btn-primary fixed right-4 bottom-4 z-30"
      onClick={onClick}
      aria-label="Abrir seções"
      style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-md)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18"></path>
      </svg>
      Seções
    </button>
  );
}

export function MobileNavSheet({
  navItems,
  activeSection,
  onNavigate,
  onClose,
}: {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}
      onClick={onClose}
    >
      <div
        className="absolute left-0 right-0 bottom-0 max-h-[75vh] overflow-auto p-4"
        style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="m-0 text-base">Seções</h3>
          <button type="button" className="btn btn-icon" onClick={onClose} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="grid gap-0.5">
          {navItems.map((navItem) => {
            const active = navItem.id === activeSection;
            return (
              <a
                key={navItem.id}
                href={`#${navItem.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(navItem.id);
                }}
                className="flex justify-between py-2 px-1"
                style={{ color: active ? "var(--color-accent)" : "var(--color-text)" }}
              >
                <span>{navItem.title}</span>
                {navItem.showCount && (
                  <span className="opacity-50 [font-variant-numeric:tabular-nums] text-sm">{navItem.countLabel}</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
