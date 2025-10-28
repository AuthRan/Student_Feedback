import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // This useEffect hook handles redirecting a user who is already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // --- THIS IS THE KEY SECTION ---
        // 1. Store the login token and other necessary info
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.adminEmail);
        localStorage.setItem("instituteId", data.instituteId);

        // This line was missing or misplaced in your previous code.
        // It's the command that performs the automatic redirect.
        if (onSuccess) onSuccess(data);
        
        // 2. Automatically navigate to the admin portal
        navigate("/admin", { replace: true });
        // --- END OF KEY SECTION ---
        
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your admin email and password to access the Admin Portal.
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <div>
          <label className="block font-medium mb-1">Admin Email</label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="admin@institute.com"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          }`}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
