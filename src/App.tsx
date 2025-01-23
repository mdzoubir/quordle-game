import { useState, useEffect } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameResultModal from "./components/GameResultModal";

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [submissions, setSubmissions] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const rows = 6;
  const wordLengthMap = { easy: 4, medium: 6, hard: 8 }; // Map difficulty to word length

  // Fetch a random word from the API based on difficulty (word length)
  const fetchWord = async (): Promise<string> => {
    const length = wordLengthMap[difficulty];
    try {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${length}`);
      const data = await response.json();
      console.log(data);

      return data[0].toUpperCase(); // Convert the word to uppercase
    } catch (error) {
      console.error("Error fetching word:", error);
      return "ERROR"; // Fallback in case of failure
    }
  };

  // Fetch a word when the component mounts or difficulty changes
  useEffect(() => {
    const initializeGame = async () => {
      const randomWord = await fetchWord();
      setWord(randomWord);
    };
    initializeGame();
  }, [difficulty]);

  // Handle key click event
  const handleKeyClick = (char: string): void => {
    if (gameStatus === "playing" && currentGuess.length < word.length) {
      setGuessedLetters((prev) => [...prev, char]);
      setCurrentGuess((prev) => prev + char);
    }
  };

  // Handle delete (backspace) event
  const handleDelete = (): void => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  };

  // Handle submit event
  const handleSubmit = (): void => {
    if (gameStatus === "playing" && currentGuess.length === word.length) {
      setSubmissions((prev) => [...prev, currentGuess]);
      setCurrentGuess("");

      if (currentGuess.toUpperCase() === word) {
        setGameStatus("won");
      } else if (submissions.length + 1 >= rows) {
        setGameStatus("lost");
      }
    }
  };

  // Restart the game
  const handleRestart = async () => {
    const newWord = await fetchWord();
    setWord(newWord);
    setGameStatus("playing");
    setSubmissions([]);
    setCurrentGuess("");
    setGuessedLetters([]);
    setIsModalVisible(false); // Close modal when restarting the game
  };

  // Change difficulty level
  const handleDifficultyChange = (level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    handleRestart(); // Restart the game when difficulty changes
  };

  // Show the modal
  useEffect(() => {
    if (gameStatus === "won" || gameStatus === "lost") {
      setIsModalVisible(true);
    }
  }, [gameStatus]);

  // Close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 ${difficulty === "easy" ? "bg-green-500" : "bg-gray-300"} rounded`}
            onClick={() => handleDifficultyChange("easy")}
          >
            Easy
          </button>
          <button
            className={`px-4 py-2 mr-2 ${difficulty === "medium" ? "bg-yellow-500" : "bg-gray-300"} rounded`}
            onClick={() => handleDifficultyChange("medium")}
          >
            Medium
          </button>
          <button
            className={`px-4 py-2 ${difficulty === "hard" ? "bg-red-500" : "bg-gray-300"} rounded`}
            onClick={() => handleDifficultyChange("hard")}
          >
            Hard
          </button>
        </div>

        {word ? (
          <>
            <GameBoard word={word} guesses={submissions} currentGuess={currentGuess} rows={rows} cols={word.length} />
            <Keyboard onKeyClick={handleKeyClick} onDelete={handleDelete} />
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Submit Guess
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>

      {/* Modal for showing result */}
      {isModalVisible && <GameResultModal result={gameStatus} word={word} onRestart={handleRestart} onClose={handleCloseModal} />}
    </div>
  );
}
