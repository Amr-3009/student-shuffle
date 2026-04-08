import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Shuffle() {
  const [names, setNames] = useState([]);
  const [teamSize, setTeamSize] = useState(2);
  const [teamCount, setTeamCount] = useState(2);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      setNames(JSON.parse(saved));
    }
  }, []);

  const handleShuffle = () => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const numTeams = isTeamMode
      ? teamCount
      : Math.ceil(shuffled.length / teamSize);
    const newTeams = Array.from({ length: numTeams }, () => []);

    shuffled.forEach((name, index) => {
      newTeams[index % numTeams].push(name);
    });

    setTeams(newTeams);
  };

  return (
    <div
      className="flex-1 bg-zinc-900 flex flex-col items-center justify-center p-6"
      style={{
        padding: "20px",
      }}
    >
      <div
        className="bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
        style={{
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <h2
          className="text-amber-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-center tracking-wide"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            padding: "5px",
          }}
        >
          Shuffle Students
        </h2>

        {/* Checkbox toggle */}
        <div
          className="flex items-center gap-3 mb-4 text-center justify-center align-content-center "
          style={{
            padding: "5px",
          }}
        >
          <input
            type="checkbox"
            id="teamMode"
            checked={isTeamMode}
            onChange={(e) => setIsTeamMode(e.target.checked)}
            className="w-5 h-5 accent-amber-300 cursor-pointer text-center"
          />
          <label
            htmlFor="teamMode"
            className="text-amber-300 text-sm md:text-base lg:text-lg xl:text-xl cursor-pointer"
          >
            Select by number of teams
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-amber-300 text-sm md:text-base lg:text-lg xl:text-xl font-bold">
            {isTeamMode ? "Number of teams:" : "Students per team:"}
          </label>
          <select
            value={isTeamMode ? teamCount : teamSize}
            onChange={(e) =>
              isTeamMode
                ? setTeamCount(Number(e.target.value))
                : setTeamSize(Number(e.target.value))
            }
            className="bg-zinc-900 border-2 border-amber-300 text-amber-300 rounded-xl px-4 py-2 text-sm md:text-base lg:text-lg xl:text-xl focus:outline-none w-full md:w-auto text-center"
          >
            {[2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={handleShuffle}
            className="w-full flex-1 bg-amber-300 text-zinc-900 font-bold py-3 px-6 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-amber-400 transition-colors"
          >
            🎲 Shuffle!
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full flex-1 bg-zinc-700 text-amber-300 font-bold py-3 px-6 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-zinc-600 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
          {teams.map((team, index) => (
            <div key={index} className="bg-zinc-800 rounded-2xl shadow-xl p-6">
              <h3
                className="text-amber-300 text-lg md:text-xl lg:text-2xl font-bold mb-4 text-center"
                style={{
                  borderBottom: "2px solid #fbbf24",
                  padding: "8px",
                }}
              >
                Team {index + 1}
              </h3>
              <ul className="space-y-2">
                {team.map((name, i) => (
                  <li
                    key={i}
                    className="text-amber-300 text-sm md:text-base lg:text-lg bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700 text-center"
                    style={{
                      padding: "8px",
                      margin: "8px",
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shuffle;
