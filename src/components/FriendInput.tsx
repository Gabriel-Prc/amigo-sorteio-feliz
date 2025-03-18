
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";

interface FriendInputProps {
  onAddFriend: (name: string) => void;
  disabled?: boolean;
}

const FriendInput = ({ onAddFriend, disabled = false }: FriendInputProps) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome válido.",
        variant: "destructive",
      });
      return;
    }
    
    onAddFriend(trimmedName);
    setName("");
    
    // Refocus the input after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col space-y-1.5">
        <label 
          htmlFor="friend-name" 
          className="text-sm font-medium text-muted-foreground"
        >
          Nome do Amigo
        </label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id="friend-name"
            ref={inputRef}
            placeholder="Digite o nome do amigo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className="h-12 rounded-xl shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1"
          />
          <Button 
            type="submit" 
            disabled={disabled || !name.trim()}
            className="h-12 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FriendInput;
