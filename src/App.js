import "./App.css";
import Addjobs from "./components/Jobs/Addjobs";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/addjobs" element={<Addjobs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
