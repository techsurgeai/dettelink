"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Plan = {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  interval: string;
};

type Subscription = {
  id: string;
  status: string;
  plan: Plan;
};

export default function BillingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [loadStatus, setLoadStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setLoadStatus("loading");
    apiFetch("/billing/plans")
      .then(async (res) => {
        if (res.status === 401) {
          setLoadStatus("auth");
          setPlans([]);
          return;
        }
        if (!res.ok) {
          setLoadStatus("error");
          return;
        }
        setPlans(await res.json());
        setLoadStatus("idle");
      })
      .catch(() => setLoadStatus("error"));
    apiFetch("/billing/subscriptions")
      .then(async (res) => {
        if (res.status === 401) {
          setSubs([]);
          return;
        }
        if (!res.ok) {
          return;
        }
        setSubs(await res.json());
      })
      .catch(() => setSubs([]));
  }, []);

  async function subscribe(planId: string) {
    setStatus("saving");
    try {
      const res = await apiFetch("/billing/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      });
      if (!res.ok) throw new Error("Subscribe failed");
      const refreshed = await apiFetch("/billing/subscriptions");
      setSubs((await refreshed.json()) ?? []);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Subscription Plans</h1>
        <p>Unlock full syndication access with an active subscription.</p>
      </header>
      <section className="grid">
        {plans.map((plan) => (
          <article className="card" key={plan.id}>
            <h3>{plan.name}</h3>
            <p>
              {plan.currency} {(plan.priceCents / 100).toFixed(2)} /{" "}
              {plan.interval}
            </p>
            <button className="primary" onClick={() => subscribe(plan.id)}>
              Request subscription
            </button>
          </article>
        ))}
        {loadStatus === "loading" && (
          <article className="card">
            <h3>Loading plans</h3>
            <p>Fetching subscription tiers...</p>
          </article>
        )}
        {loadStatus === "error" && (
          <article className="card">
            <h3>Unable to load plans</h3>
            <p>Please try again later.</p>
          </article>
        )}
        {loadStatus === "auth" && (
          <article className="card">
            <h3>Sign in required</h3>
            <p>Log in to request a subscription plan.</p>
            <Link className="secondary" href="/login/">
              Sign in
            </Link>
          </article>
        )}
        {loadStatus === "idle" && !plans.length && (
          <article className="card">
            <h3>No plans yet</h3>
            <p>Plans will appear here once configured.</p>
          </article>
        )}
      </section>
      <section className="grid">
        {subs.map((sub) => (
          <article className="card" key={sub.id}>
            <h3>{sub.plan.name}</h3>
            <p>Status: {sub.status}</p>
          </article>
        ))}
        {!subs.length && (
          <article className="card">
            <h3>No subscriptions</h3>
            <p>Submit a request to activate your access.</p>
          </article>
        )}
      </section>
      {status === "error" && <p>Unable to update subscription.</p>}
    </main>
  );
}

