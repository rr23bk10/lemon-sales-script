import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Download,
  Share2,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { salesScripts, SalesScript } from "@/lib/salesScripts";
import { AISuggestions } from "@/components/AISuggestions";

export default function Home() {
  const [selectedScript, setSelectedScript] = useState<SalesScript>(salesScripts[0]);
  const [expandedStage, setExpandedStage] = useState<string | null>(
    selectedScript.stages[0]?.id || null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Mensagem copiada! 📋");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendToWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
    toast.success("Abrindo WhatsApp! 💬");
  };

  const exportToPDF = () => {
    const content = contentRef.current?.innerText || "";
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `roteiro-${selectedScript.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Roteiro exportado! 📥");
  };

  const copyAllMessages = () => {
    let allText = `ROTEIRO DE VENDAS - ${selectedScript.name.toUpperCase()}\n\n`;
    selectedScript.stages.forEach((stage) => {
      allText += `\n${stage.title}\n${stage.description}\n`;
      allText += "─".repeat(50) + "\n";
      stage.messages.forEach((msg) => {
        allText += `\n[${msg.role.toUpperCase()}]\n${msg.text}\n`;
        if (msg.notes) allText += `💡 ${msg.notes}\n`;
      });
    });

    navigator.clipboard.writeText(allText);
    toast.success("Todas as mensagens copiadas! 📋");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 text-sm font-bold">
              💬 ROTEIRO INTELIGENTE DE VENDAS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Roteiro de Vendas <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">WhatsApp</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Abordagem completa para fechar vendas com IA, múltiplos serviços e integração com WhatsApp
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-xs text-slate-600 mt-1">Serviços</p>
            </div>
            <div className="px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-2xl font-bold text-blue-600">50+</p>
              <p className="text-xs text-slate-600 mt-1">Mensagens</p>
            </div>
            <div className="px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-2xl font-bold text-purple-600">IA</p>
              <p className="text-xs text-slate-600 mt-1">Sugestões</p>
            </div>
            <div className="px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-2xl font-bold text-orange-600">∞</p>
              <p className="text-xs text-slate-600 mt-1">Customizável</p>
            </div>
          </div>
        </div>

        {/* Service Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Escolha o Serviço:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesScripts.map((script) => (
              <button
                key={script.id}
                onClick={() => {
                  setSelectedScript(script);
                  setExpandedStage(script.stages[0]?.id || null);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedScript.id === script.id
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-green-300 hover:shadow-md"
                }`}
              >
                <div className="text-2xl mb-2">{script.icon}</div>
                <h3 className="font-bold text-slate-900">{script.name}</h3>
                <p className="text-xs text-slate-600 mt-1">{script.description}</p>
                <p className="text-sm font-semibold text-green-600 mt-2">{script.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            onClick={copyAllMessages}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Tudo
          </Button>
          <Button
            onClick={exportToPDF}
            className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button
            onClick={() => sendToWhatsApp(`Confira nosso roteiro de vendas para ${selectedScript.name}!`)}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="space-y-4">
          {selectedScript.stages.map((stage) => (
            <Card
              key={stage.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-green-500"
            >
              <button
                onClick={() =>
                  setExpandedStage(expandedStage === stage.id ? null : stage.id)
                }
                className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-slate-100 transition-colors"
              >
                <div className="text-left flex-1">
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
                  <div className="space-y-6 mt-6">
                    {stage.messages.map((message) => (
                      <div key={message.id} className="space-y-3">
                        <div
                          className={`flex ${
                            message.role === "seller" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md ${
                              message.role === "seller"
                                ? "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl rounded-tr-lg shadow-md"
                                : "bg-white text-slate-900 rounded-3xl rounded-tl-lg border-2 border-slate-200"
                            } p-4`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
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
                          </div>
                        </div>

                        {/* Action Buttons for Seller Messages */}
                        {message.role === "seller" && (
                          <div
                            className={`flex gap-2 ${
                              message.role === "seller" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <button
                              onClick={() => copyToClipboard(message.text, message.id)}
                              className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded transition-all ${
                                copiedId === message.id
                                  ? "bg-green-600 text-white"
                                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                              }`}
                            >
                              <Copy className="w-3 h-3" />
                              {copiedId === message.id ? "Copiado!" : "Copiar"}
                            </button>
                            <button
                              onClick={() => sendToWhatsApp(message.text)}
                              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition-all"
                            >
                              <MessageCircle className="w-3 h-3" />
                              WhatsApp
                            </button>
                          </div>
                        )}

                        {/* Alternatives */}
                        {message.alternatives && message.alternatives.length > 0 && (
                          <div className="ml-4 space-y-2">
                            <p className="text-xs font-semibold text-slate-600">
                              📝 Alternativas:
                            </p>
                            {message.alternatives.map((alt, idx) => (
                              <button
                                key={idx}
                                onClick={() => copyToClipboard(alt, `${message.id}-alt-${idx}`)}
                                className="w-full text-left p-2 bg-slate-100 hover:bg-slate-200 rounded text-xs text-slate-700 transition-colors"
                              >
                                {alt.substring(0, 80)}
                                {alt.length > 80 ? "..." : ""}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* AI Suggestions */}
                    <AISuggestions
                      currentStage={stage.id}
                      currentMessageRole="seller"
                      onSelectSuggestion={(suggestion) => {
                        setSelectedSuggestion(suggestion);
                        copyToClipboard(suggestion, "ai-suggestion");
                      }}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Lightbulb className="w-5 h-5" />
              Dicas Importantes para Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Personalize Sempre</p>
                <p className="text-xs">Use o nome do cliente, seu segmento e necessidades específicas.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Seja Genuíno</p>
                <p className="text-xs">O roteiro é um guia. Adapte conforme a conversa fluir.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Escute Mais</p>
                <p className="text-xs">Faça perguntas e ouça as respostas. Constrói confiança.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Use Emojis</p>
                <p className="text-xs">Deixam a conversa amigável, mas não exagere!</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Respeite o Tempo</p>
                <p className="text-xs">Se o cliente não tem tempo, agende um melhor momento.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-semibold text-sm mb-1">✅ Sempre um CTA</p>
                <p className="text-xs">Termine cada etapa com uma ação clara.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-sm border-t border-slate-200 pt-8">
          <p className="font-semibold text-slate-900 mb-2">Desenvolvido com ❤️ pela Lemon CP</p>
          <p className="mb-4">
            Dúvidas? Entre em contato: 📱 <span className="font-semibold">43 98423-4418</span> | WhatsApp
          </p>
          <p className="text-xs text-slate-500">
            © 2026 Lemon CP. Todos os direitos reservados. | Roteiro Inteligente de Vendas
          </p>
        </div>
      </div>
    </div>
  );
}
