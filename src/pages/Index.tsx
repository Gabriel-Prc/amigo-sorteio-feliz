
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import FriendInput from "@/components/FriendInput";
import FriendList from "@/components/FriendList";
import DrawButton from "@/components/DrawButton";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-b from-background to-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <Badge
          variant="secondary"
          className="mb-3 px-3 py-1 text-xs uppercase tracking-wider font-medium animate-fade-in"
        >
          Sorteio
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text">
          Amigo Secreto
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md">
          Adicione nomes e sorteie aleatoriamente um amigo secreto.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card className="bg-card/80 backdrop-blur-sm border shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium">
              {friends.length > 0 
                ? `Lista de Amigos (${friends.length})`
                : "Adicione Amigos para Sortear"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                >
                  <Separator className="my-4" />
                  
                  <FriendList 
                    friends={friends}
                    onRemoveFriend={removeFriend}
                    selectedFriend={selectedFriend}
                    disabled={isDrawing}
                    className="mt-4"
                  />

                  <div className="mt-6 flex justify-center">
                    <DrawButton 
                      onDraw={drawFriend}
                      disabled={isDrawing || friends.length < 2}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatedContainer 
              show={!!selectedFriend && !isDrawing}
              animateIn="animate-bounce-in"
              className="mt-8"
            >
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                <span className="text-sm font-medium text-primary/80 block mb-1">
                  Amigo Sorteado
                </span>
                <h3 className="text-2xl font-bold text-primary">
                  {selectedFriend}
                </h3>
              </div>
            </AnimatedContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
