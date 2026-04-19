import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "client" | "seller";
  text: string;
  notes?: string;
}

interface Stage {
  id: string;
  title: string;
  description: string;
  messages: Message[];
}

const stages: Stage[] = [
  {
    id: "greeting",
    title: "🎯 Saudação & Abertura",
    description: "Primeiras mensagens para estabelecer rapport e captar atenção",
    messages: [
      {
        id: "g1",
        role: "seller",
        text: "Oi! 👋 Tudo bem? Sou [Seu Nome] da Lemon CP. Vi que você está no ramo de [segmento/negócio]. Gostaria de conversar rapidinho sobre como a gente pode ajudar seu negócio a crescer? 🚀",
        notes: "Personalize com o segmento do cliente. Seja amigável e direto.",
      },
      {
        id: "g2",
        role: "client",
        text: "Oi! Tudo certo. Mas não tenho muito tempo agora...",
        notes: "Resposta comum de clientes ocupados",
      },
      {
        id: "g3",
        role: "seller",
        text: "Sem problema! Vou ser rápido. 😊 Você tem 2 minutos? Só quero entender melhor seu negócio e ver se conseguimos agregar valor.",
        notes: "Respeite o tempo do cliente, mas reafirme o valor",
      },
    ],
  },
  {
    id: "qualification",
    title: "🔍 Qualificação & Descoberta",
    description: "Entender as necessidades e desafios do cliente",
    messages: [
      {
        id: "q1",
        role: "seller",
        text: "Perfeito! Deixa eu fazer umas perguntas rápidas: 1️⃣ Qual é seu principal desafio agora com seu negócio? (vendas, presença online, organização...)",
        notes: "Faça perguntas abertas para entender o problema real",
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
        text: "Entendi! 2️⃣ Você já tem um site ou presença digital? 3️⃣ Quanto você investe mensalmente em marketing?",
        notes: "Continue qualificando para entender o nível de investimento",
      },
      {
        id: "q4",
        role: "client",
        text: "Não, ainda não temos site. Investimos pouco em marketing...",
        notes: "Cliente tem baixa maturidade digital",
      },
      {
        id: "q5",
        role: "seller",
        text: "Ótimo, isso é bem comum! 4️⃣ Qual é seu orçamento aproximado para resolver isso? (sem compromisso, só pra eu saber se consigo ajudar)",
        notes: "Qualifique o orçamento antes de apresentar soluções",
      },
    ],
  },
  {
    id: "presentation",
    title: "💡 Apresentação de Solução",
    description: "Apresentar a solução ideal baseada nas necessidades identificadas",
    messages: [
      {
        id: "p1",
        role: "seller",
        text: "Perfeito! Com base no que você me contou, acho que temos a solução ideal pra você. 🎯\n\nA gente oferece um combo chamado 'Negócio Online' que inclui:\n✅ Website Pro (até 3 páginas, design profissional, foco em vendas) - R$ 300\n✅ Automação de Chat (WhatsApp automático para responder clientes) - R$ 500\n\nTotal: R$ 497 (economiza R$ 303!)\n\nIsso vai dar a você uma presença digital profissional + automação pra não perder nenhum lead.",
        notes: "Apresente o combo com economia clara. Use emojis para destacar benefícios.",
      },
      {
        id: "p2",
        role: "client",
        text: "Parece interessante, mas qual é a diferença entre Website Start e Website Pro?",
        notes: "Cliente quer comparar opções",
      },
      {
        id: "p3",
        role: "seller",
        text: "Ótima pergunta! 👍\n\n📊 Website Start (R$ 100):\n• 1 página (Landing Page)\n• Design básico\n• Integração com WhatsApp\n• Responsivo\n\n📊 Website Pro (R$ 300):\n• Até 3 páginas\n• Design profissional + estratégico\n• Foco em conversão de vendas\n• Melhor estética\n• Até 2 revisões incluídas\n\nO Pro é ideal se você quer vender online. O Start é mais pra apresentação simples.",
        notes: "Compare lado a lado. Destaque o valor agregado do Pro.",
      },
    ],
  },
  {
    id: "objections",
    title: "🛡️ Tratamento de Objeções",
    description: "Responder às objeções comuns com confiança",
    messages: [
      {
        id: "o1",
        role: "client",
        text: "Entendi, mas R$ 497 é caro pra gente agora...",
        notes: "Objeção de preço",
      },
      {
        id: "o2",
        role: "seller",
        text: "Entendo perfeitamente! 💭 Mas deixa eu colocar assim: quanto você tá perdendo por mês por não ter um site + automação? Se você conseguir 3-5 clientes a mais por mês, o investimento se paga em uma semana! 📈\n\nAlém disso, a gente oferece parcelamento em 2x sem juros se preferir.",
        notes: "Reframe o preço como investimento. Ofereça parcelamento.",
      },
      {
        id: "o3",
        role: "client",
        text: "Tá bom, mas como funciona? Quanto tempo leva?",
        notes: "Objeção de processo/timeline",
      },
      {
        id: "o4",
        role: "seller",
        text: "Ótimo! 🚀 O processo é bem simples:\n\n1️⃣ Você nos passa as informações do seu negócio\n2️⃣ A gente cria o site + automação (leva 5-7 dias úteis)\n3️⃣ Você revisa e aprova\n4️⃣ Site ao vivo e gerando leads! 🎉\n\nA gente fica junto com você em todo o processo. Tranquilo?",
        notes: "Explique o processo de forma simples e rápida.",
      },
      {
        id: "o5",
        role: "client",
        text: "E se eu não gostar do resultado?",
        notes: "Objeção de garantia",
      },
      {
        id: "o6",
        role: "seller",
        text: "Excelente pergunta! 👍 A gente oferece até 2 revisões incluídas no Website Pro. Se algo não ficar do seu gosto, a gente ajusta. Nosso objetivo é você ficar 100% satisfeito.\n\nE se mesmo assim não funcionar, a gente conversa sobre outras estratégias. Mas te garanto que vai dar certo! 💪",
        notes: "Ofereça garantia de satisfação. Reafirme confiança.",
      },
      {
        id: "o7",
        role: "client",
        text: "Preciso pensar sobre isso...",
        notes: "Objeção de indecisão",
      },
      {
        id: "o8",
        role: "seller",
        text: "Totalmente normal! 😊 Mas deixa eu ser honesto: quanto mais tempo você espera, mais clientes você tá perdendo pra concorrência. \n\nQue tal a gente marca uma chamada rápida amanhã pra você tirar as últimas dúvidas? Aí você decide com mais segurança. Topa?",
        notes: "Crie senso de urgência sem ser agressivo. Ofereça próximo passo.",
      },
    ],
  },
  {
    id: "closing",
    title: "🎯 Fechamento & Próximos Passos",
    description: "Consolidar a venda e agendar os próximos passos",
    messages: [
      {
        id: "c1",
        role: "seller",
        text: "Ótimo! 🎉 Então vamos começar?\n\nPra formalizar, preciso que você:\n\n1️⃣ Confirme o combo 'Negócio Online' (Website Pro + Automação Chat) - R$ 497\n2️⃣ Me passe seus dados (nome completo, email, telefone)\n3️⃣ Escolha a forma de pagamento (PIX, cartão ou boleto)\n\nDepois disso, a gente já começa a trabalhar no seu projeto! 🚀",
        notes: "Seja claro sobre os próximos passos. Confirme a venda.",
      },
      {
        id: "c2",
        role: "client",
        text: "Tá bom, vamos começar! Meu nome é João, email joao@email.com, telefone 11 99999-9999",
        notes: "Cliente confirma",
      },
      {
        id: "c3",
        role: "seller",
        text: "Perfeito, João! 🙌 Muito obrigado por confiar na Lemon CP!\n\n📋 Resumo do seu pedido:\n✅ Website Pro - R$ 300\n✅ Automação Chat - R$ 500\n💰 Total: R$ 497 (com desconto!)\n\nVou enviar um link de pagamento por aqui. Depois que confirmar o pagamento, a gente já começa!\n\nQualquer dúvida, é só me chamar. Estou aqui pra ajudar! 💪",
        notes: "Confirme o pedido. Envie link de pagamento. Mantenha-se disponível.",
      },
      {
        id: "c4",
        role: "seller",
        text: "Pagamento confirmado! 🎉 Bem-vindo à Lemon CP!\n\nPróximos passos:\n📅 Amanhã de manhã, vou enviar um formulário com perguntas sobre seu negócio\n📧 Você preenche e envia de volta\n🚀 A gente começa a trabalhar no seu site\n\nVocê vai receber atualizações diárias do progresso. Tá certo?",
        notes: "Confirme recebimento. Estabeleça expectativas de comunicação.",
      },
    ],
  },
  {
    id: "upsell",
    title: "⬆️ Upsell & Serviços Adicionais",
    description: "Oferecer serviços complementares após a venda inicial",
    messages: [
      {
        id: "u1",
        role: "seller",
        text: "João, só uma coisa rápida! 💡 Você já pensou em gerenciar suas redes sociais?\n\nA gente oferece um serviço de Gestão de Redes que inclui:\n📱 Posts estratégicos (8-20 por mês)\n📸 Artes profissionais\n🎬 Reels para engajamento\n\nA partir de R$ 150/mês. Quer saber mais?",
        notes: "Ofereça upsell após a venda inicial. Seja suave.",
      },
      {
        id: "u2",
        role: "client",
        text: "Não, por enquanto só o site mesmo...",
        notes: "Cliente recusa",
      },
      {
        id: "u3",
        role: "seller",
        text: "Sem problema! 👍 Mas se em algum momento você quiser expandir, é só me chamar. A gente tá sempre aqui pra ajudar seu negócio a crescer! 🚀",
        notes: "Respeite a decisão. Mantenha a porta aberta.",
      },
    ],
  },
];

