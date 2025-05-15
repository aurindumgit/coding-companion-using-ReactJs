import LeetCodeStats from "./LeetCodeStats";
import CodeforcesStats from "./CodeforcesStats";
import GFGStats from "./GFGStats"; // New GFG Component

export default function PlatformStats({ leetCodeUser, codeforcesUser, gfgUser }) {
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-neutral-700 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Platform-wise Stats</h2>
      <LeetCodeStats username={leetCodeUser} />
      <CodeforcesStats username={codeforcesUser} />
      <GFGStats username={gfgUser} /> {/* GFG Stats Component */}
    </div>
  );
}
