import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X, Plus, Edit2, Save } from "lucide-react";
import { Message } from "@/lib/salesScripts";

interface MessageEditorProps {
  message: Message;
  onUpdate: (newText: string) => void;
  onAddAlternative: (alternative: string) => void;
  onRemoveAlternative: (index: number) => void;
}

export function MessageEditor({
  message,
  onUpdate,
  onAddAlternative,
  onRemoveAlternative,
}: MessageEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
  const [newAlternative, setNewAlternative] = useState("");
  const [showAlternativeInput, setShowAlternativeInput] = useState(false);

  const handleSave = () => {
    onUpdate(editedText);
    setIsEditing(false);
  };

  const handleAddAlternative = () => {
    if (newAlternative.trim()) {
      onAddAlternative(newAlternative);
      setNewAlternative("");
      setShowAlternativeInput(false);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-white border border-green-200 rounded-lg">
      {/* Mensagem Principal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            {message.role === "seller" ? "📤 Sua Mensagem" : "📥 Cliente"}
          </label>
          {!isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-24 font-mono text-sm"
              placeholder="Edite a mensagem aqui..."
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-1" />
                Salvar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(message.text);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-green-50 rounded border border-green-200 text-sm whitespace-pre-wrap">
            {message.text}
          </div>
        )}
      </div>

      {/* Notas */}
      {message.notes && (
        <div className="p-2 bg-blue-50 border-l-4 border-blue-400 text-xs text-blue-700">
          💡 {message.notes}
        </div>
      )}

      {/* Alternativas */}
      {message.alternatives && message.alternatives.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            📝 Alternativas ({message.alternatives.length})
          </label>
          <div className="space-y-2">
            {message.alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 bg-yellow-50 rounded border border-yellow-200"
              >
                <div className="flex-1 text-sm text-gray-700">{alt}</div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveAlternative(idx)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adicionar Alternativa */}
      {message.role === "seller" && (
        <div className="space-y-2">
          {showAlternativeInput ? (
            <div className="space-y-2">
              <Input
                placeholder="Digite uma alternativa de mensagem..."
                value={newAlternative}
                onChange={(e) => setNewAlternative(e.target.value)}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddAlternative}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowAlternativeInput(false);
                    setNewAlternative("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAlternativeInput(true)}
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Alternativa
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
