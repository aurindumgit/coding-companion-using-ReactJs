import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function GoalTracker({ totalSolved }) {
  const [goal, setGoal] = useState(500); // Default Goal
  const [dailyRate, setDailyRate] = useState(2); // Default Daily Target

  const remainingProblems = Math.max(0, goal - totalSolved);
  const daysNeeded = dailyRate > 0 ? Math.ceil(remainingProblems / dailyRate) : 0;

  const goalOptions = [
    { value: 100, color: "bg-blue-400" },
    { value: 250, color: "bg-green-400" },
    { value: 500, color: "bg-yellow-400" },
    { value: 750, color: "bg-orange-400" },
    { value: 1000, color: "bg-red-500" },
  ];

  useEffect(() => {
    // Disable scrolling on goal achievement
    if (remainingProblems === 0) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
    
    return () => {
      document.body.style.overflowX = "auto"; // Reset overflow on unmount
    };
  }, [remainingProblems]);

  return (
    <div className="rounded-lg p-6 shadow-lg bg-neutral-700 w-full max-w-lg text-center">
      <h3 className="text-3xl font-bold mb-6 text-white">Goal Tracker</h3>

      {/* Goal Selection Buttons */}
      <div className="mb-4">
        <p className="text-white font-bold mb-5">Goal: {goal} Problems</p>
        <div className="grid grid-cols-5 gap-2">
          {goalOptions.map(({ value, color }) => (
            <button
              key={value}
              onClick={() => setGoal(value)}
              className={`w-full px-4 py-3 mb-6 rounded font-bold text-white ${color} transition-transform transform hover:scale-105 ${
                goal === value ? "ring-2 ring-white" : ""
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Target Slider */}
      <div className="mb-4">
        <label className="text-white font-bold block mb-1">
          Daily Target: {dailyRate} Problems
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={dailyRate}
          onChange={(e) => setDailyRate(parseInt(e.target.value))}
          className="w-full mt-2 accent-blue-300 cursor-pointer transition-all"
        />
      </div>

      {/* Estimated Days */}
      {remainingProblems === 0 ? (
        <>
          {/* Confetti when goal is achieved */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={120}
            gravity={0.4}
            recycle={false}
          />
          <p className="text-green-300 font-bold text-lg">🎉 Goal Achieved! Set a higher target! 🚀</p>
        </>
      ) : (
        <p className="text-yellow-200 font-bold text-lg">📅 Estimated Time: {daysNeeded} Days</p>
      )}
    </div>
  );
}
