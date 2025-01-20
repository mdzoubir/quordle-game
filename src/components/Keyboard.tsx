import React from "react";

interface KeyboardProps {
  onKeyClick: (char: string) => void;
  onDelete: () => void;
}

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyClick, onDelete }) => {
  return (
    <div className="w-full max-w-lg">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => {
            // If key is "Delete", use the onDelete function
            const handleClick = key === "Delete" ? onDelete : () => onKeyClick(key);

            return (
              <button
                key={key}
                onClick={handleClick}
                className={`mx-0.5 text-sm font-bold rounded ${key.length > 1 ? "px-2 py-4" : "w-10 h-14"} bg-gray-200 hover:bg-gray-300 active:bg-gray-400`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Keyboard); // Memoize to prevent unnecessary re-renders
