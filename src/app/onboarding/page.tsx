"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/api";

export default function Onboarding() {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get("email"),
      fullName: data.get("fullName"),
      firm: data.get("firm"),
      title: data.get("title"),
      phone: data.get("phone")
    };

    try {
      const res = await apiFetch("/onboarding/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Member Onboarding</h1>
        <p>Enterprise verification before access is granted.</p>
      </header>
      <section className="grid">
        <article className="card">
          <h3>Identity Verification</h3>
          <p>Government ID and corporate authorization documents.</p>
        </article>
        <article className="card">
          <h3>Compliance Review</h3>
          <p>AML/KYC checks and cross-border risk assessment.</p>
        </article>
        <article className="card">
          <h3>Access Provisioning</h3>
          <p>Role-based access and MFA enforced at login.</p>
        </article>
      </section>
      <section className="card">
        <h3>Request Access</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full name" required />
          <input name="firm" placeholder="Firm / Institution" required />
          <input name="title" placeholder="Title / Role" />
          <input name="phone" placeholder="Phone" />
          <input name="email" type="email" placeholder="Work email" required />
          <button className="primary" disabled={status === "saving"}>
            {status === "saving" ? "Submitting..." : "Submit request"}
          </button>
        </form>
        {status === "done" && <p>Request received. Compliance review started.</p>}
        {status === "error" && <p>Submission failed. Try again.</p>}
      </section>
    </main>
  );
}
