import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Header from "./components/Header/Header";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateListing from "./pages/createListing";
import UpdateListing from "./pages/UpdateListing";
import NotFoundPage from "./pages/NotFound";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search/:searchText" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update/:id" element={<UpdateListing />} />
        </Route>
        <Route path="" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
