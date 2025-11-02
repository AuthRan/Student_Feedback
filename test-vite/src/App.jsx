import "./App.css";
import HomePage from "./components/HomePage.jsx";
import { Routes, Route, Link } from "react-router-dom";
import InstiForm from "./components/InstiForm.jsx";
import About from "./components/About.jsx";
import AdminPortal from "./components/AdminPortal.jsx";
import StudentPortal from "./components/StudentPortal.jsx";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

import StudentLogin from "./components/StudentLogin";
import StudentRegister from "./components/StudentRegister";
function App() {
  return (
    <>
      <div>
        {/* Simple navigation links */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/instiform">Insti Form</Link> |{" "}
          <Link to="/about">About</Link> | <Link to="/admin">Admin</Link> |{" "}
          <Link to="/student">Student</Link> |{" "}
        </nav>

        {/* Route setup */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instiform" element={<InstiForm />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/admin" element={<AdminPortal />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student" element={<StudentPortal />} />
          {/* You'll need to add protection here later */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPortal />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
