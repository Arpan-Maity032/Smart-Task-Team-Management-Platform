import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Flash from "./components/Flash";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/flash" element={<Flash />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/forget-password" element={<ForgetPassword />}/>
    </Routes>
  );
}

export default App;
