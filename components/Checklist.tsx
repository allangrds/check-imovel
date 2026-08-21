"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Category, ChecklistSectionData } from "@/lib/checklist-data";
import { Header } from "./Header";
import { CategoryTabs } from "./CategoryTabs";
import { Sidebar, type NavItem } from "./Sidebar";
import { MobileFab, MobileNavSheet } from "./MobileNav";
import { Section } from "./Section";
import { InfoSections } from "./InfoSections";
import { ConfirmClearDialog } from "./ConfirmClearDialog";
import { Footer } from "./Footer";

const STORAGE_KEY = "checkimovel:v1";

const INFO_SECTIONS = [
  { id: "reforma", title: "Reforma" },
  { id: "decisao", title: "Como decidir" },
];

const CATEGORY_INTRO: Record<Category, string> = {
  compra:
    "Reúne, em ordem prática, os pontos que costumam fazer diferença na compra de uma casa ou apartamento — vistoria, documentação, custos e manutenção. Marque o que já verificou; o progresso fica salvo neste navegador.",
  manutencao:
    "O que planejar e orçar ao longo do tempo depois de comprar, para não ser pego de surpresa por gastos de curto, médio e longo prazo.",
  construcao:
    "Reúne os pontos que costumam fazer diferença ao construir uma casa do zero — terreno, projeto, instalações e acompanhamento de obra. Marque o que já verificou; o progresso fica salvo neste navegador.",
};

export function Checklist({ sections }: { sections: ChecklistSectionData[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteOpenMap, setNoteOpenMap] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("compra");
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "geral");
  const [copied, setCopied] = useState(false);
  const scrollScheduled = useRef(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const categorySections = useMemo(
    () => sections.filter((s) => s.category === activeCategory),
    [sections, activeCategory]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setChecked(parsed.checked || {});
        setNotes(parsed.notes || {});
      }
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  const allIds = useMemo(() => {
    const ids = categorySections.map((s) => s.id);
    return activeCategory === "compra" ? ids.concat(["reforma", "decisao"]) : ids;
  }, [categorySections, activeCategory]);

  useEffect(() => {
    const onScroll = () => {
      if (scrollScheduled.current) return;
      scrollScheduled.current = true;
      requestAnimationFrame(() => {
        scrollScheduled.current = false;
        const offset = 130;
        let current = allIds[0];
        for (const id of allIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top - offset <= 0) current = id;
        }
        setActiveSection((prev) => (prev !== current ? current : prev));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allIds]);

  const persist = useCallback((nextChecked: Record<string, boolean>, nextNotes: Record<string, string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked: nextChecked, notes: nextNotes }));
    } catch {
      // ignore write failures (private mode, quota, etc.)
    }
  }, []);

  const toggleItem = useCallback(
    (itemId: string) => {
      setChecked((prev) => {
        const next = { ...prev, [itemId]: !prev[itemId] };
        persist(next, notes);
        return next;
      });
    },
    [notes, persist]
  );

  const updateNote = useCallback(
    (sectionId: string, value: string) => {
      setNotes((prev) => {
        const next = { ...prev, [sectionId]: value };
        persist(checked, next);
        return next;
      });
    },
    [checked, persist]
  );

  const toggleNoteOpen = useCallback((sectionId: string) => {
    setNoteOpenMap((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const selectCategory = useCallback(
    (category: Category) => {
      setActiveCategory(category);
      const first = sections.find((s) => s.category === category);
      setActiveSection(first?.id ?? "");
      setCopied(false);
      window.scrollTo({ top: 0 });
    },
    [sections]
  );

  const clearAll = useCallback(() => {
    const categoryItemIds = new Set(categorySections.flatMap((s) => s.items.map((i) => i.id)));
    const categorySectionIds = new Set(categorySections.map((s) => s.id));
    const nextChecked = Object.fromEntries(Object.entries(checked).filter(([id]) => !categoryItemIds.has(id)));
    const nextNotes = Object.fromEntries(Object.entries(notes).filter(([id]) => !categorySectionIds.has(id)));
    persist(nextChecked, nextNotes);
    setChecked(nextChecked);
    setNotes(nextNotes);
    setConfirmOpen(false);
  }, [categorySections, checked, notes, persist]);

  useEffect(() => {
    return () => clearTimeout(copyTimeout.current);
  }, []);

  const copyMissingItems = useCallback(() => {
    const text = categorySections
      .map((s) => {
        const missing = s.items.filter((i) => !checked[i.id]);
        if (missing.length === 0) return null;
        return `${s.title}\n${missing.map((i) => `- ${i.title}`).join("\n")}`;
      })
      .filter((s): s is string => s !== null)
      .join("\n\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [categorySections, checked]);

  const totalItems = categorySections.reduce((sum, s) => sum + s.items.length, 0);
  const totalChecked = categorySections.reduce((sum, s) => sum + s.items.filter((i) => checked[i.id]).length, 0);

  const navItems: NavItem[] = categorySections
    .map((s) => {
      const sectionChecked = s.items.filter((i) => checked[i.id]).length;
      return { id: s.id, title: s.title, showCount: true, countLabel: `${sectionChecked}/${s.items.length}` };
    })
    .concat(
      activeCategory === "compra"
        ? INFO_SECTIONS.map((s) => ({ id: s.id, title: s.title, showCount: false, countLabel: "" }))
        : []
    );

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      <Header totalChecked={totalChecked} totalItems={totalItems} />

      <div className="max-w-[1120px] mx-auto px-4">
        <CategoryTabs activeCategory={activeCategory} onSelect={selectCategory} />
      </div>

      <div className="max-w-[1120px] mx-auto px-4 flex gap-6 items-start">
        <Sidebar navItems={navItems} activeSection={activeSection} onNavigate={scrollToSection} />

        <main className="flex-1 min-w-0 max-w-[700px] py-6 pb-8">
          <p className="text-sm opacity-75 mb-6 max-w-[60ch]">{CATEGORY_INTRO[activeCategory]}</p>

          {sections.map((section) => (
            <div key={section.id} hidden={section.category !== activeCategory}>
              <Section
                section={section}
                checked={checked}
                onToggleItem={toggleItem}
                noteOpen={!!noteOpenMap[section.id]}
                noteValue={notes[section.id] || ""}
                onToggleNote={() => toggleNoteOpen(section.id)}
                onNoteChange={(value) => updateNote(section.id, value)}
              />
            </div>
          ))}

          <div hidden={activeCategory !== "compra"}>
            <InfoSections />
          </div>

          <div className="pt-6 flex items-center gap-3 flex-wrap">
            <button type="button" className="btn btn-secondary" onClick={() => setConfirmOpen(true)}>
              Limpar checklist
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={copyMissingItems}
              disabled={totalChecked === totalItems}
            >
              {copied ? "Copiado!" : "Copiar itens que faltam"}
            </button>
            <span className="text-sm opacity-50">Seus dados ficam salvos apenas neste navegador.</span>
          </div>
        </main>
      </div>

      <Footer />

      <MobileFab onClick={() => setMobileOpen(true)} />

      {mobileOpen && (
        <MobileNavSheet
          navItems={navItems}
          activeSection={activeSection}
          onNavigate={(id) => {
            scrollToSection(id);
            setMobileOpen(false);
          }}
          onClose={() => setMobileOpen(false)}
        />
      )}

      {confirmOpen && <ConfirmClearDialog onCancel={() => setConfirmOpen(false)} onConfirm={clearAll} />}
    </div>
  );
}
