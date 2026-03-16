"use client";

import Link from "next/link";
import { useState } from "react";
import { apiFetch, setToken } from "../../lib/api";

export default function LoginPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get("email"),
      password: data.get("password")
    };
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Login failed");
      }
      const json = await res.json();
      setToken(json.accessToken);
      window.location.href = "/dashboard/";
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Invalid credentials");
    }
  }

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
            <h1 className="auth-title">Log In</h1>
            <p className="auth-subtitle">Please login to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="8+ Characters"
                required
              />
              <div className="form-helper-right">
                <Link href="/forgot-password/" className="form-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {status === "error" && (
              <div className="form-error">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register/" className="auth-link">
                Register Now
              </Link>
            </p>
          </div>

          {/* Email Verification Link */}
          <div className="auth-extra">
            <Link href="/verify-email/" className="auth-link-subtle">
              Need to verify your email?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
