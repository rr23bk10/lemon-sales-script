import { useState, useEffect } from 'react';
import { SalesScript, Message, Stage } from '@/lib/salesScripts';

const STORAGE_KEY = 'lemon-sales-scripts';

export function useEditableScripts(initialScripts: SalesScript[]) {
  const [scripts, setScripts] = useState<SalesScript[]>(initialScripts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setScripts(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados salvos:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar no localStorage sempre que scripts mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
    }
  }, [scripts, isLoaded]);

  const updateMessage = (scriptId: string, stageId: string, messageId: string, newText: string) => {
    setScripts(scripts.map(script => {
      if (script.id === scriptId) {
        return {
          ...script,
          stages: script.stages.map(stage => {
            if (stage.id === stageId) {
              return {
                ...stage,
                messages: stage.messages.map(msg => {
                  if (msg.id === messageId) {
                    return { ...msg, text: newText };
                  }
                  return msg;
                }),
              };
            }
            return stage;
          }),
        };
      }
      return script;
    }));
  };

  const addAlternative = (scriptId: string, stageId: string, messageId: string, alternative: string) => {
    setScripts(scripts.map(script => {
      if (script.id === scriptId) {
        return {
          ...script,
          stages: script.stages.map(stage => {
            if (stage.id === stageId) {
              return {
                ...stage,
                messages: stage.messages.map(msg => {
                  if (msg.id === messageId) {
                    return {
                      ...msg,
                      alternatives: [...(msg.alternatives || []), alternative],
                    };
                  }
                  return msg;
                }),
              };
            }
            return stage;
          }),
        };
      }
      return script;
    }));
  };

  const removeAlternative = (scriptId: string, stageId: string, messageId: string, index: number) => {
    setScripts(scripts.map(script => {
      if (script.id === scriptId) {
        return {
          ...script,
          stages: script.stages.map(stage => {
            if (stage.id === stageId) {
              return {
                ...stage,
                messages: stage.messages.map(msg => {
                  if (msg.id === messageId) {
                    return {
                      ...msg,
                      alternatives: msg.alternatives?.filter((_, i) => i !== index) || [],
                    };
                  }
                  return msg;
                }),
              };
            }
            return stage;
          }),
        };
      }
      return script;
    }));
  };

  const addNewService = (newScript: SalesScript) => {
    setScripts([...scripts, newScript]);
  };

  const updateService = (scriptId: string, updates: Partial<SalesScript>) => {
    setScripts(scripts.map(script => {
      if (script.id === scriptId) {
        return { ...script, ...updates };
      }
      return script;
    }));
  };

  const deleteService = (scriptId: string) => {
    setScripts(scripts.filter(script => script.id !== scriptId));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(scripts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `roteiro-vendas-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setScripts(imported);
      } catch (error) {
        console.error('Erro ao importar dados:', error);
      }
    };
    reader.readAsText(file);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setScripts(initialScripts);
  };

  return {
    scripts,
    updateMessage,
    addAlternative,
    removeAlternative,
    addNewService,
    updateService,
    deleteService,
    exportData,
    importData,
    resetToDefault,
  };
}
