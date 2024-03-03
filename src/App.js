import "./App.css";

import "./styles/grid.css";
import "./styles/input_field.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./styles/renderCards.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Display from "./components/Display";
import Header from "./components/Header";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Display />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
