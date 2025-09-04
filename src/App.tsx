import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";

const App: React.FC = () => {
  const [number, setNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start your adventure! Guess between 1-100 ⚡");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("⚠️ Please enter a valid number!");
      return;
    }
    setAttempts(attempts + 1);
    if (num === number) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (num < number) {
      setMessage("⬆️ Too low! Try a bigger number.");
    } else {
      setMessage("⬇️ Too high! Try a smaller number.");
    }
    setGuess("");
  };

  const resetGame = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Start your adventure! Guess between 1-100 ⚡");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">
      {/* Title */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-4xl md:text-6xl font-bold mb-6 flex items-center gap-2"
      >
        <Sparkles className="text-yellow-400" size={40} />
        Guess The Number
      </motion.h1>

      {/* Game Message */}
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg md:text-xl text-center mb-6"
      >
        {message}
      </motion.p>

      {/* Input + Button */}
      {!gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-3 mb-6"
        >
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white w-40 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleGuess}
            className="px-6 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg transition"
          >
            Guess
          </button>
        </motion.div>
      )}

      {/* Attempts */}
      <p className="mb-4">Attempts: {attempts}</p>

      {/* Game Over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <Trophy className="text-yellow-400" size={60} />
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold shadow-lg transition"
          >
            <RotateCcw size={20} /> Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default App;
