import { useState, useEffect } from "react";

export default function WeeklyCalendar({ leetCodeUser, codeforcesUser, setWeeklyData }) {
  const [weeklyStats, setWeeklyStats] = useState(Array(7).fill(0));

  useEffect(() => {
    async function fetchWeeklyStats() {
      const weekData = Array(7).fill(0);
      const today = new Date();
      const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const mondayThisWeek = new Date(today);
      mondayThisWeek.setDate(today.getDate() - (todayDay === 0 ? 6 : todayDay - 1)); // Go back to Monday
      mondayThisWeek.setHours(0, 0, 0, 0);
      const weekStartTimestamp = Math.floor(mondayThisWeek.getTime() / 1000); // Convert to Unix timestamp

      // Fetch LeetCode data
      const leetCodeApiUrl = `https://leetcode-stats-api.herokuapp.com/${leetCodeUser}`;
      const leetCodeRes = await fetch(leetCodeApiUrl).then(res => res.json());
      if (leetCodeRes.submissionCalendar) {
        Object.entries(leetCodeRes.submissionCalendar).forEach(([timestamp, count]) => {
          const ts = parseInt(timestamp);
          if (ts >= weekStartTimestamp) {
            const dayIndex = Math.floor((ts - weekStartTimestamp) / 86400); // Convert seconds to days
            if (dayIndex >= 0 && dayIndex < 7) {
              weekData[dayIndex] += count;
            }
          }
        });
      }

      // Fetch Codeforces data
      const codeforcesApiUrl = `https://codeforces.com/api/user.status?handle=${codeforcesUser}`;
      const codeforcesRes = await fetch(codeforcesApiUrl).then(res => res.json());
      if (codeforcesRes.status === "OK") {
        codeforcesRes.result.forEach(submission => {
          const ts = submission.creationTimeSeconds;
          if (ts >= weekStartTimestamp) {
            const dayIndex = Math.floor((ts - weekStartTimestamp) / 86400);
            if (dayIndex >= 0 && dayIndex < 7) {
              weekData[dayIndex] += 1;
            }
          }
        });
      }

      setWeeklyStats(weekData);
      setWeeklyData(weekData);
    }

    fetchWeeklyStats();
  }, [leetCodeUser, codeforcesUser]);

  return (
    <div className=" rounded-lg p-6 shadow-lg bg-neutral-700 w-full max-w-lg">
      <h3 className="text-xl font-bold mb-4 text-white text-center">📅 Weekly Progress</h3>
      <div className="grid grid-cols-7 gap-2">
        {weeklyStats.map((count, index) => (
          <div key={index} className="flex flex-col items-center bg-neutral-600 p-3 rounded-md shadow-md">
            <p className="text-sm font-semibold text-white">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </p>
            <p className="text-lg font-bold text-orange-300">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
