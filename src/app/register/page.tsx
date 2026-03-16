"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    role: "",
    country: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.email.split("@")[0],
          firm: formData.businessName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/verify-email?email=" + encodeURIComponent(formData.email));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to register right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side - Chart Background */}
      <div className="auth-split-image">
        <img src="/images/chart-bg.jpg" alt="Financial Chart" className="auth-bg-img" />
      </div>

      {/* Right Side - Form */}
      <div className="auth-split-form">
        <div className="auth-form-wrapper">
          {/* Logo */}
          <div className="auth-brand">
            <img src="/images/logo.png" alt="Dettelinks" className="auth-brand-logo-img" />
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">Sign up</h1>
            <p className="auth-subtitle">Please login to your account to continue</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="form-error" style={{ marginBottom: "16px", padding: "12px", background: "#fef2f2", borderRadius: "8px", color: "#dc2626" }}>{error}</div>}

            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                className="form-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="founder">Founder / CEO</option>
                <option value="cfo">CFO / Finance Director</option>
                <option value="investor">Investor</option>
                <option value="advisor">Advisor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <select
                className="form-input"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              >
                <option value="">Select a Country</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="IN">India</option>
                <option value="SG">Singapore</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="8+ Characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={8}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            Already have an account? <Link href="/login" className="auth-link">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
