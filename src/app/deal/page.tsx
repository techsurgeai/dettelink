"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import { apiFetch } from "../../lib/api";

type DealTeaser = {
  id: string;
  summary: string;
  terms: string;
  publishedAt: string | null;
};

type DealDocument = {
  id: string;
  name: string;
  docType: string;
  url: string;
};

type DataRoomFile = {
  id: string;
  fileName: string;
  blobUrl: string;
  size: number;
};

type Deal = {
  id: string;
  title: string;
  sector: string;
  geo: string;
  stage: string;
  overview: string;
  meetingUrl?: string | null;
  teasers: DealTeaser[];
  documents: DealDocument[];
  dataRoom: DataRoomFile[];
};

const stageColors: Record<string, string> = {
  teaser: "var(--blue)",
  nda: "var(--purple)",
  dataroom: "var(--orange)",
  closing: "var(--success)"
};

function DealDetailPageInner() {
  const searchParams = useSearchParams();
  const dealId = searchParams?.get("id") ?? "";
  const [deal, setDeal] = useState<Deal | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "auth">("loading");
  const [actionStatus, setActionStatus] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!dealId) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    apiFetch(`/deals/${dealId}`)
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
        setDeal(data);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [dealId]);

  async function acceptNda() {
    if (!dealId) return;
    setActionStatus("Accepting NDA...");
    const res = await apiFetch(`/deals/${dealId}/nda`, { method: "POST" });
    if (!res.ok) {
      setActionStatus("Unable to accept NDA.");
      return;
    }
    const refreshed = await apiFetch(`/deals/${dealId}`);
    if (refreshed.ok) {
      setDeal(await refreshed.json());
      setActionStatus("NDA accepted successfully.");
    }
  }

  async function uploadFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dealId) return;
    setUploading(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const res = await apiFetch(`/deals/${dealId}/dataroom`, {
      method: "POST",
      body: data
    });
    setUploading(false);
    if (!res.ok) {
      setActionStatus("Upload failed. Please try again.");
      return;
    }
    const refreshed = await apiFetch(`/deals/${dealId}`);
    if (refreshed.ok) {
      setDeal(await refreshed.json());
      form.reset();
      setActionStatus("File uploaded successfully.");
    }
  }

  if (status === "loading") {
    return (
      <AppLayout>
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <div className="loading-spinner" />
        </div>
      </AppLayout>
    );
  }

  if (status === "auth") {
    return (
      <AppLayout>
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem", maxWidth: "500px", margin: "2rem auto" }}>
          <h2>Authentication Required</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Sign in with an active subscription to access deal rooms.
          </p>
          <a href="/login/" className="btn btn-primary">Sign In</a>
        </div>
      </AppLayout>
    );
  }

  if (status === "error" || !deal) {
    return (
      <AppLayout>
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem", maxWidth: "500px", margin: "2rem auto" }}>
          <h2>Deal Not Found</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            The requested deal could not be loaded.
          </p>
          <a href="/deals/" className="btn btn-secondary">Back to Deals</a>
        </div>
      </AppLayout>
    );
  }

  const teaser = deal.teasers[0];

  return (
    <AppLayout>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <a href="/deals/" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            &larr; Back to Deals
          </a>
          <h1 className="page-title">{deal.title}</h1>
          <p className="page-subtitle">
            {deal.sector} &bull; {deal.geo}
          </p>
        </div>
        <span style={{
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "uppercase",
          background: `${stageColors[deal.stage] || "var(--primary)"}20`,
          color: stageColors[deal.stage] || "var(--primary)"
        }}>
          {deal.stage}
        </span>
      </div>

      {actionStatus && (
        <div className="alert" style={{
          padding: "1rem",
          borderRadius: "var(--radius-lg)",
          background: actionStatus.includes("success") || actionStatus.includes("accepted")
            ? "rgba(16, 185, 129, 0.1)"
            : "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${actionStatus.includes("success") || actionStatus.includes("accepted") ? "var(--success)" : "var(--error)"}`,
          marginBottom: "1.5rem"
        }}>
          {actionStatus}
        </div>
      )}

      <div className="deal-layout" style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "1.5rem"
      }}>
        <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <section className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Deal Overview</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {deal.overview}
            </p>
            {deal.meetingUrl && (
              <a
                href={deal.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Join Virtual Room
              </a>
            )}
          </section>

          <section className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Investment Teaser</h2>
            {teaser ? (
              <>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  {teaser.summary}
                </p>
                {teaser.terms && (
                  <div style={{
                    padding: "1rem",
                    background: "var(--surface-elevated)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "1rem"
                  }}>
                    <strong style={{ fontSize: "0.875rem" }}>Terms:</strong>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                      {teaser.terms}
                    </p>
                  </div>
                )}
                <button className="btn btn-primary" onClick={acceptNda}>
                  Accept NDA & Request Access
                </button>
              </>
            ) : (
              <p style={{ color: "var(--text-muted)" }}>
                No teaser has been published for this deal yet.
              </p>
            )}
          </section>

          <section className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Data Room</h2>

            <form onSubmit={uploadFile} style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "var(--surface-elevated)",
              borderRadius: "var(--radius-md)"
            }}>
              <input
                name="file"
                type="file"
                required
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface)"
                }}
              />
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>

            {deal.dataRoom.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>
                No files uploaded yet.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {deal.dataRoom.map((file) => (
                  <li key={file.id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--border-color)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <svg width="20" height="20" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{file.fileName}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                      <a
                        href={file.blobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem" }}
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="sidebar" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <section className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Documents</h3>
            {deal.documents.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                No documents available.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {deal.documents.map((doc) => (
                  <li key={doc.id} style={{
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--border-color)"
                  }}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--primary)",
                        textDecoration: "none",
                        fontSize: "0.875rem"
                      }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc.name}
                    </a>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "1.5rem" }}>
                      {doc.docType}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Deal Info</h3>
            <dl style={{ margin: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-color)" }}>
                <dt style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Sector</dt>
                <dd style={{ fontWeight: 500, fontSize: "0.875rem" }}>{deal.sector}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-color)" }}>
                <dt style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Geography</dt>
                <dd style={{ fontWeight: 500, fontSize: "0.875rem" }}>{deal.geo}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-color)" }}>
                <dt style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Stage</dt>
                <dd style={{ fontWeight: 500, fontSize: "0.875rem", textTransform: "capitalize" }}>{deal.stage}</dd>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <dt style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Teasers</dt>
                <dd style={{ fontWeight: 500, fontSize: "0.875rem" }}>{deal.teasers.length}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .deal-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppLayout>
  );
}

export default function DealDetailPage() {
  return (
    <Suspense
      fallback={
        <AppLayout>
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
            <div className="loading-spinner" />
          </div>
        </AppLayout>
      }
    >
      <DealDetailPageInner />
    </Suspense>
  );
}
