import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NamesInput() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      const names = JSON.parse(saved);
      setText(names.join("\n"));
    }
  }, []);

  const saveNames = () => {
    const names = text.split("\n").filter((name) => name.trim() !== "");
    localStorage.setItem("students", JSON.stringify(names));
  };

  const handleProceed = () => {
    saveNames();
    navigate("/");
  };

  return (
    <div className="flex-1 bg-zinc-900 flex items-center justify-center p-6">
      <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        <h2 className="text-amber-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-center tracking-wide">
          Enter Names
        </h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter one name per line..."
          rows={12}
          className="w-full bg-zinc-900 border-2 border-amber-300 text-amber-300 placeholder-zinc-500 rounded-xl p-4 font-mono text-sm md:text-base lg:text-lg xl:text-xl focus:outline-none focus:border-amber-400 resize-none"
          style={{ paddingLeft: "1rem" }}
        />
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleProceed}
            className="flex-1 bg-amber-300 text-zinc-900 font-bold py-3 rounded-xl text-sm md:text-base lg:text-lg xl:text-xl hover:bg-amber-400 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default NamesInput;
