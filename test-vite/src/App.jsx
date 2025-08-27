import './App.css'
import HomePage from './components/HomePage.jsx'
import { Routes, Route, Link } from "react-router-dom";
import InstiForm from './components/InstiForm.jsx';
import About from './components/About.jsx';
import AdminPortal from './components/AdminPortal.jsx';
import StudentPortal from './components/StudentPortal.jsx';
function App() {

  return (
    <>
     <div>
      {/* Simple navigation links */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/instiform">Insti Form</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/admin">Admin</Link> |{" "}
        <Link to="/student">Student</Link> |{" "}
      </nav>

      {/* Route setup */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instiform" element={<InstiForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </div>
    </>
  )
}

export default App


