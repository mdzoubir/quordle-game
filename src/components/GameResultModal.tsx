import React from "react";

interface GameResultModalProps {
    result: "playing" | "won" | "lost";
    word: string;
    onRestart: () => void;
    onClose: () => void;
}

const GameResultModal: React.FC<GameResultModalProps> = ({ result, word, onRestart, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 max-w-full">
                <div className="text-center">
                    {result === "won" && (
                        <p className="text-green-600 text-xl font-bold">
                            🎉 Congratulations! You won! 🎉
                        </p>
                    )}
                    {result === "lost" && (
                        <p className="text-red-600 text-xl font-bold">
                            😢 Sorry, you lost! The word was: {word}
                        </p>
                    )}
                    {result === "playing" && (
                        <p className="text-gray-600 text-xl font-bold">
                            Keep playing! ⏳
                        </p>
                    )}
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={onRestart}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                    >
                        Restart Game
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-xl"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameResultModal;
