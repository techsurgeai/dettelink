"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type KycCheck = {
  id: string;
  status: string;
  providerRef?: string;
};

export default function CompliancePage() {
  const [kyc, setKyc] = useState<KycCheck | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [loadStatus, setLoadStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setLoadStatus("loading");
    apiFetch("/compliance/kyc")
      .then(async (res) => {
        if (res.status === 401) {
          setLoadStatus("auth");
          setKyc(null);
          return;
        }
        if (!res.ok) {
          setLoadStatus("error");
          return;
        }
        setKyc(await res.json());
        setLoadStatus("idle");
      })
      .catch(() => setLoadStatus("error"));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const data = new FormData(event.currentTarget);
    const payload = {
      governmentId: data.get("governmentId"),
      companyDocument: data.get("companyDocument")
    };
    try {
      const res = await apiFetch("/compliance/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("KYC failed");
      setKyc(await res.json());
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Compliance Verification</h1>
        <p>Submit verification documents for KYC review.</p>
      </header>
      <section className="card">
        {loadStatus === "loading" && <p>Loading KYC status...</p>}
        {loadStatus === "error" && (
          <p>Unable to load compliance status right now.</p>
        )}
        {loadStatus === "auth" && (
          <p>Sign in to submit your compliance verification.</p>
        )}
        {kyc && (
          <>
            <p>Status: {kyc.status}</p>
            {kyc.providerRef && <p>Reference: {kyc.providerRef}</p>}
          </>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <input name="governmentId" placeholder="Government ID (optional)" />
          <input
            name="companyDocument"
            placeholder="Company document reference (optional)"
          />
          <button className="primary" disabled={status === "saving"}>
            {status === "saving" ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
        {status === "error" && <p>Unable to submit right now.</p>}
      </section>
    </main>
  );
}
