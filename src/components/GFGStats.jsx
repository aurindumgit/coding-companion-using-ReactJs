import { useState, useEffect } from "react";

export default function GFGStats({ username }) {
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0, total: 0 });

  useEffect(() => {
    async function fetchGFGStats() {
      try {
        const response = await fetch(
          `https://geeks-for-geeks-stats-api.vercel.app/?userName=${username}&raw=y`
        );
        const data = await response.json();

        setStats({
          easy: data.Easy + data.Basic || 0,
          medium: data.Medium || 0,
          hard: data.Hard || 0,
          total: data.totalProblemsSolved || 0,
        });
      } catch (error) {
        console.error("Failed to fetch GFG stats:", error);
      }
    }

    if (username) fetchGFGStats();
  }, [username]);

  return (
    <div className="rounded-lg p-6 shadow-lg bg-neutral-600 w-full max-w-md mb-4">
      <h3 className="text-2xl font-bold mb-3 text-white">GeeksForGeeks Stats</h3>
      <div className="text-lg">
        <p className="text-white font-bold">🔢 Total Solved: {stats.total}</p>
        <p className="text-green-200">🟢 Easy: <strong>{stats.easy}</strong></p>
        <p className="text-yellow-200">🟡 Medium: <strong>{stats.medium}</strong></p>
        <p className="text-red-300">🔴 Hard: <strong>{stats.hard}</strong></p>
      </div>
    </div>
  );
}
