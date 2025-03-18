
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
    return null;
  }

  return (
    <div 
      ref={listRef}
      className={cn(
        "mt-6",
        className
      )}
    >
      <ol className="list-decimal pl-8 space-y-2">
        {friends.map((friend, index) => (
          <motion.li
            key={`${friend}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "text-lg",
              selectedFriend === friend ? "text-[#4E54E9] font-medium" : ""
            )}
          >
            <div className="flex items-center justify-between">
              <span>{friend}</span>
              
              {onRemoveFriend && !disabled && (
                <button
                  type="button"
                  onClick={() => onRemoveFriend(index)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  disabled={disabled}
                  aria-label={`Remover ${friend}`}
                >
                  <BadgeX size={16} />
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default FriendList;
