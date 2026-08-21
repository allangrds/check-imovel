export function InfoSections() {
  return (
    <>
      <section
        id="reforma"
        data-screen-label="Reforma"
        className="py-6 border-b"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <h2 className="text-2xl mb-1">Reforma — o que dá para mudar</h2>
        <p className="mb-4 text-sm opacity-65 max-w-[58ch]">
          Ajuda a distinguir &quot;esse imóvel está feio&quot; de &quot;esse imóvel tem características que nenhuma reforma simples resolve&quot;.
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
          <div className="card">
            <div className="card-kicker">Fácil e barato</div>
            <div className="card-title">Cosmético</div>
            <p className="card-body">Pintura, luminárias, interruptores, torneiras, decoração, alguns revestimentos, móveis, portas internas.</p>
          </div>
          <div className="card">
            <div className="card-kicker">Possível, mas caro</div>
            <div className="card-title">Obra relevante</div>
            <p className="card-body">Piso inteiro, cozinha, banheiro, marcenaria, elétrica, hidráulica, ar-condicionado, esquadrias, impermeabilização, aquecimento.</p>
          </div>
          <div className="card">
            <div className="card-kicker">Difícil ou impossível</div>
            <div className="card-title">Intrínseco ao imóvel</div>
            <p className="card-body">Localização, orientação solar, andar, vista, barulho externo, vizinhos, pé-direito, estrutura, ventilação, tamanho real, vaga.</p>
          </div>
        </div>
      </section>

      <section
        id="decisao"
        data-screen-label="Como decidir"
        className="py-6 border-b"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <h2 className="text-2xl mb-1">Como classificar o que encontrar</h2>
        <p className="mb-4 text-sm opacity-65 max-w-[58ch]">Na vistoria, classifique cada problema encontrado antes de decidir.</p>
        <div className="grid gap-2">
          <div className="flex gap-3 py-2 border-b" style={{ borderColor: "var(--color-divider)" }}>
            <span className="tag tag-neutral flex-none">1. Cosmético</span>
            <span className="text-sm opacity-75">Dá para ignorar ou negociar.</span>
          </div>
          <div className="flex gap-3 py-2 border-b" style={{ borderColor: "var(--color-divider)" }}>
            <span className="tag tag-outline flex-none">2. Manutenção</span>
            <span className="text-sm opacity-75">Descubra o custo e desconte mentalmente do valor do imóvel.</span>
          </div>
          <div className="flex gap-3 py-2 border-b" style={{ borderColor: "var(--color-divider)" }}>
            <span className="tag tag-accent flex-none">3. Reforma grande</span>
            <span className="text-sm opacity-75">Faça orçamento antes de comprar.</span>
          </div>
          <div className="flex gap-3 py-2">
            <span className="tag tag-accent flex-none" style={{ background: "var(--color-accent-800)", color: "var(--color-neutral-100)" }}>
              4. Estrutural / documental
            </span>
            <span className="text-sm opacity-75">Pode ser motivo para desistir da compra.</span>
          </div>
        </div>
        <p className="mt-4 text-sm italic opacity-70 max-w-[58ch]">
          Uma parede feia de R$ 2 mil pode fazer um imóvel excelente parecer ruim — e uma pintura linda de R$ 2 mil pode esconder R$ 80 mil em problemas.
        </p>
      </section>
    </>
  );
}
