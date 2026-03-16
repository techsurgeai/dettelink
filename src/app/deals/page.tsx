"use client";

import { useEffect, useState } from "react";
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
          setStatus("auth");
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
      <div className="page-header">
        <div>
          <h1 className="page-title">Deal Pipeline</h1>
          <p className="page-subtitle">
            Browse and manage investment opportunities
          </p>
        </div>
      </div>

      {status === "loading" && (
        <div className="loading-spinner" style={{ margin: "2rem auto" }} />
      )}

      {status === "auth" && (
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem" }}>
          <h3>Authentication Required</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Sign in with an active subscription to access deal rooms.
          </p>
          <a href="/login/" className="btn btn-primary">Sign In</a>
        </div>
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
          <div className="filter-tabs" style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {stages.map(stage => (
              <button
                key={stage}
                className={`btn ${filter === stage ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFilter(stage)}
                style={{ textTransform: "capitalize", fontSize: "0.875rem" }}
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
            <div className="deals-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem"
            }}>
              {filteredDeals.map((deal) => (
                <article key={deal.id} className="glass-card deal-card" style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden"
                }}>
                  <div style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                        color: "var(--text-primary)"
                      }}>
                        {deal.title}
                      </h3>
                      <p style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)"
                      }}>
                        {deal.sector} &bull; {deal.geo}
                      </p>
                    </div>
                    <span className="badge" style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      background: `${stageColors[deal.stage] || "var(--primary)"}20`,
                      color: stageColors[deal.stage] || "var(--primary)"
                    }}>
                      {deal.stage}
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem 1.5rem", flex: 1 }}>
                    <p style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {deal.overview}
                    </p>
                  </div>

                  <div style={{
                    padding: "1rem 1.5rem",
                    borderTop: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <span>{deal._count?.teasers || 0} teasers</span>
                      <span>{deal._count?.documents || 0} docs</span>
                    </div>
                    <a
                      href={`/deal/?id=${deal.id}`}
                      className="btn btn-primary"
                      style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
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

