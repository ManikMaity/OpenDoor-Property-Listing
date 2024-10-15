import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Sigin from "./pages/Sigin";
import Signup from "./pages/Signup";
import Header from "./components/Header/Header";


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/sign-in" element={<Sigin/>} />
        <Route path="/Sign-up" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
