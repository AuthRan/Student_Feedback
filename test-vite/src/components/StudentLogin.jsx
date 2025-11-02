import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (token) {
      navigate("/student", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Store the JWT token and student info
        localStorage.setItem("studentToken", data.token);
        localStorage.setItem("studentEmail", data.student.email);
        localStorage.setItem("studentName", data.student.name);
        localStorage.setItem("studentId", data.student.id);
        localStorage.setItem("studentInstitute", data.student.institute);
        localStorage.setItem("studentDepartment", data.student.department);

        // Redirect to student portal
        navigate("/student", { replace: true });
      } else {
        setError(data.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
          autoComplete="off"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
            <p className="text-gray-600 mt-2">
              Access your feedback portal
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="your.email@institute.edu"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            }`}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/student/register")}
                className="text-purple-600 font-semibold hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
