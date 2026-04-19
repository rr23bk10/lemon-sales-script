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
    description: "Roteiro para vender Website Start ou Pro",
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
          },
          {
            id: "q2",
            role: "seller",
            text: "2️⃣ Você já tem um site? 3️⃣ Qual é seu orçamento aproximado?",
            notes: "Continue qualificando",
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
            text: "Perfeito! Com base no que você me contou, temos a solução ideal! 🎯\n\n📊 Website Start (R$ 100):\n✅ 1 página (Landing Page)\n✅ Integração com WhatsApp\n✅ Responsivo\n\n📊 Website Pro (R$ 300):\n✅ Até 3 páginas\n✅ Design profissional\n✅ Foco em vendas\n✅ Até 2 revisões",
            notes: "Apresente as opções com economia clara",
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
            text: "Ótimo! 🎉 Então vamos começar? Preciso que você confirme: 1️⃣ Qual opção (Start ou Pro)? 2️⃣ Seus dados (nome, email, telefone) 3️⃣ Forma de pagamento",
            notes: "Seja claro sobre próximos passos",
          },
        ],
      },
    ],
  },
  {
    id: "banners",
    name: "Banners",
    icon: "🎨",
    description: "Roteiro para vender Banner Start, Pro ou Scale",
    price: "R$ 10 - R$ 150",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi que você está com uma promoção. Quer um banner profissional para redes sociais? 🎨",
            notes: "Direto ao ponto com banners",
            alternatives: [
              "Olá! Posso criar um banner incrível para sua promoção!",
              "Oi! Você precisa de artes para suas redes?",
            ],
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer banners",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 opções:\n\n🎨 Banner Start (R$ 10):\n• Arte simples e rápida\n• Ideal para promoções\n• 1 revisão inclusa\n\n🎨 Banner Pro (R$ 50):\n• Design profissional\n• Foco em redes sociais\n• Até 2 revisões\n\n🎨 Banner Scale (R$ 150):\n• Design estratégico\n• Foco em conversão\n• Identidade aplicada\n• Até 3 revisões",
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
    id: "sistemas-web",
    name: "Sistemas Web",
    icon: "⚙️",
    description: "Roteiro para vender Sistema Web Start, Pro ou Scale",
    price: "R$ 500 - R$ 2.500",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi que você precisa organizar melhor seus processos. Temos sistemas web customizados! 💻",
            notes: "Posicione como solução de organização",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer sistemas",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 níveis:\n\n⚙️ Sistema Start (R$ 500):\n• Formulários e integração básica\n\n⚙️ Sistema Pro (R$ 1.000):\n• Painel ADM simples\n• Gestão de dados\n\n⚙️ Sistema Scale (R$ 2.500):\n• Sistema completo e escalável\n• Todas as features",
            notes: "Apresente conforme complexidade",
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
            text: "Qual nível atende melhor sua necessidade?",
            notes: "Deixe o cliente escolher",
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
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer apps",
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
    description: "Roteiro para vender Consultoria MKT, Dev, Organizacional ou Inovação",
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
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Sou especialista em [MKT/Dev/Organização/Inovação]. Você tem alguma dúvida ou desafio que eu possa ajudar? 💡",
            notes: "Posicione-se como especialista",
            alternatives: [
              "Olá! Posso oferecer uma consultoria rápida para seu negócio?",
              "Oi! Gostaria de conversar sobre seus desafios de crescimento?",
            ],
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
            text: "Oferecemos consultoria em 4 áreas:\n\n💼 Consultoria MKT (R$ 50/hora):\n• Estratégias de MKT\n• Posicionamento\n• Análise de perfil\n\n💼 Consultoria Dev (R$ 150/hora):\n• Arquitetura e APIs\n• Planejamento Tech\n• Code Review\n\n💼 Consultoria Organizacional (R$ 150/hora):\n• Processos e Gestão\n• Eficiência Operacional\n\n💼 Inovação & Pesquisa (R$ 250/hora):\n• Novas Tecnologias\n• R&D (P&D)\n• Tendências",
            notes: "Apresente conforme a necessidade",
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
            text: "Qual área você gostaria de explorar? Posso agendar uma sessão inicial!",
            notes: "Agende a consultoria",
          },
        ],
      },
    ],
  },
  {
    id: "reels",
    name: "Reels & Vídeos",
    icon: "🎬",
    description: "Roteiro para vender Reels Start, Pro ou Scale",
    price: "R$ 50 - R$ 750",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi seu perfil no Instagram. Você quer criar Reels profissionais para crescer? 🎬",
            notes: "Personalize com o perfil",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer reels",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 pacotes de edição de vídeo:\n\n🎬 Reels Start (R$ 50):\n• 1 Reel editado\n• Qualidade básica\n\n🎬 Reels Pro (R$ 250):\n• 3-5 Reels editados\n• Qualidade profissional\n• Efeitos e transições\n\n🎬 Reels Scale (R$ 750):\n• 10+ Reels editados\n• Qualidade premium\n• Estratégia de conteúdo",
            notes: "Apresente os pacotes",
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
            text: "Qual pacote faz mais sentido para você?",
            notes: "Deixe o cliente escolher",
          },
        ],
      },
    ],
  },
  {
    id: "automacao-chat",
    name: "Automação Chat",
    icon: "🤖",
    description: "Roteiro para vender Automação de WhatsApp",
    price: "R$ 500",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você perde muitos clientes por não responder rápido no WhatsApp? Temos a solução! 🤖",
            notes: "Identifique o problema",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer automação",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Nossa Automação de Chat (R$ 500) oferece:\n\n🤖 Fluxo WhatsApp automático\n🤖 Respostas inteligentes 24/7\n🤖 Qualificação de leads\n🤖 Redirecionamento para vendedor\n\nIsso vai aumentar suas vendas em até 40%! 📈",
            notes: "Destaque os benefícios",
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
            text: "Quer começar a automatizar seu WhatsApp?",
            notes: "Confirme a venda",
          },
        ],
      },
    ],
  },
  {
    id: "assessoria-social",
    name: "Assessoria Social",
    icon: "📊",
    description: "Roteiro para vender Assessoria de Redes Sociais",
    price: "R$ 50/hora",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Vi seu perfil no Instagram. Você gostaria de estratégia profissional para crescer nas redes? 📊",
            notes: "Personalize com análise do perfil",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer assessoria",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Nossa Assessoria Social (R$ 50/hora) inclui:\n\n📊 Estratégia de conteúdo\n📊 Análise de público\n📊 Planejamento de crescimento\n📊 Dicas de engajamento\n\nVamos transformar seu perfil em uma máquina de vendas! 🚀",
            notes: "Destaque os benefícios",
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
            text: "Qual dia você quer que a gente comece?",
            notes: "Agende a sessão",
          },
        ],
      },
    ],
  },
  {
    id: "gestao-redes",
    name: "Gestão de Redes",
    icon: "📱",
    description: "Roteiro para vender Gestão Start, Pro ou Scale",
    price: "R$ 150 - R$ 1.200/mês",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você tem tempo para gerenciar suas redes sociais todos os dias? 📱",
            notes: "Identifique a dor",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer gestão",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 planos de Gestão de Redes:\n\n📱 Start (R$ 150-300/mês):\n• 8 posts/mês\n• Artes simples\n• Legendas básicas\n\n📱 Pro (R$ 300-600/mês):\n• 12-16 posts/mês\n• Artes + Estratégia\n• 2-4 Reels simples\n\n📱 Scale (R$ 600-1.2k/mês):\n• 20+ posts/mês\n• Reels frequentes\n• Planejamento e Análise",
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
  {
    id: "programacao",
    name: "Programação",
    icon: "💻",
    description: "Roteiro para vender Suporte Técnico e Programação",
    price: "R$ 150/hora",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você tem bugs ou precisa de suporte técnico no seu sistema? 💻",
            notes: "Identifique o problema técnico",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer programação",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Oferecemos Programação (R$ 150/hora) com:\n\n💻 Manutenção de sistemas\n💻 Correção de bugs\n💻 Suporte técnico especializado\n💻 Otimização de performance\n\nTemos um time de especialistas pronto para ajudar! 🚀",
            notes: "Destaque a expertise",
          },
        ],
      },
      {
        id: "closing",
        title: "🎯 Fechamento",
        description: "Agendar suporte",
        messages: [
          {
            id: "c1",
            role: "seller",
            text: "Qual é o problema que você está enfrentando? Vamos resolver!",
            notes: "Entenda o problema específico",
          },
        ],
      },
    ],
  },
  {
    id: "assistente",
    name: "Assistente",
    icon: "🎯",
    description: "Roteiro para vender Assistente Starter, Growth ou Pro",
    price: "R$ 1.200 - R$ 4.000+/mês",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você gostaria de ter um assistente dedicado para organizar seu negócio? 🎯",
            notes: "Posicione como solução de organização",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer assistente",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos 3 planos de Assistente:\n\n🎯 Starter (R$ 1.200/mês):\n• Organização de tarefas\n• Planejamento semanal\n• Uso básico\n\n🎯 Growth (R$ 2.500/mês):\n• Execução de projetos\n• Criação com IA\n• Acompanhamento e Priorização\n\n🎯 Pro (R$ 4.000+/mês):\n• Automações completas\n• Estrutura de projetos\n• Operação do negócio",
            notes: "Apresente conforme necessidade",
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
            text: "Qual plano atende melhor sua necessidade?",
            notes: "Deixe o cliente escolher",
          },
        ],
      },
    ],
  },
  {
    id: "combo-presenca",
    name: "Combo: Presença Digital",
    icon: "🌐",
    description: "Website Start + 5 Banners Profissionais",
    price: "R$ 197 (Economiza R$ 53)",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você quer começar sua presença digital com tudo pronto? 🌐",
            notes: "Ofereça o combo",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer combo",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos um combo especial: Presença Digital (R$ 197)\n\n✅ Website Start (R$ 100)\n✅ 5 Banners Profissionais (R$ 100)\n\n💰 Economiza R$ 53!\n\nIdeal para começar online! 🚀",
            notes: "Destaque a economia",
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
            text: "Quer começar sua presença digital agora?",
            notes: "Confirme a venda",
          },
        ],
      },
    ],
  },
  {
    id: "combo-negocio",
    name: "Combo: Negócio Online",
    icon: "💼",
    description: "Website Pro + Automação de Chat",
    price: "R$ 497 (Economiza R$ 303)",
    stages: [
      {
        id: "greeting",
        title: "🎯 Saudação & Abertura",
        description: "Primeiras mensagens",
        messages: [
          {
            id: "g1",
            role: "seller",
            text: "Oi! 👋 Sou [Seu Nome] da Lemon CP. Você quer estrutura completa para vender online? 💼",
            notes: "Ofereça o combo",
          },
        ],
      },
      {
        id: "presentation",
        title: "💡 Apresentação",
        description: "Oferecer combo",
        messages: [
          {
            id: "p1",
            role: "seller",
            text: "Temos o combo mais procurado: Negócio Online (R$ 497)\n\n✅ Website Pro (R$ 300)\n✅ Automação de Chat (R$ 500)\n\n💰 Economiza R$ 303!\n\nEstrutura completa para vendas! 🚀",
            notes: "Destaque a economia e completude",
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
            text: "Quer começar seu negócio online agora?",
            notes: "Confirme a venda",
          },
        ],
      },
    ],
  },
];
