import { useState, useEffect } from "react";

export default function LeetCodeStats({ username }) {
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0, total: 0 });

  useEffect(() => {
    async function fetchLeetCodeStats() {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();

      setStats({
        easy: data.easySolved || 0,
        medium: data.mediumSolved || 0,
        hard: data.hardSolved || 0,
        total: data.totalSolved || 0,
      });
    }

    if (username) fetchLeetCodeStats();
  }, [username]);

  return (
    <div className=" rounded-lg p-6 shadow-lg bg-neutral-600 w-full max-w-md mb-4 ">
      <h3 className="text-2xl font-bold mb-3 text-white ">LeetCode Stats</h3>
      <div className="text-lg">
        <p className="text-white font-bold">🔢 Total Solved: {stats.total}</p>
        <p className="text-green-200">🟢 Easy: <strong>{stats.easy}</strong></p>
        <p className="text-yellow-200">🟡 Medium: <strong>{stats.medium}</strong></p>
        <p className="text-red-300">🔴 Hard: <strong>{stats.hard}</strong></p>
      </div>
    </div>
  );
}
