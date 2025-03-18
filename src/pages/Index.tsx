
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import FriendInput from "@/components/FriendInput";
import FriendList from "@/components/FriendList";
import DrawButton from "@/components/DrawButton";
import AnimatedContainer from "@/components/AnimatedContainer";

const Index = () => {
  const [friends, setFriends] = useState<string[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();

  const addFriend = (name: string) => {
    // Check for duplicate names
    if (friends.some(friend => friend.toLowerCase() === name.toLowerCase())) {
      toast({
        title: "Nome duplicado",
        description: `${name} já está na lista.`,
        variant: "destructive",
      });
      return;
    }

    setFriends(prev => [...prev, name]);
    toast({
      title: "Amigo adicionado",
      description: `${name} foi adicionado à lista.`,
    });
  };

  const removeFriend = (index: number) => {
    setFriends(prev => {
      const newFriends = [...prev];
      const removed = newFriends.splice(index, 1)[0];
      toast({
        title: "Amigo removido",
        description: `${removed} foi removido da lista.`,
      });
      return newFriends;
    });

    // Reset selection if the removed friend was selected
    if (selectedFriend === friends[index]) {
      setSelectedFriend(null);
    }
  };

  const drawFriend = () => {
    if (friends.length === 0) {
      toast({
        title: "Nenhum amigo na lista",
        description: "Adicione amigos para realizar o sorteio.",
        variant: "destructive",
      });
      return;
    }

    setIsDrawing(true);
    setSelectedFriend(null);

    // Animate through random friends before settling on one
    let iterations = 0;
    const totalIterations = 20;
    const minDuration = 50;
    const maxDuration = 300;
    
    const animateSelection = () => {
      const randomIndex = Math.floor(Math.random() * friends.length);
      const randomFriend = friends[randomIndex];
      setSelectedFriend(randomFriend);
      
      iterations++;
      
      if (iterations < totalIterations) {
        // Gradually slow down the animation
        const duration = minDuration + (maxDuration - minDuration) * (iterations / totalIterations);
        setTimeout(animateSelection, duration);
      } else {
        // Final selection
        const finalIndex = Math.floor(Math.random() * friends.length);
        const finalFriend = friends[finalIndex];
        setSelectedFriend(finalFriend);
        setIsDrawing(false);
        
        toast({
          title: "Amigo sorteado!",
          description: `${finalFriend} foi o sorteado!`,
        });
      }
    };
    
    setTimeout(animateSelection, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dark header with illustration */}
      <div className="bg-[#0F1427] py-6 px-4 text-white flex flex-col md:flex-row justify-center items-center relative overflow-hidden">
        <div className="text-center md:text-left md:mr-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold italic">Amigo Secreto</h1>
        </div>
        <img 
          src="/lovable-uploads/7eb2d78e-0984-43ef-8277-8101ab1cf35f.png" 
          alt="Pessoa segurando presente" 
          className="h-32 mt-4 md:mt-0 md:h-40 object-contain z-10"
        />
      </div>

      {/* Light cream content area */}
      <div className="flex-grow bg-[#FFFDF2] rounded-t-3xl -mt-4 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-center text-[#FF5722] font-medium mb-8">
            Digite o nome dos seus amigos
          </h2>
          
          <FriendInput 
            onAddFriend={addFriend} 
            disabled={isDrawing} 
          />
          
          <AnimatePresence>
            {friends.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <FriendList 
                  friends={friends}
                  onRemoveFriend={removeFriend}
                  selectedFriend={selectedFriend}
                  disabled={isDrawing}
                />

                {selectedFriend && !isDrawing && (
                  <div className="my-8 text-center">
                    <p className="text-xl text-[#FF5722] font-medium">
                      O amigo sorteado é: <span className="font-bold">{selectedFriend}</span>
                    </p>
                  </div>
                )}

                <div className="mt-8 flex justify-center">
                  <DrawButton 
                    onDraw={drawFriend}
                    disabled={isDrawing || friends.length < 2}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
