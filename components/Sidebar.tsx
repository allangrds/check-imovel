"use client";

export interface NavItem {
  id: string;
  title: string;
  showCount: boolean;
  countLabel: string;
}

export function Sidebar({
  navItems,
  activeSection,
  onNavigate,
}: {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="ci-sidebar" aria-label="Seções" style={{ width: 210, flex: "none", position: "sticky", top: 96, padding: "27.6px 0" }}>
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
            className="flex justify-between gap-2 py-1.5 px-1 text-sm no-underline"
            style={{
              borderLeft: `2px solid ${active ? "var(--color-accent)" : "transparent"}`,
              color: active ? "var(--color-accent)" : "var(--color-text)",
              paddingLeft: 10,
            }}
          >
            <span>{navItem.title}</span>
            {navItem.showCount && (
              <span className="opacity-50 [font-variant-numeric:tabular-nums] text-sm">{navItem.countLabel}</span>
            )}
          </a>
        );
      })}
    </nav>
  );
}
