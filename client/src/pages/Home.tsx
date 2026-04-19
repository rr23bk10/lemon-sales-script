import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Settings } from "lucide-react";
import { salesScripts } from "@/lib/salesScripts";
import { useEditableScripts } from "@/hooks/useEditableScripts";
import { MessageEditor } from "@/components/MessageEditor";
import { ServiceManager } from "@/components/ServiceManager";
import { AISuggestions } from "@/components/AISuggestions";
import { toast } from "sonner";

export default function Home() {
  const {
    scripts,
    updateMessage,
    addAlternative,
    removeAlternative,
    addNewService,
    deleteService,
    exportData,
    importData,
    resetToDefault,
  } = useEditableScripts(salesScripts);

  const [selectedService, setSelectedService] = useState(scripts[0]?.id || "");
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  const currentService = scripts.find((s) => s.id === selectedService);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  const copyAllMessages = () => {
    if (!currentService) return;
    const allMessages = currentService.stages
      .flatMap((stage) =>
        stage.messages
          .filter((msg) => msg.role === "seller")
          .map((msg) => `${stage.title}\n${msg.text}`)
      )
      .join("\n\n---\n\n");
    copyToClipboard(allMessages);
  };

  const sendToWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-green-200 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  Roteiro Inteligente de Vendas
                </span>
              </div>
              <h1 className="text-3xl font-bold">
                Roteiro de Vendas <span className="text-green-600">WhatsApp</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Abordagem completa para fechar vendas com IA, múltiplos serviços e integração com WhatsApp
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-600">{scripts.length}</p>
              <p className="text-sm text-gray-600">Serviços</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">
                {scripts.reduce((acc, s) => acc + s.stages.reduce((a, st) => a + st.messages.length, 0), 0)}+
              </p>
              <p className="text-sm text-gray-600">Mensagens</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <p className="text-2xl font-bold text-purple-600">IA</p>
              <p className="text-sm text-gray-600">Sugestões</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
              <p className="text-2xl font-bold text-orange-600">∞</p>
              <p className="text-sm text-gray-600">Customizável</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-green-200">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Editor de Roteiros
            </TabsTrigger>
            <TabsTrigger value="manager" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Gerenciador
            </TabsTrigger>
          </TabsList>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            {/* Seletor de Serviço */}
            <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Escolha o Serviço:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {scripts.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedService === service.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                  >
                    <p className="text-2xl mb-1">{service.icon}</p>
                    <p className="font-semibold text-sm">{service.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{service.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {currentService && (
              <>
                {/* Ações Rápidas */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={copyAllMessages}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    📋 Copiar Tudo
                  </Button>
                  <Button
                    onClick={exportData}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    📥 Exportar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAI(!showAI)}
                    className="border-purple-300 text-purple-700"
                  >
                    {showAI ? "Ocultar" : "Ver"} Sugestões de IA
                  </Button>
                </div>

                {/* IA Suggestions */}
                {showAI && (
                  <AISuggestions
                    service={currentService}
                    onSelectSuggestion={(text) => copyToClipboard(text)}
                  />
                )}

                {/* Stages */}
                <div className="space-y-4">
                  {currentService.stages.map((stage) => (
                    <div
                      key={stage.id}
                      className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() =>
                          setExpandedStage(
                            expandedStage === stage.id ? null : stage.id
                          )
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
                      >
                        <div className="text-left">
                          <h3 className="font-bold text-lg">{stage.title}</h3>
                          <p className="text-sm text-gray-600">
                            {stage.description}
                          </p>
                        </div>
                        <div className="text-2xl">
                          {expandedStage === stage.id ? "▼" : "▶"}
                        </div>
                      </button>

                      {expandedStage === stage.id && (
                        <div className="p-4 bg-green-50 border-t border-green-200 space-y-4">
                          {stage.messages.map((message) => (
                            <div key={message.id} className="space-y-3">
                              {/* Mensagem */}
                              <MessageEditor
                                message={message}
                                onUpdate={(newText) =>
                                  updateMessage(
                                    currentService.id,
                                    stage.id,
                                    message.id,
                                    newText
                                  )
                                }
                                onAddAlternative={(alt) =>
                                  addAlternative(
                                    currentService.id,
                                    stage.id,
                                    message.id,
                                    alt
                                  )
                                }
                                onRemoveAlternative={(idx) =>
                                  removeAlternative(
                                    currentService.id,
                                    stage.id,
                                    message.id,
                                    idx
                                  )
                                }
                              />

                              {/* Botões de Ação */}
                              {message.role === "seller" && (
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    size="sm"
                                    onClick={() => copyToClipboard(message.text)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    📋 Copiar
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => sendToWhatsApp(message.text)}
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    💬 WhatsApp
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Manager Tab */}
          <TabsContent value="manager">
            <ServiceManager
              services={scripts}
              onAddService={addNewService}
              onDeleteService={deleteService}
              onExport={exportData}
              onImport={importData}
              onReset={resetToDefault}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-green-200 mt-12">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-2">💡 Dicas Importantes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Personalize sempre com nome do cliente</li>
                <li>✅ Seja genuíno e adapte conforme conversa</li>
                <li>✅ Escute mais do que fale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">🎯 Recursos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ 14 Serviços Customizados</li>
                <li>✅ 50+ Mensagens Prontas</li>
                <li>✅ Sugestões com IA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">📱 Contato</h4>
              <p className="text-sm text-gray-600">
                Desenvolvido com ❤️ pela Lemon CP
              </p>
              <p className="text-sm text-gray-600">📱 43 98423-4418</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            © 2026 Lemon CP. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
