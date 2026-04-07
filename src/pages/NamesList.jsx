import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NamesList() {
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      setNames(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex-1 bg-zinc-900 flex items-center justify-center p-6">
      <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {names.length === 0 ? (
          <>
            <p className="text-amber-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center mb-6">
              It appears that you have no saved names
            </p>
            <button
              onClick={() => navigate("/edit")}
              className="w-full bg-amber-300 text-zinc-900 font-bold py-3 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-amber-400 transition-colors"
            >
              Add Names
            </button>
          </>
        ) : (
          <>
            <h2 className="text-amber-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-center tracking-wide">
              Saved Names
            </h2>
            <ul className="mb-6 space-y-2 max-h-96 overflow-y-auto">
              {names.map((name, index) => (
                <li
                  style={{
                    margin: "10px",
                    padding: "12px 16px",
                  }}
                  key={index}
                  className="text-amber-300 text-sm md:text-base lg:text-lg xl:text-xl bg-zinc-900 px-6 py-4 rounded-xl border border-zinc-700"
                >
                  {index + 1}. {name}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/edit")}
                className="flex-1 bg-zinc-700 text-amber-300 font-bold py-3 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => navigate("/shuffle")}
                className="flex-1 bg-amber-300 text-zinc-900 font-bold py-3 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-amber-400 transition-colors"
              >
                Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NamesList;
