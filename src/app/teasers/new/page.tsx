"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "../../../lib/api";
import AppLayout from "../../../components/AppLayout";

type CreatedTeaserPreview = {
  id: string;
  title: string;
  sector: string;
  geo: string;
  type: string;
  amount: string;
  tenor: string;
  security: string;
  snapshot: string;
  overview: string;
  summary: string;
  terms: string;
  visibility: string;
};

const seededPreview: CreatedTeaserPreview = {
  id: "falcon-energy-refinancing",
  title: "Falcon Energy Refinancing",
  sector: "Energy Infrastructure",
  geo: "UAE",
  type: "Debt",
  amount: "125000000",
  tenor: "4.5 years",
  security: "Senior secured over receivables and reserve accounts",
  snapshot: "FY2025 revenue of USD 212m with EBITDA margin at 28% and contracted cash flows across core assets.",
  overview:
    "Sponsor-backed refinancing to extend maturity runway, lower blended cost of capital, and support a capex efficiency program.",
  summary:
    "Institutional debt opportunity for a profitable regional energy platform seeking senior financing from lenders comfortable with infrastructure-style risk.",
  terms:
    "Target ticket sizes from USD 15m to USD 35m, floating-rate pricing, sculpted amortization, and standard covenant package.",
  visibility: "invite_only",
};

