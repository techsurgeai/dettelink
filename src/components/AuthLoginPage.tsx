"use client";

import Link from "next/link";
import { useState } from "react";
import { apiFetch, setToken } from "../lib/api";
import { getDashboardPathForRole, isB2BMemberRole, isLeadArrangerRole, parseTokenPayload } from "../lib/auth";

type SupportedRole = "admin" | "lead_arranger" | "b2b_member";

type AuthLoginPageProps = {
  title: string;
  subtitle: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel: string;
  loadingLabel: string;
  requiredRole?: SupportedRole;
  footerText: string;
  footerHref: string;
  footerLinkLabel: string;
  extraLinks?: Array<{ href: string; label: string }>;
};

const demoUsers: Record<SupportedRole, { email: string; password: string; fullName: string; role: SupportedRole }> = {
  admin: {
    email: "mainadmin@dettelinks.com",
    password: "MainAdmin123!",
    fullName: "Main Admin",
    role: "admin",
  },
  lead_arranger: {
    email: "admin@dettelinks.com",
    password: "Admin123!",
    fullName: "Admin",
    role: "lead_arranger",
  },
  b2b_member: {
    email: "b2bmember@dettelinks.com",
    password: "Member123!",
    fullName: "B2B Member",
    role: "b2b_member",
  },
};

function createDemoToken(payload: { email: string; fullName: string; role: string }) {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.demo`;
}

export default function AuthLoginPage({
  title,
  subtitle,
  emailLabel = "Email",
  emailPlaceholder = "johndoe@gmail.com",
  submitLabel,
  loadingLabel,
  requiredRole,
  footerText,
  footerHref,
  footerLinkLabel,
  extraLinks = [],
}: AuthLoginPageProps) {
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
      password: data.get("password"),
    };

    const email = String(payload.email ?? "").trim().toLowerCase();
    const password = String(payload.password ?? "");

    const matchedDemoUser = requiredRole ? demoUsers[requiredRole] : demoUsers.admin;

    if (
      matchedDemoUser &&
      email === matchedDemoUser.email &&
      password === matchedDemoUser.password
    ) {
      const token = createDemoToken({
        email: matchedDemoUser.email,
        fullName: matchedDemoUser.fullName,
        role: matchedDemoUser.role,
      });
      setToken(token);
      window.location.href = getDashboardPathForRole(matchedDemoUser.role);
      return;
    }

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Login failed");
      }

      const json = await res.json();
      const token = json.accessToken as string | undefined;
      const role = json.user?.role ?? parseTokenPayload(token ?? "")?.role;

      if (requiredRole === "lead_arranger" && !isLeadArrangerRole(role)) {
        throw new Error("This login is only for Lead Arranger accounts.");
      }

      if (requiredRole === "b2b_member" && !isB2BMemberRole(role)) {
        throw new Error("This login is only for B2B Member accounts.");
      }

      setToken(token ?? "");
      window.location.href = getDashboardPathForRole(role);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Invalid credentials");
    }
  }

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
            <h1 className="auth-title">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">{emailLabel}</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder={emailPlaceholder}
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

            {status === "error" && <div className="form-error">{errorMsg}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? loadingLabel : submitLabel}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {footerText}{" "}
              <Link href={footerHref} className="auth-link">
                {footerLinkLabel}
              </Link>
            </p>
          </div>

          {extraLinks.length ? (
            <div className="auth-extra">
              {extraLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} className="auth-link-subtle">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
