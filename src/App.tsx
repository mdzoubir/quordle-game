import { useState } from 'react';
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameResult from './components/GameResult';

export default function Home() {
  // @ts-ignore
  const [word, setWord] = useState<string>("REACT");
  // @ts-ignore
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [submissions, setSubmissions] = useState<string[]>([]); // Track all submitted guesses
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing"); // Track game status

  const rows = 6;
  const cols = word.length;

  // Handle key click event
  const handleKeyClick = (char: string): void => {
    if (gameStatus === "playing") {
      if (currentGuess.length < word.length) {
        setGuessedLetters((prev) => [...prev, char]); // Add the guessed letter
        setCurrentGuess((prev) => prev + char); // Update the current guess
      }
    }
  };

  // Handle delete (backspace) event
  const handleDelete = (): void => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1)); // Remove the last character from current guess
    }
  };

  // Handle submit event
  const handleSubmit = (): void => {
    if (gameStatus === "playing" && currentGuess.length === word.length) {
      setSubmissions((prev) => [...prev, currentGuess]); // Submit the current guess
      setCurrentGuess(""); // Clear the current guess after submission

      // Check if the guess is correct
      if (currentGuess.toUpperCase() === word) {
        setGameStatus("won");
      } else if (submissions.length + 1 >= rows) {
        setGameStatus("lost");
      }
    }
  };

  // Restart the game
  const handleRestart = (): void => {
    setGameStatus("playing");
    setSubmissions([]);
    setCurrentGuess("");
    setGuessedLetters([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
        <GameBoard word={word} guesses={submissions} currentGuess={currentGuess} rows={rows} cols={cols} />
        <Keyboard onKeyClick={handleKeyClick} onDelete={handleDelete} />
        <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Submit Guess
        </button>

        <GameResult result={gameStatus} onRestart={handleRestart} />
      </main>
    </div>
  );
}
