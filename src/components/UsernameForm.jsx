import { useState } from "react";

export default function UsernameForm({ setLeetCodeUser, setCodeforcesUser, setGfgUser }) {
  const [leetCodeUsername, setLeetCodeUsername] = useState("");
  const [codeforcesUsername, setCodeforcesUsername] = useState("");
  const [gfgUsername, setGfgUsername] = useState(""); // New state for GFG username

  const handleSave = () => {
    if (leetCodeUsername) setLeetCodeUser(leetCodeUsername);
    if (codeforcesUsername) setCodeforcesUser(codeforcesUsername);
    if (gfgUsername) setGfgUser(gfgUsername); // Save GFG username
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-neutral-700 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Set Usernames</h2>
      
      <input
        type="text"
        placeholder="Enter LeetCode Username"
        value={leetCodeUsername}
        onChange={(e) => setLeetCodeUsername(e.target.value)}
        className="bg-neutral-600 text-white p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      <input
        type="text"
        placeholder="Enter CodeForces Username"
        value={codeforcesUsername}
        onChange={(e) => setCodeforcesUsername(e.target.value)}
        className="bg-neutral-600 text-white p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Enter GeeksForGeeks Username"
        value={gfgUsername}
        onChange={(e) => setGfgUsername(e.target.value)}
        className="bg-neutral-600 text-white p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button 
        onClick={handleSave} 
        className="bg-blue-400 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition-all"
      >
        <strong>Save Usernames</strong>
      </button>
    </div>
  );
}
