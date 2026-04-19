import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Download, Upload, RotateCcw } from "lucide-react";
import { SalesScript } from "@/lib/salesScripts";
import { toast } from "sonner";

interface ServiceManagerProps {
  services: SalesScript[];
  onAddService: (service: SalesScript) => void;
  onDeleteService: (scriptId: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
}

export function ServiceManager({
  services,
  onAddService,
  onDeleteService,
  onExport,
  onImport,
  onReset,
}: ServiceManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    icon: "🎯",
    description: "",
    price: "",
  });

  const handleAddService = () => {
    if (!newService.name.trim()) {
      toast.error("Nome do serviço é obrigatório");
      return;
    }

    const service: SalesScript = {
      id: newService.name.toLowerCase().replace(/\s+/g, "-"),
      name: newService.name,
      icon: newService.icon,
      description: newService.description,
      price: newService.price,
      stages: [
        {
          id: "greeting",
          title: "🎯 Saudação & Abertura",
          description: "Primeiras mensagens",
          messages: [
            {
              id: "g1",
              role: "seller",
              text: "Olá! Você tem interesse em " + newService.name.toLowerCase() + "?",
              notes: "Customize conforme necessário",
            },
          ],
        },
        {
          id: "presentation",
          title: "💡 Apresentação",
          description: "Oferecer o serviço",
          messages: [
            {
              id: "p1",
              role: "seller",
              text: "Oferecemos " + newService.name + " por " + newService.price,
              notes: "Adicione detalhes do serviço",
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
              text: "Quer começar agora?",
              notes: "Confirme a venda",
            },
          ],
        },
      ],
    };

    onAddService(service);
    setNewService({ name: "", icon: "🎯", description: "", price: "" });
    setIsOpen(false);
    toast.success("Serviço adicionado com sucesso!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      toast.success("Dados importados com sucesso!");
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-bold text-gray-800">⚙️ Gerenciador de Serviços</h3>

      {/* Botões de Ação */}
      <div className="grid grid-cols-2 gap-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Serviço</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nome do serviço"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <Input
                placeholder="Ícone (emoji)"
                value={newService.icon}
                onChange={(e) =>
                  setNewService({ ...newService, icon: e.target.value })
                }
                maxLength={2}
              />
              <Input
                placeholder="Descrição"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
              <Input
                placeholder="Preço"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <Button
                onClick={handleAddService}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Criar Serviço
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={onExport}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Importar e Reset */}
      <div className="grid grid-cols-2 gap-2">
        <label className="cursor-pointer">
          <Button
            asChild
            variant="outline"
            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </span>
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <Button
          onClick={() => {
            if (confirm("Tem certeza? Isso vai resetar todos os dados para o padrão.")) {
              onReset();
              toast.success("Dados resetados!");
            }
          }}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Lista de Serviços */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">
          Serviços ({services.length})
        </h4>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 hover:border-green-300"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {service.icon} {service.name}
                </p>
                <p className="text-xs text-gray-500">{service.price}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Deletar "${service.name}"?`)) {
                    onDeleteService(service.id);
                    toast.success("Serviço deletado!");
                  }
                }}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
