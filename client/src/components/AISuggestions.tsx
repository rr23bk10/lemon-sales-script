import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { SalesScript } from "@/lib/salesScripts";

interface AISuggestionsProps {
  service?: SalesScript;
  currentStage?: string;
  currentMessageRole?: "client" | "seller";
  onSelectSuggestion: (suggestion: string) => void;
}

const suggestionsByContext: Record<string, Record<string, string[]>> = {
  greeting: {
    seller: [
      "Oi! 👋 Tudo bem? Sou [Seu Nome] da Lemon CP. Vi que você está no ramo de [segmento]. Gostaria de conversar rapidinho sobre como a gente pode ajudar seu negócio a crescer? 🚀",
      "Olá! Tudo certo? Sou [Seu Nome]. Você tem 2 minutos para conversar sobre uma oportunidade?",
      "Oi! Sou especialista em [serviço]. Você já pensou em [benefício]?",
    ],
    client: [
      "Oi! Tudo certo, mas não tenho muito tempo agora...",
      "Olá! Quem é você?",
      "Oi, tudo bem!",
    ],
  },
  qualification: {
    seller: [
      "Qual é seu principal desafio agora? (vendas, presença online, organização...)",
      "Você já tem [solução]? Como está funcionando?",
      "Quanto você investe mensalmente em [área]?",
      "Qual é seu orçamento aproximado para resolver isso?",
    ],
    client: [
      "A gente tá com dificuldade em [problema]...",
      "Não, ainda não temos [solução]...",
      "Investimos pouco em [área]...",
    ],
  },
  presentation: {
    seller: [
      "Com base no que você me contou, temos a solução ideal! 🎯",
      "Recomendo nosso [serviço]. É perfeito para [caso de uso].",
      "Temos [número] opções. Qual se encaixa melhor?",
      "Deixa eu mostrar como isso vai resolver seu problema...",
    ],
    client: [
      "Parece interessante, mas qual é a diferença entre as opções?",
      "Quanto custa?",
      "Como funciona?",
    ],
  },
  objections: {
    seller: [
      "Entendo perfeitamente! Mas deixa eu colocar assim: quanto você tá perdendo por mês sem isso?",
      "Qual é o ticket médio do seu cliente? Se vender só 1 cliente a mais, já se paga!",
      "Você prefere pagar [preço] agora ou perder [valor] em vendas por mês?",
      "Oferecemos parcelamento em [número] vezes sem juros.",
      "Qual é seu maior medo? Vou resolver isso para você!",
    ],
    client: [
      "Entendi, mas [preço] é caro pra gente agora...",
      "Tá bom, mas como funciona? Quanto tempo leva?",
      "E se eu não gostar do resultado?",
      "Preciso pensar sobre isso...",
    ],
  },
  closing: {
    seller: [
      "Ótimo! 🎉 Então vamos começar?",
      "Perfeito! Muito obrigado por confiar na Lemon CP!",
      "Qual dia você quer que a gente comece?",
      "Vou enviar um link de pagamento. Depois que confirmar, a gente já começa!",
    ],
    client: [
      "Tá bom, vamos começar!",
      "Sim, quero!",
      "Como faço para contratar?",
    ],
  },
};

export function AISuggestions({
  service,
  currentStage = "greeting",
  currentMessageRole = "seller",
  onSelectSuggestion,
}: AISuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = suggestionsByContext[currentStage]?.[currentMessageRole] || [];

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Lightbulb className="w-4 h-4" />
        {isOpen ? "Ocultar" : "Ver"} sugestões de IA
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectSuggestion(suggestion);
                setIsOpen(false);
                toast.success("Sugestão selecionada!");
              }}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors group"
            >
              <p className="text-sm text-slate-700 group-hover:text-slate-900">
                {suggestion.substring(0, 100)}
                {suggestion.length > 100 ? "..." : ""}
              </p>
              <p className="text-xs text-blue-600 mt-1">Clique para usar</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
