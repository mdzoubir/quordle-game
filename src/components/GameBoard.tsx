import React from 'react';

interface GameBoardProps {
    word: string;
    guesses: string[]; // All the previous guesses
    currentGuess: string;
    rows: number;
    cols: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ word, guesses, currentGuess, rows, cols }) => {

    // Function to determine the style for each letter
    // @ts-ignore
    const getLetterStyle = (letter: string, index: number, guess: string): string => {
        if (letter === word[index]) {
            return 'bg-green-500 text-white'; // Correct position (success)
        } else if (word.includes(letter) && word[index] !== letter) {
            return 'bg-yellow-500 text-white'; // Letter exists but in wrong position (warning)
        } else {
            return 'bg-gray-500 text-white'; // Incorrect letter (incorrect)
        }
    };

    return (
        <div className="grid gap-2 mb-8">
            {/* Render each row for each guess */}
            {[...Array(rows)].map((_, rowIndex) => {
                const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
                // If this row is for a guess that's been made already, use that guess.
                // If it's the current row, use currentGuess.

                return (
                    <div key={rowIndex} className="flex gap-2">
                        {[...Array(cols)].map((_, colIndex) => {
                            const letter = guess[colIndex]; // Get the letter for this column

                            // Only apply styles if the guess is submitted
                            const letterStyle = guesses.length > rowIndex ? getLetterStyle(letter, colIndex, guess) : '';

                            return (
                                <div
                                    key={colIndex}
                                    className={`w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold ${letterStyle}`}
                                >
                                    {/* Display the letter or underscore */}
                                    {letter || ""}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GameBoard;
