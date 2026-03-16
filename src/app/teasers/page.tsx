"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Deal = {
  id: string;
  title: string;
  sector: string;
  geo: string;
  overview: string;
};

export default function Teasers() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setStatus("loading");
    apiFetch("/deals")
      .then(async (res) => {
        if (res.status === 401) {
          setStatus("auth");
          setDeals([]);
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        setDeals(await res.json());
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="dashboard">
      <header>
        <h1>Deal Teasers</h1>
        <p>Share anonymized deal snapshots with verified members.</p>
      </header>
      <section className="grid">
        {deals.map((deal) => (
          <article key={deal.id} className="card">
            <h3>{deal.title}</h3>
            <p>
              {deal.sector} - {deal.geo}
            </p>
            <p>{deal.overview}</p>
            <Link className="primary" href={`/deal/?id=${deal.id}`}>
              View Details
            </Link>
          </article>
        ))}
        {status === "loading" && (
          <article className="card">
            <h3>Loading teasers</h3>
            <p>Fetching live opportunities...</p>
          </article>
        )}
        {status === "error" && (
          <article className="card">
            <h3>Unable to load</h3>
            <p>Try again or contact support.</p>
          </article>
        )}
        {status === "auth" && (
          <article className="card">
            <h3>Sign in required</h3>
            <p>Active members can access teaser details.</p>
            <Link className="secondary" href="/login/">
              Sign in
            </Link>
          </article>
        )}
        {status === "idle" && !deals.length && (
          <article className="card">
            <h3>No teasers yet</h3>
            <p>New deals will appear once published.</p>
          </article>
        )}
      </section>
    </main>
  );
}