export default function Home() {
  const [expandedStage, setExpandedStage] = useState<string | null>("greeting");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Mensagem copiada!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 text-sm font-semibold">💬 ROTEIRO DE VENDAS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Roteiro de Vendas WhatsApp
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Lemon CP - Abordagem Completa para Fechar Vendas
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="text-sm font-medium text-slate-700">6 Etapas</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="text-sm font-medium text-slate-700">25+ Mensagens</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="text-sm font-medium text-slate-700">Pronto para Usar</span>
            </div>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage) => (
            <Card
              key={stage.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() =>
                  setExpandedStage(expandedStage === stage.id ? null : stage.id)
                }
                className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{stage.title}</h2>
                  <p className="text-sm text-slate-600">{stage.description}</p>
                </div>
                {expandedStage === stage.id ? (
                  <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0 ml-4" />
                )}
              </button>

              {expandedStage === stage.id && (
                <CardContent className="pt-0 pb-6 px-6 bg-slate-50 border-t">
                  <div className="space-y-4 mt-6">
                    {stage.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "seller" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md ${
                            message.role === "seller"
                              ? "bg-green-500 text-white rounded-3xl rounded-tr-lg"
                              : "bg-white text-slate-900 rounded-3xl rounded-tl-lg border border-slate-200"
                          } p-4 shadow-sm`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.text}
                          </p>
                          {message.notes && (
                            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                              <p
                                className={`text-xs ${
                                  message.role === "seller"
                                    ? "text-green-100"
                                    : "text-slate-500"
                                } italic`}
                              >
                                💡 {message.notes}
                              </p>
                            </div>
                          )}
                          {message.role === "seller" && (
                            <button
                              onClick={() => copyToClipboard(message.text, message.id)}
                              className={`mt-2 inline-flex items-center gap-2 text-xs font-medium px-2 py-1 rounded transition-all ${
                                copiedId === message.id
                                  ? "bg-green-600 text-white"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              <Copy className="w-3 h-3" />
                              {copiedId === message.id ? "Copiado!" : "Copiar"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 space-y-3">
            <p>
              ✅ <strong>Personalize sempre:</strong> Use o nome do cliente, seu segmento e suas
              necessidades específicas.
            </p>
            <p>
              ✅ <strong>Seja genuíno:</strong> O roteiro é um guia, não um script rígido. Adapte
              conforme a conversa.
            </p>
            <p>
              ✅ <strong>Escute mais:</strong> Faça perguntas e ouça as respostas. Isso constrói
              confiança.
            </p>
            <p>
              ✅ <strong>Use emojis com moderação:</strong> Deixam a conversa mais amigável, mas
              não exagere.
            </p>
            <p>
              ✅ <strong>Respeite o tempo:</strong> Se o cliente não tem tempo, agende um melhor
              momento.
            </p>
            <p>
              ✅ <strong>Sempre tenha um CTA:</strong> Termine cada etapa com uma ação clara
              (confirmar, agendar, etc).
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p>Desenvolvido com ❤️ pela Lemon CP</p>
          <p className="mt-2">
            Dúvidas? Entre em contato: 📱 43 98423-4418 | WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
