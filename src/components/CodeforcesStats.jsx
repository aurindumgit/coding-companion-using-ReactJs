import { useState, useEffect } from "react";

export default function CodeforcesStats({ username }) {
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0, total: 0 });

  useEffect(() => {
    async function fetchCodeforcesStats() {
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
      const data = await response.json();

      if (data.status === "OK") {
        const problems = new Set();
        let easy = 0, medium = 0, hard = 0;

        data.result.forEach((submission) => {
          const problem = submission.problem;
          const difficulty = problem.rating || 0;

          if (!problems.has(problem.name)) {
            problems.add(problem.name);

            if (difficulty < 1300) easy++;
            else if (difficulty <= 2000) medium++;
            else hard++;
          }
        });

        setStats({ easy, medium, hard, total: problems.size });
      }
    }

    if (username) fetchCodeforcesStats();
  }, [username]);

  return (
    <div className="rounded-lg p-6 shadow-lg bg-neutral-600 w-full max-w-md mb-4 ">
      <h3 className="text-2xl font-bold mb-3 text-white">CodeForces Stats</h3>
      <div className="text-lg">
        <p className="text-white font-bold">🔢 Total Solved: {stats.total}</p>
        <p className="text-green-200">🟢 Easy: <strong>{stats.easy}</strong></p>
        <p className="text-yellow-200">🟡 Medium: <strong>{stats.medium}</strong></p>
        <p className="text-red-300">🔴 Hard: <strong>{stats.hard}</strong></p>
      </div>
    </div>
  );
}
