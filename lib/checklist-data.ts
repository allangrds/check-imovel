// Dados do checklist Check Imóvel — extraídos e adaptados do PDF-fonte do projeto.
// appliesTo: 'all' | 'house' | 'apartment' — informativo, útil para uma futura filtragem.

export type Severity = "critico" | "importante" | "atencao";

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
  items: ChecklistItemData[];
}

export const sections: ChecklistSectionData[] = [
  {
    id: "geral",
    title: "Geral",
    subtitle: "Vale para qualquer imóvel — casa ou apartamento.",
    appliesTo: "all",
    items: [
      { id: "g1", title: "Visitar em dias e horários diferentes", description: "Idealmente dia útil de manhã, fim de tarde/noite e, se possível, fim de semana. Uma rua tranquila às 14h pode virar corredor de ônibus às 18h." },
      { id: "g2", title: "Visitar depois de uma chuva forte", description: "Uma das melhores inspeções gratuitas: revela infiltrações, manchas, cheiro de umidade e problemas de drenagem.", severity: "importante" },
      { id: "g3", title: "Observar em quais cômodos entra sol e por quanto tempo", description: 'Não confiar apenas no que o corretor descreve como "sol da manhã/tarde" — o entorno construído pode bloquear a insolação.' },
      { id: "g4", title: "Verificar se existe ventilação cruzada", description: "Se todas as janelas forem viradas para o mesmo lado, não há ventilação cruzada." },
      { id: "g5", title: "Visitar à noite também", description: "É quando fica mais silencioso — dá para avaliar o isolamento acústico real do imóvel." },
      { id: "g6", title: "Ficar alguns minutos em silêncio absoluto e escutar", description: "Elevador, bombas, trânsito, vizinhos, cachorro, portão, bares, escola, igreja, oficina.", severity: "importante" },
      { id: "g7", title: "Testar o sinal de celular dentro do imóvel", description: "Principalmente em quartos e escritório — algumas operadoras somem dentro de certas construções." },
      { id: "g8", title: "Descobrir quais provedores de internet realmente atendem o endereço", description: '"Tem fibra no bairro" não significa que há porta disponível naquele prédio ou rua.' },
      { id: "g9", title: "Medir os ambientes de verdade", description: "Levar trena ou medidor a laser e simular cama, sofá, mesa, geladeira e abertura de portas — a planta humanizada engana." },
      { id: "g10", title: "Simular a rotina, não só a visita", description: "Onde guarda compras, seca roupa, guarda aspirador, joga lixo, trabalha, deixa sapatos, recebe entregas." },
      { id: "g11", title: "Pesquisar a rua, não apenas o imóvel", description: "Alagamento, segurança, ruído, trânsito, feira, bares, escolas, hospitais, estádios e obras previstas." },
      { id: "g12", title: "Conversar com porteiro, zelador ou moradores", description: '"Tem algum problema recorrente aqui?" costuma render informações que o anúncio não traz.', severity: "importante" },
      { id: "g13", title: "Contratar um despachante, se a imobiliária oferecer", description: "Facilita bastante a parte documental da compra." },
    ],
  },
  {
    id: "vistoria",
    title: "Vistoria",
    subtitle: "Um roteiro prático para seguir durante a visita.",
    appliesTo: "all",
    items: [
      { id: "v1", group: "Estrutura", title: "Procurar trincas diagonais nos cantos de portas e janelas", description: "Fissura fina pode ser só revestimento; trincas largas ou recorrentes merecem avaliação de engenheiro.", severity: "critico" },
      { id: "v2", group: "Estrutura", title: "Verificar pisos desnivelados, portas ou janelas desalinhadas", description: "Portas que fecham sozinhas ou não encaixam, janelas deformadas.", severity: "importante" },
      { id: "v3", group: "Estrutura", title: "Procurar manchas de infiltração, bolhas na pintura, rodapés estufados", description: "Rejunte escurecido e cheiro de mofo também são sinais." },
      { id: "v4", group: "Estrutura", title: "Checar se reformas anteriores removeram paredes", description: "Em caso de dúvida, pedir o projeto ou laudo estrutural.", severity: "importante" },
      { id: "v5", group: "Hidráulica", title: "Abrir todas as torneiras e testar chuveiros e descargas ao mesmo tempo", description: "Observar pressão, demora para escoar e ruídos na tubulação — pressão ruim em certos andares pode ser dor de cabeça.", severity: "importante" },
      { id: "v6", group: "Hidráulica", title: "Procurar vazamentos em sifões, registros e embaixo das pias", description: "" },
      { id: "v7", group: "Hidráulica", title: 'Verificar se o vaso sanitário fica "correndo" e se há retorno de água', description: "" },
      { id: "v8", group: "Hidráulica", title: "Procurar cheiro de esgoto nos ralos", description: "" },
      { id: "v9", group: "Elétrica", title: "Abrir o quadro elétrico e verificar circuitos, DR e aterramento", description: "Checar identificação dos disjuntores e o estado aparente da instalação.", severity: "importante" },
      { id: "v10", group: "Elétrica", title: "Confirmar bitola adequada para chuveiro/ar-condicionado e tensão disponível", description: "127V, 220V e carga disponibilizada para a unidade." },
      { id: "v11", group: "Elétrica", title: "Verificar se há circuitos independentes para equipamentos de grande potência", description: "" },
      { id: "v12", group: "Portas e janelas", title: "Testar abertura e fechamento de todas as portas e janelas", description: "Ver fechaduras, testar persianas, procurar frestas e sinais de infiltração nas esquadrias." },
      { id: "v13", group: "Portas e janelas", title: "Verificar vidros trincados e esquadrias desalinhadas", description: "" },
      { id: "v14", group: "Umidade e infiltração", title: "Olhar para cima em banheiro, cozinha, lavanderia e cantos de janela", description: "Pintura nova localizada pode ser manutenção — ou pode estar escondendo infiltração.", severity: "importante" },
      { id: "v15", group: "Umidade e infiltração", title: "Cheirar o imóvel", description: "Cheiro forte de tinta, aromatizador ou produto de limpeza pode mascarar mofo, esgoto ou cigarro." },
      { id: "v16", group: "Gás", title: "Verificar se há gás encanado ou GLP e o estado das conexões", description: "Localizar onde fica o registro de gás." },
      { id: "v17", group: "Gás", title: "Se houver aquecedor, checar instalação, ventilação/exaustão e manutenção", description: "Confirmar se ele atende, ao mesmo tempo, todos os pontos que pretende usar.", severity: "importante" },
      { id: "v18", group: "Pisos e acabamentos", title: "Procurar pisos ocos ou soltos e rejuntes comprometidos", description: "Verificar pedras de pia rachadas, bancadas e descolamento de revestimentos." },
      { id: "v19", group: "Sol, ventilação e conexões", title: "Ver em quais cômodos entra sol e por quanto tempo, de fato", description: "" },
      { id: "v20", group: "Sol, ventilação e conexões", title: "Pensar onde ficarão as condensadoras de ar-condicionado", description: "Regras de condomínio, distância entre evaporadora/condensadora ou falta de local técnico podem virar um pesadelo.", severity: "importante" },
    ],
  },
  {
    id: "apartamento",
    title: "Apartamento",
    subtitle: "Pontos específicos de unidades em condomínio.",
    appliesTo: "apartment",
    items: [
      { id: "a1", title: "Estudar a planta do bloco, não só da unidade", description: "Você terá vizinhos em cima e embaixo — vale saber o que ficará colado à parede do seu quarto." },
      { id: "a2", title: "Evitar unidades viradas para piscina, quadra ou área de lazer", description: "A menos que barulho e movimento não sejam um problema para você.", severity: "importante" },
      { id: "a3", title: "Considerar cheiro de fumaça/combustível em unidades sobre estacionamento", description: "Especialmente dormindo com janela aberta em andares baixos." },
      { id: "a4", title: "Descobrir onde ficam elevadores, casa de máquinas, bombas, gerador, lixeira e portões", description: "Unidades próximas podem ouvir funcionamento e conversas o dia todo.", severity: "importante" },
      { id: "a5", title: "Evitar o primeiro andar habitável sobre áreas comuns", description: "Academia, salão de festas, garagem e portaria embaixo podem ser piores que um vizinho residencial.", severity: "importante" },
      { id: "a6", title: "Investigar a impermeabilização da cobertura no último andar", description: "Você elimina o vizinho de cima, mas problemas de impermeabilização da laje aparecem justamente ali.", severity: "critico" },
      { id: "a7", title: "Verificar por onde passa a prumada hidráulica", description: "Tubulações e descargas de outras unidades podem gerar ruído durante a noite." },
      { id: "a8", title: "Checar o número de elevadores em relação ao número de unidades", description: "Poucos elevadores para um prédio grande complicam horários de pico e mudanças." },
      { id: "a9", title: "Entender se a água é individualizada ou coletiva", description: "Verificar reservatórios, histórico de falta e como é feita a cobrança." },
      { id: "a10", title: "Entender a vaga de garagem", description: "Determinada ou rotativa? Presa? Matrícula própria? Cabe carro grande? Depende do vizinho para sair?", severity: "importante" },
      { id: "a11", title: "Investigar a possibilidade de carregamento para carro elétrico", description: "Não presumir que basta instalar uma tomada na vaga." },
      { id: "a12", title: "Ler o memorial descritivo e o contrato antes de assinar", description: "É onde aparecem detalhes como gás para chuveiro (proíbe elétrico) ou instalação só para fogão.", severity: "importante" },
      { id: "a13", title: "Pedir e ler o regimento interno", description: "Se não concordar com alguma regra ali, reconsiderar a compra.", severity: "importante" },
      { id: "a14", title: "Pedir as atas das últimas assembleias — não só o regimento", description: "Revelam infiltrações recorrentes, brigas judiciais, inadimplência, obras caras previstas e reclamações.", severity: "critico" },
      { id: "a15", title: "Pedir informações financeiras do condomínio", description: "Fundo de reserva, inadimplência, obras aprovadas e chamadas extras previstas.", severity: "critico" },
      { id: "a16", title: "Perguntar sobre obras grandes já feitas e as próximas previstas", description: "Fachada, impermeabilização, telhado, elevadores, elétrica, hidráulica, caixa-d’água." },
      { id: "a17", title: "Desconfiar de condomínio barato demais", description: "Pode ser estrutura eficiente — ou manutenção postergada." },
      { id: "a18", title: "Confirmar regras de reforma antes de comprar", description: "Derrubar uma parede pode não ser possível por questões estruturais, hidráulicas ou de fachada.", severity: "importante" },
      { id: "a19", title: "Verificar o padrão da fachada antes de contar com mudanças", description: "Fechar varanda, instalar rede, envidraçar ou colocar condensadora depende das regras do prédio." },
    ],
  },
  {
    id: "casa",
    title: "Casa",
    subtitle: "Pontos específicos de imóveis com terreno próprio.",
    appliesTo: "house",
    items: [
      { id: "c1", title: "Descobrir para onde vai a água do terreno quando chove", description: "Água convergindo para a casa é um péssimo sinal.", severity: "critico" },
      { id: "c2", title: "Comparar o nível entre casa, quintal, calçada e rua", description: "Casa abaixo do nível da rua merece investigação cuidadosa sobre drenagem e histórico de alagamento.", severity: "importante" },
      { id: "c3", title: "Procurar fissuras e trincas", description: "Trincas diagonais, recorrentes, largas ou próximas a portas/janelas merecem avaliação profissional.", severity: "critico" },
      { id: "c4", title: "Observar muros de arrimo em terrenos inclinados", description: "Podem envolver estruturas caras e críticas que ninguém considera numa visita rápida.", severity: "importante" },
      { id: "c5", title: "Observar terrenos vizinhos mais altos", description: "A casa pode parecer seca no verão e receber água de terrenos vizinhos durante chuvas." },
      { id: "c6", title: "Checar telhado e calhas", description: "Telha quebrada, estrutura deteriorada, calha entupida ou rufos ruins são fontes clássicas de infiltração." },
      { id: "c7", title: "Procurar sinais de cupim", description: "Batentes, rodapés, telhado, armários embutidos e estruturas de madeira.", severity: "importante" },
      { id: "c8", title: "Observar umidade ascendente nas paredes perto do piso", description: "Pode indicar problema na impermeabilização da fundação/baldrame — não se resolve só pintando.", severity: "importante" },
      { id: "c9", title: "Descobrir para onde vai o esgoto", description: "Rede pública ou fossa? Em imóveis antigos isso é especialmente importante." },
      { id: "c10", title: "Verificar estado e capacidade da caixa-d’água", description: "Acesso para limpeza e existência de vazamentos." },
      { id: "c11", title: "Descobrir a idade aproximada das instalações hidráulicas", description: "Tubulações antigas podem significar reforma bastante invasiva." },
      { id: "c12", title: "Avaliar árvores grandes perto da casa", description: "Ótimas para conforto térmico, mas raízes, folhas nas calhas e risco de queda entram na conta." },
      { id: "c13", title: "Considerar construções futuras dos vizinhos", description: "Uma janela ótima hoje pode perder iluminação com uma construção vizinha de vários pavimentos." },
      { id: "c14", title: "Pesquisar o zoneamento da região", description: "Aquela casinha tranquila ao lado pode legalmente virar prédio ou comércio no futuro.", severity: "importante" },
      { id: "c15", title: 'Avaliar a segurança além do "bairro"', description: "Muros escaláveis, terrenos baldios, vielas, iluminação pública, acesso lateral e pontos cegos." },
      { id: "c16", title: "Em sobrado, avaliar as escadas pensando em 10–20 anos", description: "Idosos, crianças e lesões podem transformar uma planta boa hoje em problema depois." },
      { id: "c17", title: "Confirmar os limites reais do terreno", description: "Muro existente não é garantia de que esteja exatamente sobre a divisa jurídica.", severity: "importante" },
    ],
  },
  {
    id: "manutencao",
    title: "Manutenção",
    subtitle: "O que planejar e orçar ao longo do tempo.",
    appliesTo: "all",
    items: [
      { id: "m1", group: "Curto prazo — primeiros 12 meses", title: "Trocar fechaduras e revisar chaves de todas as portas", description: "" },
      { id: "m2", group: "Curto prazo — primeiros 12 meses", title: "Fazer revisão elétrica e hidráulica completa", description: "Provavelmente o período em que você mais vai gastar.", severity: "importante" },
      { id: "m3", group: "Curto prazo — primeiros 12 meses", title: "Limpar/revisar caixa-d’água, ar-condicionado e aquecedor a gás", description: "" },
      { id: "m4", group: "Curto prazo — primeiros 12 meses", title: "Contratar dedetização e limpar calhas (em casas)", description: "" },
      { id: "m5", group: "Curto prazo — primeiros 12 meses", title: "Corrigir infiltrações, rejuntes e silicones identificados na vistoria", description: "" },
      { id: "m6", group: "Curto prazo — primeiros 12 meses", title: "Fazer reparos e limpeza profunda antes da mudança", description: "Torneiras/registros problemáticos, tomadas, revisão do telhado." },
      { id: "m7", group: "Médio prazo — 1 a 5 anos", title: "Repintar ambientes internos e, em casas, a fachada externa", description: "" },
      { id: "m8", group: "Médio prazo — 1 a 5 anos", title: "Revisar esquadrias, impermeabilização pontual e vedantes/rejuntes", description: "" },
      { id: "m9", group: "Médio prazo — 1 a 5 anos", title: "Revisar telhado, calhas e instalações hidráulicas", description: "" },
      { id: "m10", group: "Médio prazo — 1 a 5 anos", title: "Fazer manutenção preventiva de ar-condicionado e aquecedor", description: "No apartamento, parte disso é do condomínio — mas paga-se coletivamente. As atas das assembleias importam." },
      { id: "m11", group: "Médio prazo — 1 a 5 anos", title: "Tratar madeira contra cupim quando necessário", description: "" },
      { id: "m12", group: "Longo prazo — 5 a 15+ anos", title: "Planejar impermeabilização geral, troca de telhado e esquadrias", description: "", severity: "importante" },
      { id: "m13", group: "Longo prazo — 5 a 15+ anos", title: "Reservar orçamento para reforma de banheiro e cozinha", description: "" },
      { id: "m14", group: "Longo prazo — 5 a 15+ anos", title: "Planejar reforma hidráulica e modernização elétrica completas", description: "" },
      { id: "m15", group: "Longo prazo — 5 a 15+ anos", title: "Prever troca de pisos, correção de fachada e troca de equipamentos antigos", description: "" },
      { id: "m16", group: "Longo prazo — 5 a 15+ anos", title: "Em condomínio: acompanhar modernização de elevadores e impermeabilização da cobertura", description: "Também garagem, bombas, prumadas, reservatórios, portões e sistemas de segurança." },
    ],
  },
  {
    id: "custos-compra",
    title: "Custos da compra",
    subtitle: "O preço anunciado não é o custo total.",
    appliesTo: "all",
    items: [
      { id: "cc1", title: "Verificar se o orçamento inclui o ITBI", description: "Além do valor de entrada e do financiamento.", severity: "critico" },
      { id: "cc2", title: "Verificar a necessidade de escritura pública", description: "O instrumento do financiamento pode ter efeito equivalente em algumas operações — não somar automaticamente." },
      { id: "cc3", title: "Orçar registro imobiliário e certidões/documentação", description: "" },
      { id: "cc4", title: "Orçar avaliação bancária e tarifas do financiamento", description: "" },
      { id: "cc5", title: "Considerar despachante, mudança e reparos/reformas iniciais", description: "" },
      { id: "cc6", title: "Considerar móveis e eletrodomésticos no orçamento total", description: "" },
      { id: "cc7", title: "Confirmar a alíquota vigente do ITBI direto na Prefeitura", description: "Especialmente relevante para operações em São Paulo — a regra vale no momento da compra." },
    ],
  },
  {
    id: "custos-recorrentes",
    title: "Custos recorrentes",
    subtitle: "O que continua existindo depois da compra.",
    appliesTo: "all",
    items: [
      { id: "cr1", title: "Somar o custo mensal real do apartamento", description: "Financiamento + condomínio + IPTU + seguro + água + energia + gás + manutenção + eventuais rateios." },
      { id: "cr2", title: "Somar o custo mensal real da casa", description: "Financiamento + IPTU + seguro + água + energia + gás + manutenção + segurança + manutenção externa." },
      { id: "cr3", title: 'Lembrar que, na casa, você é o "condomínio"', description: "Portão, telhado, fachada, bomba e jardim ficam inteiramente por sua conta." },
      { id: "cr4", title: "Pedir o boleto real do condomínio e do IPTU", description: "Não aceitar apenas um valor estimado de boca.", severity: "importante" },
      { id: "cr5", title: "Verificar o que está incluído no condomínio", description: "R$ 700 com água e gás incluídos pode ser melhor que R$ 500 sem nada." },
      { id: "cr6", title: "Checar fundo de reserva, rateios extraordinários e inadimplência", description: "Também obras aprovadas e processos judiciais relevantes.", severity: "critico" },
      { id: "cr7", title: "Confirmar a situação de débitos do imóvel", description: "Antes de fechar negócio.", severity: "critico" },
    ],
  },
  {
    id: "financiamento",
    title: "Financiamento",
    subtitle: "Olhar além do valor da parcela.",
    appliesTo: "all",
    items: [
      { id: "f1", title: "Comparar a taxa de juros e o CET (Custo Efetivo Total)", description: "Duas propostas com parcelas parecidas podem ter custos totais bem diferentes.", severity: "importante" },
      { id: "f2", title: "Comparar sistema de amortização, prazo e seguros embutidos", description: "" },
      { id: "f3", title: "Verificar indexador, quando houver, e condições de amortização antecipada", description: "" },
      { id: "f4", title: "Não usar o limite máximo aprovado pelo banco como orçamento saudável", description: "O banco calcula capacidade de crédito — não sabe quanto você quer gastar com o resto da vida.", severity: "critico" },
      { id: "f5", title: "Montar uma reserva financeira específica para manutenção do imóvel", description: "Além da reserva de emergência pessoal. Em casa, essa reserva é ainda mais importante.", severity: "importante" },
    ],
  },
];
