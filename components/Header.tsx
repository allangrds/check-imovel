"use client";

export function Header({ totalChecked, totalItems }: { totalChecked: number; totalItems: number }) {
  const percent = totalItems ? Math.round((totalChecked / totalItems) * 100) : 0;

  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)" }}
    >
      <div className="max-w-[1120px] mx-auto px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h1 className="text-lg m-0">Check Imóvel</h1>
            <p className="mt-[2px] mb-0 text-sm opacity-60">Checklist para comprar, manter e construir seu imóvel.</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between items-baseline text-sm opacity-70 [font-variant-numeric:tabular-nums]">
            <span>
              {totalChecked} de {totalItems} itens verificados
            </span>
            <span>{percent}% concluído</span>
          </div>
          <div
            className="h-1 rounded-full mt-1 overflow-hidden"
            style={{ background: "var(--color-neutral-200)" }}
          >
            <div
              className="h-full transition-[width] duration-200 ease-out"
              style={{ background: "var(--color-accent-500)", width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
