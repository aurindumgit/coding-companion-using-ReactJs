import { useState, useEffect } from "react";
import UsernameForm from "./components/UsernameForm";
import TotalStats from "./components/TotalStats";
import PlatformStats from "./components/PlatformStats";
// import WeeklyCalendar from "./components/WeeklyCalendar";
import DifficultyStats from "./components/DifficultyStats";
import GoalTracker from "./components/GoalTracker";

export default function App() {
  const [leetCodeUser, setLeetCodeUser] = useState(localStorage.getItem("leetCodeUser") || "");
  const [codeforcesUser, setCodeforcesUser] = useState(localStorage.getItem("codeforcesUser") || "");
  const [gfgUser, setGfgUser] = useState(localStorage.getItem("gfgUser") || ""); // Added GFG user state
  const [totalSolved, setTotalSolved] = useState(0);
  const [weeklyData, setWeeklyData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("weeklyData")) || [];
    const lastResetDate = localStorage.getItem("lastResetDate");
    const today = new Date();
    const isMonday = today.getDay() === 1;

    if (isMonday && lastResetDate !== today.toDateString()) {
      localStorage.setItem("weeklyData", JSON.stringify([]));
      localStorage.setItem("lastResetDate", today.toDateString());
      return [];
    }
    return storedData;
  });

  useEffect(() => {
    localStorage.setItem("leetCodeUser", leetCodeUser);
    localStorage.setItem("codeforcesUser", codeforcesUser);
    localStorage.setItem("gfgUser", gfgUser); // Store GFG username
    localStorage.setItem("weeklyData", JSON.stringify(weeklyData));
  }, [leetCodeUser, codeforcesUser, gfgUser, weeklyData]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-800 p-6">
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          Coding Companion
        </h1>

        {!leetCodeUser || !codeforcesUser || !gfgUser ? (
          <UsernameForm
            setLeetCodeUser={setLeetCodeUser}
            setCodeforcesUser={setCodeforcesUser}
            setGfgUser={setGfgUser} // Pass function to UsernameForm
          />
        ) : (
          <>
            <TotalStats
              leetCodeUser={leetCodeUser}
              codeforcesUser={codeforcesUser}
              gfgUser={gfgUser}
              setTotalSolved={setTotalSolved}
            />
            <DifficultyStats
              leetCodeUser={leetCodeUser}
              codeforcesUser={codeforcesUser}
              gfgUser={gfgUser}
            />
            <GoalTracker totalSolved={totalSolved} />
            {/* <WeeklyCalendar leetCodeUser={leetCodeUser} codeforcesUser={codeforcesUser} setWeeklyData={setWeeklyData} weeklyData={weeklyData} /> */}
            <PlatformStats
              leetCodeUser={leetCodeUser}
              codeforcesUser={codeforcesUser}
              gfgUser={gfgUser}
            />
            <UsernameForm
              setLeetCodeUser={setLeetCodeUser}
              setCodeforcesUser={setCodeforcesUser}
              setGfgUser={setGfgUser} // Pass function to update username
            />
          </>
        )}
      </div>
    </div>
  );
}
