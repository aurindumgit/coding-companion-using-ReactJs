import { useState, useEffect } from "react";


export default function TotalStats({ leetCodeUser, codeforcesUser, gfgUser, setTotalSolved }) {
  const [totalSolved, setLocalTotalSolved] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      let leetCodeSolved = 0, codeforcesSolved = 0, gfgSolved = 0;

      try {
        // Fetch LeetCode Data
        if (leetCodeUser) {
          const leetCodeRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUser}`);
          const leetCodeData = await leetCodeRes.json();
          leetCodeSolved = leetCodeData?.totalSolved || 0;
        }

        // Fetch Codeforces Data
        if (codeforcesUser) {
          const codeforcesRes = await fetch(`https://codeforces.com/api/user.status?handle=${codeforcesUser}`);
          const codeforcesData = await codeforcesRes.json();
          codeforcesSolved = new Set(codeforcesData?.result?.map(sub => sub.problem.name)).size || 0;
        }

        // Fetch GFG Data
        if (gfgUser) {
          const gfgRes = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?userName=${gfgUser}&raw=y`);
          const gfgData = await gfgRes.json();
          gfgSolved = gfgData?.totalProblemsSolved || 0;
        }

      } catch (error) {
        console.error("Error fetching stats:", error);
      }

      const total = leetCodeSolved + codeforcesSolved + gfgSolved;
      setLocalTotalSolved(total);
      setTotalSolved(total); // Update totalSolved in App.js
    }

    if (leetCodeUser || codeforcesUser || gfgUser) fetchStats();
  }, [leetCodeUser, codeforcesUser, gfgUser, setTotalSolved]);

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-neutral-700 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Total Problems Solved</h2>
      <p className="text-6xl font-semibold text-blue-300"><strong>{totalSolved}</strong></p>
    </div>
  );
}
