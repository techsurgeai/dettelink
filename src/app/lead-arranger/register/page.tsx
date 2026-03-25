"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadArrangerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firmName: "",
    fullName: "",
    email: "",
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
          fullName: formData.fullName,
          firm: formData.firmName,
          role: "lead_arranger",
          country: formData.country,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message.join(", ") : data.message || "Registration failed"
        );
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
      <div className="auth-split-image">
        <img src="/images/chart-bg.jpg" alt="Financial Chart" className="auth-bg-img" />
      </div>

      <div className="auth-split-form">
        <div className="auth-form-wrapper">
          <div className="auth-brand">
            <img src="/images/logo.png" alt="Dettelinks" className="auth-brand-logo-img" />
          </div>

          <div className="auth-header">
            <h1 className="auth-title">Lead Arranger Sign Up</h1>
            <p className="auth-subtitle">Create your lead arranger account to access mandate, teaser, and recipient workflows.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error ? (
              <div
                className="form-error"
                style={{ marginBottom: "16px", padding: "12px", background: "#fef2f2", borderRadius: "8px", color: "#dc2626" }}
              >
                {error}
              </div>
            ) : null}

            <div className="form-group">
              <label className="form-label">Firm Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Firm Name"
                value={formData.firmName}
                onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@firm.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <input type="text" className="form-input" value="Lead Arranger" readOnly />
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
              {loading ? "Creating Account..." : "Register as Lead Arranger"}
            </button>
          </form>

          <div className="auth-footer">
            Already have a lead arranger account?{" "}
            <Link href="/lead-arranger/login/" className="auth-link">
              Log In
            </Link>
          </div>

          <div className="auth-extra">
            <Link href="/register/" className="auth-link-subtle">
              Go to Client Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
