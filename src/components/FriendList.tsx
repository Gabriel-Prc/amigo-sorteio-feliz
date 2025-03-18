
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
      <div className="space-y-2 px-2">
        {friends.map((friend, index) => (
          <motion.div
            key={`${friend}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "py-2 px-4 rounded-lg bg-white shadow-sm border border-gray-100",
              selectedFriend === friend ? "border-[#FF5722] bg-[#FFF8EE]" : ""
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-lg",
                selectedFriend === friend ? "text-[#FF5722] font-medium" : ""
              )}>
                {friend}
              </span>
              
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
