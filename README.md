# check-imovel

Checklist completo para 3 momentos do imóvel: compra (vistoria, documentação, custos, financiamento), manutenção ao longo do tempo e construção de casa (terreno, projeto, instalações e obra).

## Sumário

- [Instalação](#instalação)
- [Como executar](#como-executar)
- [Como adicionar novos itens/seções](#como-adicionar-novos-itensseções)

## Instalação

Pré-requisito: Node.js compatível com Next.js 16.

```bash
npm install
```

Não há variáveis de ambiente a configurar (nenhum `.env` é necessário).

## Como executar

```bash
# desenvolvimento (http://localhost:3000)
npm run dev

# build de produção
npm run build
npm run start

# lint
npm run lint
```

Depois de criar/remover/alterar arquivos, garanta que `npm run lint` e `npm run build` continuam passando.

## Como adicionar novos itens/seções

Toda a fonte de dados do checklist está em [`lib/checklist-data.ts`](./lib/checklist-data.ts), no array `sections`. Nenhum outro arquivo precisa ser alterado — navegação, abas por categoria, contadores de progresso e persistência em `localStorage` são derivados automaticamente desse array por `components/Checklist.tsx` e `app/page.tsx`.

Tipos usados:

```ts
export type Severity = "critico" | "importante" | "atencao";
export type Category = "compra" | "manutencao" | "construcao";

export interface ChecklistItemData {
  id: string;
  title: string;
  description?: string;
  severity?: Severity;
  group?: string;
}

export interface ChecklistSectionData {
  id: string;
  title: string;
  subtitle: string;
  appliesTo: "all" | "house" | "apartment";
  category: Category;
  items: ChecklistItemData[];
}
```

- **Adicionar um item a uma seção existente**: encontre a seção pelo `id`/`title` em `sections` e adicione um objeto a `items`.
- **Adicionar uma seção nova**: adicione um objeto ao array `sections` com um `category` (`"compra"`, `"manutencao"` ou `"construcao"`) e sua lista de `items`.

Pontos de atenção:

- O `id` de cada seção e de cada item precisa ser único no projeto — ele é usado como chave de estado (marcado/notas) no `localStorage`.
- `group` (opcional, em um item) cria um subtítulo dentro da seção: itens consecutivos com o mesmo valor de `group` ficam agrupados sob esse rótulo.
- `severity` (opcional) só afeta a exibição visual do item.
- `appliesTo` é informativo (reservado para uma futura filtragem por tipo de imóvel) e ainda não é usado para filtrar nada.

Caso à parte: as seções "Reforma — o que dá para mudar" e "Como classificar o que encontrar" não fazem parte do array `sections` — são fixas em `components/InfoSections.tsx` (ids `reforma`/`decisao`, definidas em `components/Checklist.tsx`) e só aparecem na categoria "compra".
