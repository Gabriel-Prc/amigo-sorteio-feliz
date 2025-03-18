
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center">
        <Input
          id="friend-name"
          ref={inputRef}
          placeholder="Digite um nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          className="h-12 rounded-full border-gray-300 flex-grow"
        />
        <Button 
          type="submit" 
          disabled={disabled || !name.trim()}
          className="h-12 rounded-full px-6 ml-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default FriendInput;
