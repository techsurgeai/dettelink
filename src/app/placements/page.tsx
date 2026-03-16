"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Placement = {
  id: string;
  type: string;
  title: string;
  summary: string;
  region: string;
  size: number;
  stage: string;
};

export default function PlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setStatus("loading");
    apiFetch("/placements")
      .then(async (res) => {
        if (res.status === 401) {
          setStatus("auth");
          setPlacements([]);
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        setPlacements(await res.json());
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="dashboard">
      <header>
        <h1>Private Placements &amp; M&amp;A</h1>
        <p>Curated mandates for strategic investors and acquirers.</p>
      </header>
      <section className="grid">
        {placements.map((placement) => (
          <article key={placement.id} className="card">
            <p className="eyebrow">
              {placement.type.split("_").join(" ").toUpperCase()}
            </p>
            <h3>{placement.title}</h3>
            <p>{placement.summary}</p>
            <p>
              {placement.region} - {placement.size.toLocaleString()}
            </p>
            <p>Stage: {placement.stage}</p>
          </article>
        ))}
        {status === "loading" && (
          <article className="card">
            <h3>Loading placements</h3>
            <p>Curating private placement opportunities...</p>
          </article>
        )}
        {status === "error" && (
          <article className="card">
            <h3>Unable to load</h3>
            <p>Please try again in a moment.</p>
          </article>
        )}
        {status === "auth" && (
          <article className="card">
            <h3>Member access required</h3>
            <p>Active subscriptions can review placements and M&amp;A.</p>
            <Link className="secondary" href="/billing/">
              View plans
            </Link>
          </article>
        )}
        {status === "idle" && !placements.length && (
          <article className="card">
            <h3>No active placements</h3>
            <p>New mandates will appear once published.</p>
          </article>
        )}
      </section>
    </main>
  );
}

