import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import api from "./utils/api";
import Dashboard from "./pages/dashboard/Dashboard";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = async () => {
    const isLoggedIn = await api.validateSession();
    if (!isLoggedIn) navigate("/login");
    if (isLoggedIn) navigate("/");
  };

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
