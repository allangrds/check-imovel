"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChecklistSectionData } from "@/lib/checklist-data";
import { Header } from "./Header";
import { Sidebar, type NavItem } from "./Sidebar";
import { MobileFab, MobileNavSheet } from "./MobileNav";
import { Section } from "./Section";
import { InfoSections } from "./InfoSections";
import { ConfirmClearDialog } from "./ConfirmClearDialog";

const STORAGE_KEY = "checkimovel:v1";

const INFO_SECTIONS = [
  { id: "reforma", title: "Reforma" },
  { id: "decisao", title: "Como decidir" },
];

export function Checklist({ sections }: { sections: ChecklistSectionData[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteOpenMap, setNoteOpenMap] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "geral");
  const scrollScheduled = useRef(false);

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

  const allIds = useMemo(() => sections.map((s) => s.id).concat(["reforma", "decisao"]), [sections]);

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

  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setChecked({});
    setNotes({});
    setConfirmOpen(false);
  }, []);

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const totalChecked = sections.reduce((sum, s) => sum + s.items.filter((i) => checked[i.id]).length, 0);

  const navItems: NavItem[] = sections
    .map((s) => {
      const sectionChecked = s.items.filter((i) => checked[i.id]).length;
      return { id: s.id, title: s.title, showCount: true, countLabel: `${sectionChecked}/${s.items.length}` };
    })
    .concat(INFO_SECTIONS.map((s) => ({ id: s.id, title: s.title, showCount: false, countLabel: "" })));

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      <Header totalChecked={totalChecked} totalItems={totalItems} />

      <div className="max-w-[1120px] mx-auto px-4 flex gap-6 items-start">
        <Sidebar navItems={navItems} activeSection={activeSection} onNavigate={scrollToSection} />

        <main className="flex-1 min-w-0 max-w-[700px] py-6 pb-8">
          <p className="text-sm opacity-75 mb-6 max-w-[60ch]">
            Reúne, em ordem prática, os pontos que costumam fazer diferença na compra de uma casa ou apartamento — vistoria, documentação, custos e manutenção. Marque o que já verificou; o progresso fica salvo neste navegador.
          </p>

          {sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              checked={checked}
              onToggleItem={toggleItem}
              noteOpen={!!noteOpenMap[section.id]}
              noteValue={notes[section.id] || ""}
              onToggleNote={() => toggleNoteOpen(section.id)}
              onNoteChange={(value) => updateNote(section.id, value)}
            />
          ))}

          <InfoSections />

          <div className="pt-6 flex items-center gap-3 flex-wrap">
            <button type="button" className="btn btn-secondary" onClick={() => setConfirmOpen(true)}>
              Limpar checklist
            </button>
            <span className="text-sm opacity-50">Seus dados ficam salvos apenas neste navegador.</span>
          </div>
        </main>
      </div>

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
