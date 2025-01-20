interface GameResultProps {
    result: "playing" | "won" | "lost";
    onRestart: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ result, onRestart }) => {
    return (
        <div className={`p-4 rounded ${result === "won" ? "bg-green-200" : result === "lost" ? "bg-red-200" : ""}`}>
            {result === "won" && (
                <p className="text-green-600 text-lg font-bold text-center">Congratulations! You won!</p>
            )}
            {result === "lost" && (
                <p className="text-red-600 text-lg font-bold">Sorry, you lost! The word was: REACT</p>
            )}
            {result === "playing" && <p className="text-gray-600 text-lg font-bold text-center">Keep playing!</p>}
            <button
                onClick={onRestart}
                className="w-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded flex justify-center items-center"
            >
                Restart Game
            </button>
        </div>
    );
};

export default GameResult;
