
import { useRef } from "react";
import { motion } from "framer-motion";
import { BadgeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FriendListProps {
  friends: string[];
  onRemoveFriend?: (index: number) => void;
  selectedFriend?: string | null;
  className?: string;
  disabled?: boolean;
}

const FriendList = ({
  friends,
  onRemoveFriend,
  selectedFriend,
  className,
  disabled = false,
}: FriendListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  if (friends.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">
          Adicione alguns amigos para começar o sorteio.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={listRef}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px] py-2 px-1",
        className
      )}
    >
      {friends.map((friend, index) => (
        <motion.div
          key={`${friend}-${index}`}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "friend-item",
            selectedFriend === friend && "ring-2 ring-primary bg-primary/5"
          )}
        >
          <div className="flex items-center justify-between">
            <span 
              className={cn(
                "font-medium truncate",
                selectedFriend === friend && "text-primary"
              )}
            >
              {friend}
            </span>
            
            {onRemoveFriend && !disabled && (
              <button
                type="button"
                onClick={() => onRemoveFriend(index)}
                className="ml-2 text-muted-foreground hover:text-destructive transition-colors duration-200 p-1 rounded-full hover:bg-destructive/10"
                disabled={disabled}
                aria-label={`Remover ${friend}`}
              >
                <BadgeX size={16} />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FriendList;
