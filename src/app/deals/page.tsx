"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { apiFetch } from "../../lib/api";

type Deal = {
  id: string;
  title: string;
  sector: string;
  geo: string;
  stage: string;
  overview: string;
  createdAt: string;
  _count?: {
    teasers: number;
    documents: number;
  };
};

const dummyDeals: Deal[] = [
  {
    id: "atlas-logistics-growth-facility",
    title: "Atlas Logistics Growth Facility",
    sector: "Logistics",
    geo: "UAE",
    stage: "teaser",
    overview:
      "Senior secured growth facility for a regional warehousing and fulfillment platform expanding across GCC corridors.",
    createdAt: "2026-03-18T08:00:00.000Z",
    _count: {
      teasers: 2,
      documents: 6,
    },
  },
  {
    id: "northbridge-consumer-receivables",
    title: "Northbridge Consumer Receivables",
    sector: "Consumer Finance",
    geo: "Saudi Arabia",
    stage: "nda",
    overview:
      "Receivables-backed financing mandate structured for institutional lenders seeking short-duration yield exposure.",
    createdAt: "2026-03-18T08:15:00.000Z",
    _count: {
      teasers: 1,
      documents: 9,
    },
  },
  {
    id: "falcon-energy-refinancing",
    title: "Falcon Energy Refinancing",
    sector: "Energy Infrastructure",
    geo: "UAE",
    stage: "dataroom",
    overview:
      "Refinancing process for an operating energy platform with contracted cash flows and active lender engagement.",
    createdAt: "2026-03-18T08:30:00.000Z",
    _count: {
      teasers: 3,
      documents: 14,
    },
  },
  {
    id: "meridian-industrial-bridge",
    title: "Meridian Industrial Bridge",
    sector: "Industrials",
    geo: "UK",
    stage: "closing",
    overview:
      "Bridge facility nearing closing for a sponsor-backed industrial carve-out with cross-border distribution support.",
    createdAt: "2026-03-18T08:45:00.000Z",
    _count: {
      teasers: 1,
      documents: 11,
    },
  },
];

const stageColors: Record<string, string> = {
  teaser: "var(--blue)",
  nda: "var(--purple)",
  dataroom: "var(--orange)",
  closing: "var(--success)"
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "auth">("idle");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setStatus("loading");
    apiFetch("/deals")
      .then(async (res) => {
        if (res.status === 401) {
          setDeals(dummyDeals);
          setStatus("idle");
          return null;
        }
        if (!res.ok) {
          setStatus("error");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setDeals(data);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  const filteredDeals = filter === "all"
    ? deals
    : deals.filter(d => d.stage === filter);

  const stages = ["all", ...new Set(deals.map(d => d.stage))];

  return (
    <AppLayout>
      <div className="page-header deals-page-header">
        <div>
          <Link href="/dashboard/lead-arranger" className="teaser-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Lead Arranger Dashboard
          </Link>
          <h1 className="page-title">Deal Pipeline</h1>
          <p className="page-subtitle">
            Browse and manage investment opportunities
          </p>
          <p className="deals-last-updated">
            Last Updated: {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </p>
        </div>
      </div>

      {status === "loading" && (
        <div className="loading-spinner" style={{ margin: "2rem auto" }} />
      )}

      {status === "error" && (
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem", borderColor: "var(--error)" }}>
          <h3>Unable to Load Deals</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            Please try again later or contact support.
          </p>
        </div>
      )}

      {status === "idle" && (
        <>
          <div className="deals-filter-tabs">
            {stages.map(stage => (
              <button
                key={stage}
                className={`deals-filter-tab ${filter === stage ? "active" : ""}`}
                onClick={() => setFilter(stage)}
              >
                {stage === "all" ? "All Deals" : stage}
              </button>
            ))}
          </div>

          {filteredDeals.length === 0 ? (
            <div className="glass-card" style={{ textAlign: "center", padding: "3rem" }}>
              <h3>No Deals Found</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                {filter === "all"
                  ? "There are no active deals at this time."
                  : `No deals in the ${filter} stage.`}
              </p>
            </div>
          ) : (
            <div className="deals-grid">
              {filteredDeals.map((deal) => (
                <article key={deal.id} className="glass-card deal-card deals-card">
                  <div className="deals-card-head">
                    <div>
                      <h3 className="deals-card-title">
                        {deal.title}
                      </h3>
                      <p className="deals-card-meta">
                        {deal.sector} &bull; {deal.geo}
                      </p>
                    </div>
                    <span className="badge deals-stage-badge" style={{
                      background: `${stageColors[deal.stage] || "#549780"}18`,
                      color: stageColors[deal.stage] || "#549780"
                    }}>
                      {deal.stage}
                    </span>
                  </div>

                  <div className="deals-card-body">
                    <p className="deals-card-overview">
                      {deal.overview}
                    </p>
                  </div>

                  <div className="deals-card-footer">
                    <div className="deals-card-stats">
                      <span>{deal._count?.teasers || 0} teasers</span>
                      <span>{deal._count?.documents || 0} docs</span>
                    </div>
                    <a
                      href={`/dashboard/lead-arranger/deal-detail/?id=${deal.id}`}
                      className="btn deals-card-btn"
                    >
                      View Deal
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
}

