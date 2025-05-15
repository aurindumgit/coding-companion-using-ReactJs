import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DifficultyStats({ leetCodeUser, codeforcesUser, gfgUser }) {
  const [difficulty, setDifficulty] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    async function fetchDifficultyStats() {
      try {
        let easy = 0, medium = 0, hard = 0;

        // Fetch LeetCode Data
        if (leetCodeUser) {
          const leetRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUser}`);
          const leetData = await leetRes.json();
          easy += leetData.easySolved || 0;
          medium += leetData.mediumSolved || 0;
          hard += leetData.hardSolved || 0;
        }

        // Fetch Codeforces Data
        if (codeforcesUser) {
          const cfRes = await fetch(`https://codeforces.com/api/user.status?handle=${codeforcesUser}`);
          const cfData = await cfRes.json();

          if (cfData.status === "OK") {
            const problems = new Set();
            cfData.result.forEach((submission) => {
              const problem = submission.problem;
              const difficultyLevel = problem.rating || 0;

              if (!problems.has(problem.name)) {
                problems.add(problem.name);

                if (difficultyLevel < 1300) easy++;
                else if (difficultyLevel <= 2000) medium++;
                else hard++;
              }
            });
          }
        }

        // Fetch GFG Data
        if (gfgUser) {
          const gfgRes = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?userName=${gfgUser}&raw=y`); // Replace with actual GFG API
          const gfgData = await gfgRes.json();
          easy += gfgData?.Easy + gfgData?.Basic || 0;
          medium += gfgData?.Medium || 0;
          hard += gfgData?.Hard || 0;
        }

        setDifficulty({ easy, medium, hard });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (leetCodeUser || codeforcesUser || gfgUser) fetchDifficultyStats();
  }, [leetCodeUser, codeforcesUser, gfgUser]);

  const data = [
    { name: "Easy", value: difficulty.easy, color: "#22c55e" }, // Green
    { name: "Medium", value: difficulty.medium, color: "#facc15" }, // Yellow
    { name: "Hard", value: difficulty.hard, color: "#ef4444" }, // Red
  ];

  return (
    <div className="flex flex-col md:flex-row items-center p-6 rounded-lg shadow-lg bg-neutral-700 w-full max-w-lg">
      <div className="w-full md:w-1/2 flex justify-center">
        {/* Chart */}
        <div className="relative w-[220px] h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total Count */}
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
            {difficulty.easy + difficulty.medium + difficulty.hard}
          </p>
        </div>
      </div>

      {/* List Stats */}
      <div className="w-full md:w-1/2 text-white text-lg p-4">
        <p className="font-bold">🔢 Total Solved: {difficulty.easy + difficulty.medium + difficulty.hard}</p>
        <p className="text-green-200">🟢 Easy: <strong>{difficulty.easy}</strong></p>
        <p className="text-yellow-200">🟡 Medium: <strong>{difficulty.medium}</strong></p>
        <p className="text-red-300">🔴 Hard: <strong>{difficulty.hard}</strong></p>
      </div>
    </div>
  );
}
