"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppLayout from "../../../../components/AppLayout";

type Recipient = {
  id: string;
  institution: string;
  focus: string;
  region: string;
  ticket: string;
  fit: "High fit" | "Warm" | "Needs NDA";
  category: "Bank" | "Private Credit" | "Investor" | "Strategic";
  rationale: string;
  selected: boolean;
};

const recipients: Recipient[] = [
  {
    id: "summit-credit",
    institution: "Summit Credit Partners",
    focus: "Infrastructure debt and growth facilities",
    region: "UAE, KSA",
    ticket: "$25m - $120m",
    fit: "High fit",
    category: "Private Credit",
    rationale: "Strong match for logistics-backed working capital and structured growth debt.",
    selected: true,
  },
  {
    id: "blueharbor",
    institution: "BlueHarbor Capital",
    focus: "Special situations and sponsor-backed growth",
    region: "UK, GCC",
    ticket: "$15m - $75m",
    fit: "Warm",
    category: "Investor",
    rationale: "Interested in cross-border expansion stories, but wants management access early.",
    selected: true,
  },
  {
    id: "first-meridian",
    institution: "First Meridian Bank",
    focus: "Trade finance, receivables, and revolving facilities",
    region: "Singapore, India",
    ticket: "$10m - $60m",
    fit: "Needs NDA",
    category: "Bank",
    rationale: "Commercial fit is good, but data room access requires NDA execution first.",
    selected: false,
  },
  {
    id: "north-bridge-bank",
    institution: "North Bridge Bank",
    focus: "Syndicated loans and club deals",
    region: "UK, Europe",
    ticket: "$30m - $150m",
    fit: "High fit",
    category: "Bank",
    rationale: "Ideal for a larger senior tranche and known for moving quickly after teaser review.",
    selected: true,
  },
  {
    id: "atlas-strategic",
    institution: "Atlas Strategic Holdings",
    focus: "Strategic minority equity and JV structures",
    region: "MENA",
    ticket: "$20m - $90m",
    fit: "Warm",
    category: "Strategic",
    rationale: "Useful for hybrid debt-plus-equity structures if the mandate broadens.",
    selected: false,
  },
  {
    id: "cedar-private",
    institution: "Cedar Private Capital",
    focus: "Growth capital and sponsorless mid-market lending",
    region: "US, GCC",
    ticket: "$12m - $80m",
    fit: "High fit",
    category: "Private Credit",
    rationale: "Good fit for non-bank execution and comfortable with fast teaser-to-call cycles.",
    selected: true,
  },
];

const activeMandate = {
  name: "Atlas Logistics Growth Facility",
  objective: "Finalize the round-one recipient shortlist before teaser circulation.",
  target: "Select 8-12 counterparties for first distribution",
};

