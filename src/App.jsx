import { BrowserRouter, Routes, Route } from "react-router-dom";
import NamesInput from "./pages/NamesInput";
import NamesList from "./pages/NamesList";
import Shuffle from "./pages/Shuffle";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<NamesList />} />
          <Route path="/edit" element={<NamesInput />} />
          <Route path="/shuffle" element={<Shuffle />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
