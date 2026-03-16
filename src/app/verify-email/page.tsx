"use client";

import Link from "next/link";
import { useState } from "react";
import { apiFetch } from "../../lib/api";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleRequestOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOtpStatus("sending");
    setErrorMsg("");
    try {
      const res = await apiFetch("/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "email_verification" })
      });
      if (!res.ok) throw new Error("Failed to send code");
      setOtpStatus("sent");
    } catch (e) {
      setOtpStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Failed to send code");
    }
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerifyStatus("verifying");
    setErrorMsg("");
    try {
      const res = await apiFetch("/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "email_verification", code })
      });
      if (!res.ok) throw new Error("Invalid code");
      setVerifyStatus("done");
    } catch (e) {
      setVerifyStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Verification failed");
    }
  }

  return (
    <div className="auth-split-container">
      {/* Left Side - Chart Background */}
      <div className="auth-split-image">
        <div className="auth-chart-bg">
          <svg className="auth-chart-grid" viewBox="0 0 400 300" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="250" x2="400" y2="250" stroke="#e5e7eb" strokeWidth="1" />
          </svg>
          <svg className="auth-chart-line" viewBox="0 0 400 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2D8A6E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2D8A6E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 250 L 40 220 L 80 180 L 120 200 L 160 150 L 200 170 L 240 120 L 280 100 L 320 130 L 360 90 L 400 110 L 400 300 L 0 300 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M 0 250 L 40 220 L 80 180 L 120 200 L 160 150 L 200 170 L 240 120 L 280 100 L 320 130 L 360 90 L 400 110"
              fill="none"
              stroke="#2D8A6E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-split-form">
        <div className="auth-form-wrapper">
          {/* Logo */}
          <div className="auth-brand">
            <svg className="auth-brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Green shield/pentagon background */}
              <path d="M4 8C4 4.68629 6.68629 2 10 2H30C33.3137 2 36 4.68629 36 8V24C36 26 35 28 33 30L22 38C21 38.6667 19 38.6667 18 38L7 30C5 28 4 26 4 24V8Z" fill="#2D8A6E"/>
              {/* Three white feather strokes fanning from bottom */}
              <path d="M20 32C18 26 14 18 11 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M20 32C20 26 20 18 20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M20 32C22 26 26 18 29 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="auth-brand-text">Dettelinks</span>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">Verify Email</h1>
            <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>
          </div>

          {verifyStatus === "done" ? (
            <div className="auth-success">
              <div className="success-icon">✓</div>
              <h3>Email Verified!</h3>
              <p>Your email has been verified. Please wait for admin approval.</p>
              <Link href="/login/" className="btn btn-primary btn-lg btn-full" style={{ marginTop: '24px' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {/* Request OTP Form */}
              <form onSubmit={handleRequestOtp} className="auth-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary btn-lg btn-full"
                  disabled={otpStatus === "sending"}
                >
                  {otpStatus === "sending" ? "Sending..." : otpStatus === "sent" ? "Code Sent ✓" : "Send Verification Code"}
                </button>
              </form>

              {otpStatus === "sent" && (
                <form onSubmit={handleVerify} className="auth-form" style={{ marginTop: '24px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="code">Verification Code</label>
                    <input
                      id="code"
                      type="text"
                      className="form-input"
                      placeholder="Enter 6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>

                  {verifyStatus === "error" && (
                    <div className="form-error">{errorMsg}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-full"
                    disabled={verifyStatus === "verifying"}
                  >
                    {verifyStatus === "verifying" ? "Verifying..." : "Verify Email"}
                  </button>
                </form>
              )}

              {otpStatus === "error" && (
                <div className="form-error" style={{ marginTop: '16px' }}>{errorMsg}</div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="auth-footer">
            <p>
              <Link href="/login/" className="auth-link">
                ← Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

