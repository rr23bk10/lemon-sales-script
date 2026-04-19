export interface Message {
  id: string;
  role: "client" | "seller";
  text: string;
  notes?: string;
  alternatives?: string[];
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  messages: Message[];
}

export interface SalesScript {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: string;
  stages: Stage[];
}

export const salesScripts: SalesScript[] = [
  {
    id: "website",
    name: "Website",
    icon: "🌐",
    description: "Roteiro para vender Website Start, Pro ou Scale",
    price: "R$ 100 - R$ 300",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens para estabelecer rapport",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Tudo bem? Sou [Seu Nome] da Lemon CP. Vi que você está no ramo de [segmento/negócio]. Gostaria de conversar rapidinho sobre como a gente pode ajudar seu negócio a crescer online? 🚀",
            notes: "Personalize com o segmento do cliente",
            alternatives: [
              "Oi! Tudo certo? Sou [Seu Nome] da Lemon CP. Você tem um site profissional agora?",
              "Olá! Tudo bem? Sou [Seu Nome]. Você já pensou em ter uma presença digital forte?",
            ],
          },
          {
            id: "g2",
            role: "client",
            text: "Oi! Tudo certo. Mas não tenho muito tempo agora...",
            notes: "Resposta comum",
          },
          {
            id: "g3",
            role: "seller",
            text: "Sem problema! Vou ser rápido. 😊 Você tem 2 minutos? Só quero entender melhor seu negócio.",
            notes: "Respeite o tempo do cliente",
          },
        ],
      },
      {
        id: "qualification",
        title: "🔍 Qualificação & Descoberta",
        description: "Entender as necessidades do cliente",
        messages: [
          {
            id: "q1",
            role: "seller",
            text: "Perfeito! 1️⃣ Qual é seu principal desafio agora? (vendas, presença online, organização...)",
            notes: "Faça perguntas abertas",
            alternatives: [
              "Qual é o seu maior problema com vendas online?",
              "O que te impede de vender mais pela internet?",
            ],
          },
          {
            id: "q2",
            role: "client",
            text: "A gente tá com dificuldade em gerar leads e vender online...",
            notes: "Cliente identifica o problema",
          },
          {
            id: "q3",
            role: "seller",
            text: "Entendi! 2️⃣ Você já tem um site? 3️⃣ Quanto você investe mensalmente em marketing?",
            notes: "Continue qualificando",
            alternatives: [
              "Você já tem presença digital? Como está seu site agora?",
              "Qual é seu orçamento aproximado para resolver isso?",
            ],
          },
          {
            id: "q4",
            role: "client",
            text: "Não, ainda não temos site. Investimos pouco em marketing...",
            notes: "Cliente tem baixa maturidade digital",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação de Solução",
        description: "Apresentar a solução ideal",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Perfeito! Com base no que você me contou, temos a solução ideal! 🎯\n\n📊 Website Pro (R$ 300):\n✅ Até 3 páginas\n✅ Design profissional\n✅ Foco em vendas\n✅ Até 2 revisões\n\nIsso vai dar a você uma presença digital profissional que gera leads! 🚀",
            notes: "Apresente com economia clara",
            alternatives: [
              "Recomendo nosso Website Pro. É perfeito para quem quer começar a vender online.",
              "Temos 3 opções: Start (R$ 100), Pro (R$ 300) ou Scale (R$ 1.500). Qual se encaixa melhor?",
            ],
          },
          {
            id: "p2",
            role: "client",
            text: "Parece interessante, mas qual é a diferença entre Website Start e Pro?",
            notes: "Cliente quer comparar",
          },
          {
            id: "p3",
            role: "seller",
            text: "Ótima pergunta! 👍\n\n📊 Website Start (R$ 100):\n• 1 página (Landing Page)\n• Design básico\n• Responsivo\n\n📊 Website Pro (R$ 300):\n• Até 3 páginas\n• Design profissional\n• Foco em conversão\n\nO Pro é ideal se você quer vender online.",
            notes: "Compare lado a lado",
          },
        ],
      },
      {
        id: "objections",
        title: "🛡️ Tratamento de Objeções",
        description: "Responder às objeções comuns",
        messages: [
          {
            id: "o1",
            role: "client",
            text: "Entendi, mas R$ 300 é caro pra gente agora...",
            notes: "Objeção de preço",
          },
          {
            id: "o2",
            role: "seller",
            text: "Entendo perfeitamente! 💭 Mas deixa eu colocar assim: quanto você tá perdendo por mês por não ter um site? Se você conseguir 3-5 clientes a mais por mês, o investimento se paga em uma semana! 📈\n\nAlém disso, oferecemos parcelamento em 2x sem juros.",
            notes: "Reframe como investimento",
            alternatives: [
              "Qual é o ticket médio do seu cliente? Se vender só 1 cliente a mais, já se paga!",
              "Você prefere pagar R$ 300 agora ou perder R$ 1.000 em vendas por mês?",
            ],
          },
          {
            id: "o3",
            role: "client",
            text: "Tá bom, mas como funciona? Quanto tempo leva?",
            notes: "Objeção de processo",
          },
          {
            id: "o4",
            role: "seller",
            text: "Ótimo! 🚀 O processo é bem simples:\n\n1️⃣ Você nos passa as informações\n2️⃣ A gente cria o site (5-7 dias úteis)\n3️⃣ Você revisa e aprova\n4️⃣ Site ao vivo! 🎉",
            notes: "Explique o processo",
          },
        ],
      },
      {
        id: "closing",
        title: "🎯 Fechamento",
        description: "Consolidar a venda",
        messages: [
          {
            id: "c1",
            role: "seller",
            text: "Ótimo! 🎉 Então vamos começar?\n\nPreciso que você confirme:\n1️⃣ Website Pro - R$ 300\n2️⃣ Seus dados (nome, email, telefone)\n3️⃣ Forma de pagamento (PIX, cartão ou boleto)\n\nDepois disso, a gente já começa! 🚀",
            notes: "Seja claro sobre próximos passos",
          },
          {
            id: "c2",
            role: "seller",
            text: "Perfeito! 🙌 Muito obrigado por confiar na Lemon CP!\n\n📋 Resumo:\n✅ Website Pro - R$ 300\n💰 Total: R$ 300\n\nVou enviar um link de pagamento. Depois que confirmar, a gente já começa!",
            notes: "Confirme o pedido",
          },
        ],
      },
    ],
  },
  {
    id: "apps",
    name: "Mobile Apps",
    icon: "📱",
    description: "Roteiro para vender App Start, Pro ou Scale",
    price: "R$ 1.500 - R$ 25.000",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi que você está no ramo de [segmento]. Você já pensou em ter um app mobile para seu negócio? 📱",
            notes: "Direto ao ponto com apps",
            alternatives: [
              "Olá! Você tem um app para sua empresa?",
              "Oi! Sou especialista em desenvolvimento de apps. Posso ajudar?",
            ],
          },
        ],
      },
      {
        id: "qualification",
        title: "🔍 Qualificação",
        description: "Entender necessidades",
        messages: [
          {
            id: "q1",
            role: "seller",
            text: "1️⃣ Qual é sua ideia de app? 2️⃣ Qual é seu orçamento? 3️⃣ Qual é o prazo?",
            notes: "Qualifique rapidamente",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Apresentar soluções",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 opções:\n\n📱 App Start (R$ 1.500):\n• App simples e funcional\n• 1 plataforma (iOS ou Android)\n\n📱 App Pro (R$ 5.000):\n• App completo\n• iOS + Android\n• Design profissional\n\n📱 App Scale (R$ 25.000):\n• App enterprise\n• Todas as features\n• Suporte completo",
            notes: "Apresente as 3 opções",
          },
        ],
      },
      {
        id: "closing",
        title: "🎯 Fechamento",
        description: "Consolidar venda",
        messages: [
          {
            id: "c1",
            role: "seller",
            text: "Qual opção faz mais sentido para você?",
            notes: "Deixe o cliente escolher",
          },
        ],
      },
    ],
  },
  {
    id: "consultoria",
    name: "Consultoria",
    icon: "💼",
    description: "Roteiro para vender Consultoria MKT, Dev ou Organizacional",
    price: "R$ 50 - R$ 250/hora",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Sou especialista em [MKT/Dev/Organização]. Você tem alguma dúvida ou desafio que eu possa ajudar? 💡",
            notes: "Posicione-se como especialista",
            alternatives: [
              "Olá! Posso oferecer uma consultoria rápida para seu negócio?",
              "Oi! Gostaria de conversar sobre seus desafios de crescimento?",
            ],
          },
        ],
      },
      {
        id: "qualification",
        title: "🔍 Qualificação",
        description: "Entender desafios",
        messages: [
          {
            id: "q1",
            role: "seller",
            text: "Qual é seu maior desafio agora? Quanto tempo você tem disponível para uma consultoria?",
            notes: "Entenda o problema e disponibilidade",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer consultoria",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Posso oferecer uma consultoria de [1-2 horas] para ajudar você. Custa R$ 50-250/hora dependendo da complexidade.\n\nVou analisar sua situação e dar um plano de ação claro. Topa?",
            notes: "Ofereça consultoria inicial",
          },
        ],
      },
      {
        id: "closing",
        title: "🎯 Fechamento",
        description: "Agendar consultoria",
        messages: [
          {
            id: "c1",
            role: "seller",
            text: "Ótimo! Qual dia e hora funcionam melhor para você? Vou enviar um link para agendar.",
            notes: "Agende a consultoria",
          },
        ],
      },
    ],
  },
  {
    id: "redes-sociais",
    name: "Redes Sociais",
    icon: "📱",
    description: "Roteiro para vender Gestão de Redes, Reels ou Assessoria",
    price: "R$ 150 - R$ 600/mês",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi seu perfil no Instagram. Você já pensou em crescer sua presença nas redes sociais? 📈",
            notes: "Personalize com o perfil que viu",
            alternatives: [
              "Olá! Posso ajudar você a crescer no Instagram e TikTok!",
              "Oi! Você quer mais seguidores e engajamento?",
            ],
          },
        ],
      },
      {
        id: "qualification",
        title: "🔍 Qualificação",
        description: "Entender objetivos",
        messages: [
          {
            id: "q1",
            role: "seller",
            text: "1️⃣ Qual é seu objetivo? (mais seguidores, vendas, brand awareness?) 2️⃣ Quanto você investe agora em redes?",
            notes: "Entenda os objetivos",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer serviços",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 planos:\n\n📊 Start (R$ 150-300/mês):\n• 8 posts/mês\n• Artes simples\n\n📊 Pro (R$ 300-600/mês):\n• 12-16 posts/mês\n• 2-4 Reels\n• Estratégia\n\n📊 Scale (R$ 600-1.2k/mês):\n• 20+ posts/mês\n• Reels frequentes\n• Análise completa",
            notes: "Apresente os 3 planos",
          },
        ],
      },
      {
        id: "closing",
        title: "🎯 Fechamento",
        description: "Consolidar venda",
        messages: [
          {
            id: "c1",
            role: "seller",
            text: "Qual plano faz mais sentido para você?",
            notes: "Deixe o cliente escolher",
          },
        ],
      },
    ],
  },
];
