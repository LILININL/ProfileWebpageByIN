import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import IsMe from "../pages/IsMe/IsMe.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Settings from "../pages/Settings/Settings.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/iSme" element={<IsMe />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