export default function RecipientSelectionPage() {
  const [fitFilter, setFitFilter] = useState<"All" | Recipient["fit"]>("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | Recipient["category"]>("All");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(
    recipients.filter((recipient) => recipient.selected).map((recipient) => recipient.id)
  );

  const filteredRecipients = useMemo(() => {
    return recipients.filter((recipient) => {
      const matchesFit = fitFilter === "All" || recipient.fit === fitFilter;
      const matchesCategory =
        categoryFilter === "All" || recipient.category === categoryFilter;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        recipient.institution.toLowerCase().includes(normalizedQuery) ||
        recipient.focus.toLowerCase().includes(normalizedQuery) ||
        recipient.region.toLowerCase().includes(normalizedQuery);

      return matchesFit && matchesCategory && matchesQuery;
    });
  }, [categoryFilter, fitFilter, query]);

  const selectedRecipients = recipients.filter((recipient) =>
    selectedIds.includes(recipient.id)
  );

  function toggleRecipient(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((recipientId) => recipientId !== id)
        : [...current, id]
    );
  }

  return (
    <AppLayout>
      <div className="recipient-page">
        <header className="recipient-header">
          <div>
            <Link href="/dashboard/lead-arranger" className="teaser-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Lead Arranger Dashboard
            </Link>
            <h1>Recipient Selection</h1>
            <p>{activeMandate.objective}</p>
          </div>

          <div className="recipient-summary-card">
            <span className="recipient-summary-label">Active mandate</span>
            <strong>{activeMandate.name}</strong>
            <p>{activeMandate.target}</p>
          </div>
        </header>

        <section className="recipient-workspace">
          <div className="recipient-main">
            <div className="recipient-toolbar card">
              <div className="recipient-toolbar-top">
                <div>
                  <span className="recipient-section-eyebrow">Counterparty shortlist</span>
                  <h2>Choose recipients for teaser distribution</h2>
                </div>
                <div className="recipient-toolbar-actions">
                  <input
                    className="form-input recipient-search"
                    placeholder="Search institution, region, or strategy"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>

              <div className="recipient-filter-row">
                <button
                  className={`recipient-filter-pill ${fitFilter === "All" ? "active" : ""}`}
                  onClick={() => setFitFilter("All")}
                  type="button"
                >
                  All fits
                </button>
                <button
                  className={`recipient-filter-pill ${fitFilter === "High fit" ? "active" : ""}`}
                  onClick={() => setFitFilter("High fit")}
                  type="button"
                >
                  High fit
                </button>
                <button
                  className={`recipient-filter-pill ${fitFilter === "Warm" ? "active" : ""}`}
                  onClick={() => setFitFilter("Warm")}
                  type="button"
                >
                  Warm
                </button>
                <button
                  className={`recipient-filter-pill ${fitFilter === "Needs NDA" ? "active" : ""}`}
                  onClick={() => setFitFilter("Needs NDA")}
                  type="button"
                >
                  Needs NDA
                </button>

                <select
                  className="form-input recipient-category-select"
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value as "All" | Recipient["category"])
                  }
                >
                  <option value="All">All categories</option>
                  <option value="Bank">Bank</option>
                  <option value="Private Credit">Private Credit</option>
                  <option value="Investor">Investor</option>
                  <option value="Strategic">Strategic</option>
                </select>
              </div>
            </div>

            <div className="recipient-list">
              {filteredRecipients.map((recipient) => {
                const isSelected = selectedIds.includes(recipient.id);

                return (
                  <article key={recipient.id} className={`recipient-card card ${isSelected ? "selected" : ""}`}>
                    <div className="recipient-card-top">
                      <div>
                        <div className="recipient-badges">
                          <span className={`recipient-fit fit-${recipient.fit.toLowerCase().replace(/\s+/g, "-")}`}>
                            {recipient.fit}
                          </span>
                          <span className="recipient-category">{recipient.category}</span>
                        </div>
                        <h3>{recipient.institution}</h3>
                        <p>{recipient.focus}</p>
                      </div>
                      <button
                        type="button"
                        className={`recipient-select-btn ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleRecipient(recipient.id)}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>

                    <div className="recipient-meta-grid">
                      <div>
                        <span>Region</span>
                        <strong>{recipient.region}</strong>
                      </div>
                      <div>
                        <span>Ticket size</span>
                        <strong>{recipient.ticket}</strong>
                      </div>
                    </div>

                    <div className="recipient-rationale">
                      <span>Why this recipient</span>
                      <p>{recipient.rationale}</p>
                    </div>
                  </article>
                );
              })}

              {!filteredRecipients.length ? (
                <article className="card recipient-empty">
                  <h3>No recipients match this filter</h3>
                  <p>Adjust your filters to widen the shortlist.</p>
                </article>
              ) : null}
            </div>
          </div>

          <aside className="recipient-side">
            <div className="card recipient-selection-card">
              <span className="recipient-section-eyebrow">Selected recipients</span>
              <h2>{selectedRecipients.length} shortlisted</h2>
              <p>These counterparties are ready for round-one teaser distribution.</p>

              <div className="recipient-selected-list">
                {selectedRecipients.map((recipient) => (
                  <div key={recipient.id} className="recipient-selected-item">
                    <div>
                      <strong>{recipient.institution}</strong>
                      <p>{recipient.region}</p>
                    </div>
                    <span>{recipient.fit}</span>
                  </div>
                ))}
              </div>

              <div className="recipient-selection-actions">
                <Link href="/teasers/new/" className="btn btn-primary">
                  Return to teaser
                </Link>
                <Link href="/dashboard/lead-arranger/messages/" className="btn btn-secondary">
                  Contact selected recipients
                </Link>
              </div>
            </div>

            <div className="card recipient-checklist-card">
              <span className="recipient-section-eyebrow">Readiness check</span>
              <h2>Before distribution</h2>
              <ul className="arranger-checklist">
                <li className="complete">Recipient fit review complete</li>
                <li className="complete">Initial teaser approved</li>
                <li>2 selected recipients still require NDA</li>
                <li>Management call slots need confirmation</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