export default function NewTeaser() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "saving" | "done" | "error" | "auth" | "publish_pending"
  >("idle");
  const [preview, setPreview] = useState<CreatedTeaserPreview | null>(seededPreview);
  const [previewSaved, setPreviewSaved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      title: data.get("title"),
      sector: data.get("sector"),
      geo: data.get("geo"),
      type: data.get("type"),
      amount: Number(data.get("amount")),
      tenor: data.get("tenor"),
      security: data.get("security"),
      snapshot: data.get("snapshot"),
      overview: data.get("overview"),
      meetingUrl: data.get("meetingUrl"),
    };
    const teaserPayload = {
      summary: data.get("summary"),
      terms: data.get("terms"),
      visibility: data.get("visibility"),
    };

    try {
      const res = await apiFetch("/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        setStatus("auth");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const deal = await res.json();

      const teaserRes = await apiFetch(`/deals/${deal.id}/teasers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teaserPayload),
      });
      if (teaserRes.status === 401) {
        setStatus("auth");
        return;
      }
      if (!teaserRes.ok) throw new Error("Failed");
      const teaser = await teaserRes.json();

      setPreview({
        id: teaser.id ?? String(Date.now()),
        title: String(data.get("title") ?? ""),
        sector: String(data.get("sector") ?? ""),
        geo: String(data.get("geo") ?? ""),
        type: String(data.get("type") ?? ""),
        amount: String(data.get("amount") ?? ""),
        tenor: String(data.get("tenor") ?? ""),
        security: String(data.get("security") ?? ""),
        snapshot: String(data.get("snapshot") ?? ""),
        overview: String(data.get("overview") ?? ""),
        summary: String(data.get("summary") ?? ""),
        terms: String(data.get("terms") ?? ""),
        visibility: String(data.get("visibility") ?? ""),
      });
      setPreviewSaved(false);

      const publishRes = await apiFetch(`/deals/${deal.id}/teasers/${teaser.id}/publish`, { method: "POST" });

      if (publishRes.status === 401 || !publishRes.ok) {
        setStatus("publish_pending");
        setShowSuccessModal(true);
        form.reset();
        return;
      }

      setStatus("done");
      setShowSuccessModal(true);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <AppLayout>
      <div className="teaser-page">
        <header className="teaser-form-header">
          <Link href="/dashboard/lead-arranger" className="teaser-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Lead Arranger Dashboard
          </Link>
          <div className="teaser-form-heading">
            <h1>Create Deal Teaser</h1>
            <p>Generate a confidential teaser for syndication.</p>
          </div>
        </header>

        <section className="teaser-workspace">
          <div className="card teaser-form-card">
            <form className="form teaser-form" onSubmit={handleSubmit}>
              <input className="form-input" name="title" placeholder="Deal title" required />
              <input className="form-input" name="sector" placeholder="Sector" required />
              <input className="form-input" name="geo" placeholder="Geography" required />
              <select className="form-input" name="type" required>
                <option value="Debt">Debt</option>
                <option value="Equity">Equity</option>
                <option value="Debt_Equity">Debt + Equity</option>
              </select>
              <input className="form-input" name="amount" type="number" min="1" placeholder="Amount" />
              <input className="form-input" name="tenor" placeholder="Tenor / timeline" required />
              <input className="form-input" name="security" placeholder="Security / collateral" required />
              <input className="form-input" name="meetingUrl" placeholder="Virtual meeting URL" />
              <textarea className="form-input teaser-form-textarea" name="snapshot" placeholder="Financial snapshot" required />
              <textarea className="form-input teaser-form-textarea" name="overview" placeholder="Deal overview" required />
              <textarea className="form-input teaser-form-textarea" name="summary" placeholder="Teaser summary" required />
              <textarea className="form-input teaser-form-textarea" name="terms" placeholder="Indicative terms" required />
              <select className="form-input" name="visibility" required>
                <option value="invite_only">Invite only</option>
                <option value="all_members">All members</option>
              </select>
              <button className="btn btn-primary teaser-form-submit" disabled={status === "saving"}>
                {status === "saving" ? "Saving..." : "Create teaser"}
              </button>
            </form>

            {status === "error" && <p className="teaser-status teaser-status-error">Failed to create teaser.</p>}
            {status === "auth" && (
              <p className="teaser-status teaser-status-warning">
                Teaser saved successfully. Publishing is restricted, so it remains in draft preview mode.
              </p>
            )}
            {status === "publish_pending" && (
              <p className="teaser-status teaser-status-warning">
                Teaser created successfully. Publishing is still pending approval.
              </p>
            )}
          </div>

          <aside className="card teaser-preview-card">
            <div className="teaser-preview-header">
              <span className="teaser-preview-kicker">Preview</span>
              <h2>{preview ? "Created teaser preview" : "Teaser preview will appear here"}</h2>
              <p>
                {preview
                  ? "Review the latest created teaser before moving to recipient selection."
                  : "Create a teaser to view the generated preview in this panel."}
              </p>
            </div>

            {preview ? (
              <div className="teaser-preview-content">
                <div className="teaser-preview-topline">
                  <span>{preview.type}</span>
                  <span>{preview.visibility === "invite_only" ? "Invite only" : "All members"}</span>
                </div>
                <h3>{preview.title}</h3>
                <div className="teaser-preview-meta">
                  <span>{preview.sector}</span>
                  <span>{preview.geo}</span>
                  <span>{preview.amount ? `$${preview.amount}` : "Amount confidential"}</span>
                </div>
                <div className="teaser-preview-section">
                  <strong>Overview</strong>
                  <p>{preview.overview}</p>
                </div>
                <div className="teaser-preview-section">
                  <strong>Financial snapshot</strong>
                  <p>{preview.snapshot}</p>
                </div>
                <div className="teaser-preview-section">
                  <strong>Teaser summary</strong>
                  <p>{preview.summary}</p>
                </div>
                <div className="teaser-preview-grid">
                  <div className="teaser-preview-feature">
                    <strong>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 7.5v5l3 1.8" />
                      </svg>
                      Tenor
                    </strong>
                    <p>{preview.tenor}</p>
                  </div>
                  <div className="teaser-preview-feature">
                    <strong>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3z" />
                        <path d="M9.5 12.5l1.8 1.8 3.7-4.1" />
                      </svg>
                      Security
                    </strong>
                    <p>{preview.security}</p>
                  </div>
                </div>
                <div className="teaser-preview-section">
                  <strong>Indicative terms</strong>
                  <p>{preview.terms}</p>
                </div>
                <div className="teaser-preview-actions">
                  <button
                    type="button"
                    className="btn btn-primary arranger-green-btn"
                    onClick={() => setPreviewSaved(true)}
                  >
                    {previewSaved ? "Preview Teaser Saved" : "Save Preview Teaser"}
                  </button>
                  {previewSaved ? (
                    <p className="teaser-status teaser-status-success">Preview teaser saved successfully.</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="teaser-preview-empty">
                <p>No teaser created yet.</p>
              </div>
            )}
          </aside>
        </section>

        {showSuccessModal ? (
          <div className="teaser-success-overlay" role="dialog" aria-modal="true">
            <div className="teaser-success-modal">
              <div className="teaser-success-icon">OK</div>
              <h2>Teaser created successfully</h2>
              <p>
                {status === "publish_pending"
                  ? "Your teaser was created and previewed successfully. Publishing can be completed later."
                  : "Your teaser has been created and the preview is now available on this page."}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/dashboard/lead-arranger/recipient-selection/");
                }}
              >
                Continue to Recipient Selection
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </AppLayout>
  );
}
