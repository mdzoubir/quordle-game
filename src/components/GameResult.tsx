interface GameResultProps {
    result: "playing" | "won" | "lost";
    word: string; // Added word as a prop
    onRestart: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ result, word, onRestart }) => {
    return (
        <div
            className={`p-6 rounded-lg w-full max-w-md mx-auto transition-all duration-300 ease-in-out transform ${result === "won"
                    ? "bg-green-100 border-l-8 border-green-500"
                    : result === "lost"
                        ? "bg-red-100 border-l-8 border-red-500"
                        : "bg-gray-100"
                }`}
        >
            {result === "won" && (
                <p className="text-green-600 text-lg font-bold text-center animate__animated animate__fadeIn">
                    🎉 Congratulations! You won! 🎉
                </p>
            )}
            {result === "lost" && (
                <p className="text-red-600 text-lg font-bold text-center animate__animated animate__fadeIn">
                    😢 Sorry, you lost! The word was: {word}
                </p>
            )}
            {result === "playing" && (
                <p className="text-gray-600 text-lg font-bold text-center animate__animated animate__fadeIn">
                    Keep playing! ⏳
                </p>
            )}

            <button
                onClick={onRestart}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-lg transition-all"
            >
                Restart Game
            </button>
        </div>
    );
};

export default GameResult