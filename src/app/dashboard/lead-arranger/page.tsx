"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout";
import { getStoredAuth } from "../../../lib/auth";

const topMetrics = [
  {
    label: "Active mandates",
    value: "12",
    detail: "4 require recipient action this week",
    tone: "emerald",
    icon: "briefcase",
  },
  {
    label: "Draft teasers",
    value: "07",
    detail: "2 are ready for legal review",
    tone: "gold",
    icon: "document",
  },
  {
    label: "Interested parties",
    value: "31",
    detail: "9 new expressions of interest in 48h",
    tone: "blue",
    icon: "users",
  },
  {
    label: "NDA pending",
    value: "14",
    detail: "5 counterparties need same-day follow-up",
    tone: "rose",
    icon: "shield",
  },
];

const metricIcons: Record<string, JSX.Element> = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M3 12.5h18" />
      <path d="M10 12.5v2h4v-2" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16H7.5A3.5 3.5 0 0 0 4 19.5V21" />
      <circle cx="10" cy="9" r="3" />
      <path d="M20 21v-1a3 3 0 0 0-2.2-2.9" />
      <path d="M15.5 6.2a3 3 0 0 1 0 5.6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12.5l1.8 1.8 3.7-4.1" />
    </svg>
  ),
};

const pipeline = [
  { stage: "Drafting", count: 7, note: "Teasers in preparation" },
  { stage: "Shared", count: 18, note: "Distributed to market" },
  { stage: "Interest received", count: 11, note: "Awaiting qualification" },
  { stage: "NDA signed", count: 8, note: "Ready for data room" },
  { stage: "Negotiation", count: 5, note: "Commercial terms active" },
];

const priorityMandates = [
  {
    name: "Atlas Logistics Growth Facility",
    stage: "Share this afternoon",
    recipients: "24 shortlisted lenders",
    progress: 82,
  },
  {
    name: "Northbridge Consumer Receivables",
    stage: "Review incoming interest",
    recipients: "11 interested institutions",
    progress: 64,
  },
  {
    name: "Falcon Energy Refinancing",
    stage: "NDA chase-up required",
    recipients: "6 counterparties pending",
    progress: 48,
  },
];

const recipients = [
  {
    institution: "Summit Credit Partners",
    fit: "Infrastructure debt",
    region: "UAE, KSA",
    status: "High fit",
  },
  {
    institution: "BlueHarbor Capital",
    fit: "Growth & special situations",
    region: "UK, GCC",
    status: "Warm",
  },
  {
    institution: "First Meridian Bank",
    fit: "Trade finance & WC lines",
    region: "Singapore, India",
    status: "Needs NDA",
  },
];

const activityFeed = [
  {
    title: "NDA signed by Summit Credit Partners",
    time: "12 minutes ago",
    detail: "Atlas Logistics Growth Facility moved into data room access.",
  },
  {
    title: "New interest received on Northbridge Consumer Receivables",
    time: "38 minutes ago",
    detail: "BlueHarbor Capital requested management call availability.",
  },
  {
    title: "Compliance requested wording update",
    time: "1 hour ago",
    detail: "Falcon Energy teaser summary needs confidentiality revision.",
  },
  {
    title: "Recipient shortlist approved",
    time: "Today, 9:10 AM",
    detail: "24 institutions selected for Atlas round-one distribution.",
  },
];

const quickActions = [
  { href: "/teasers/new/", label: "Create teaser", text: "Launch a new mandate workflow" },
  { href: "/deals/", label: "Open deal room", text: "Manage live mandates and documents" },
  { href: "/dashboard/lead-arranger/messages/", label: "Message counterparties", text: "Follow up with active recipients" },
  { href: "/dashboard/lead-arranger/notifications/", label: "Review alerts", text: "Check NDA, teaser, and access updates" },
];

export default function LeadArrangerDashboardPage() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userName, setUserName] = useState("Lead Arranger");
  const profileCompletion = 25;

  useEffect(() => {
    const { payload } = getStoredAuth();
    if (payload) {
      setUserName(payload.fullName?.split(" ")[0] || payload.email?.split("@")[0] || "Lead Arranger");
    }

    const profileComplete = localStorage.getItem("dl_profile_complete_lead_arranger");
    const popupDismissed = sessionStorage.getItem("dl_profile_popup_dismissed_lead_arranger");
    if (!profileComplete && !popupDismissed) {
      setShowProfilePopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowProfilePopup(false);
    sessionStorage.setItem("dl_profile_popup_dismissed_lead_arranger", "true");
  };

  return (
    <AppLayout>
      <div className="arranger-page">
        {showProfilePopup && (
          <div className="profile-popup-overlay">
            <div className="profile-popup">
              <button className="profile-popup-close" onClick={handleClosePopup}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h2 className="profile-popup-title">Complete Your Lead Arranger Profile</h2>
              <p className="profile-popup-desc">
                Finish your arranger profile before publishing teasers and managing live mandate distribution.
              </p>

              <div className="profile-popup-content">
                <div className="profile-popup-circle">
                  <svg viewBox="0 0 100 100" className="profile-progress-svg">
                    <circle cx="50" cy="50" r="40" className="progress-track" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="progress-fill"
                      strokeDasharray={`${profileCompletion * 2.51} 251`}
                    />
                  </svg>
                  <span className="profile-popup-percent">{profileCompletion}%</span>
                </div>

                <div className="profile-popup-right">
                  <p className="profile-popup-progress-text">
                    {userName}, complete all 4 steps to unlock teaser publishing and recipient workflows.
                  </p>

                  <div className="profile-popup-items">
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#549780" />
                          <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="profile-popup-item-label">Account Info</span>
                    </div>
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check profile-popup-item-pending-icon"></span>
                      <span className="profile-popup-item-label profile-popup-item-pending">Firm Information</span>
                    </div>
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check profile-popup-item-pending-icon"></span>
                      <span className="profile-popup-item-label profile-popup-item-pending">Mandate Coverage</span>
                    </div>
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check profile-popup-item-pending-icon"></span>
                      <span className="profile-popup-item-label profile-popup-item-pending">Credentials & Compliance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-popup-actions">
                <button className="profile-popup-btn-outline" onClick={handleClosePopup}>
                  Continue Anyway
                </button>
                <Link href="/dashboard/lead-arranger/profile/" className="profile-popup-btn-primary" onClick={() => setShowProfilePopup(false)}>
                  Complete Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        <section className="arranger-hero">
          <div className="arranger-hero-copy">
            <span className="arranger-kicker">Lead arranger workspace</span>
            <h1>Run origination, teaser distribution, and mandate control from one desk.</h1>
            <p>
              This dashboard is tailored for the stakeholder who creates deal supply:
              preparing teasers, choosing recipients, tracking interest, managing NDAs,
              and moving qualified parties into the data room.
            </p>
          </div>
          <div className="arranger-hero-panel">
            <div className="arranger-hero-badge">
              <span className="arranger-badge-dot" />
              Live mandate control
            </div>
            <div className="arranger-hero-grid">
              <div>
                <span className="arranger-hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
                    <rect x="3" y="7" width="18" height="13" rx="2.5" />
                    <path d="M3 12.5h18" />
                  </svg>
                </span>
                <strong>18</strong>
                <span>teasers shared</span>
              </div>
              <div>
                <span className="arranger-hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16H7.5A3.5 3.5 0 0 0 4 19.5V21" />
                    <circle cx="10" cy="9" r="3" />
                    <path d="M20 21v-1a3 3 0 0 0-2.2-2.9" />
                    <path d="M15.5 6.2a3 3 0 0 1 0 5.6" />
                  </svg>
                </span>
                <strong>31</strong>
                <span>qualified responses</span>
              </div>
              <div>
                <span className="arranger-hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3z" />
                    <path d="M9.5 12.5l1.8 1.8 3.7-4.1" />
                  </svg>
                </span>
                <strong>8</strong>
                <span>counterparties in data room</span>
              </div>
              <div>
                <span className="arranger-hero-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                </span>
                <strong>3</strong>
                <span>mandates closing this month</span>
              </div>
            </div>
            <div className="arranger-hero-actions">
              <Link href="/teasers/new/" className="btn btn-primary">
                Start new teaser
              </Link>
              <Link href="/dashboard/lead-arranger/deal-detail/" className="btn btn-secondary">
                View live deals
              </Link>
            </div>
          </div>
        </section>

        <section className="arranger-metrics">
          {topMetrics.map((metric) => (
            <article key={metric.label} className={`arranger-metric-card tone-${metric.tone}`}>
              <div className="arranger-metric-top">
                <div className="arranger-metric-icon">
                  {metricIcons[metric.icon]}
                </div>
                <button className="arranger-metric-menu" aria-label={`${metric.label} options`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.6" />
                    <circle cx="12" cy="12" r="1.6" />
                    <circle cx="12" cy="19" r="1.6" />
                  </svg>
                </button>
              </div>
              <span className="arranger-metric-label">{metric.label}</span>
              <div className="arranger-metric-bottom">
                <strong className="arranger-metric-value">{metric.value}</strong>
                <p>{metric.detail}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="arranger-main-grid">
          <div className="arranger-main-column">
            <article className="arranger-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Pipeline</span>
                  <h2>Mandate flow overview</h2>
                </div>
                <Link href="/deals/" className="arranger-inline-link">
                  View all deals
                </Link>
              </div>
              <div className="arranger-pipeline-list">
                {pipeline.map((item) => (
                  <div key={item.stage} className="arranger-pipeline-item">
                    <div className="arranger-pipeline-stage">
                      <span className="arranger-pipeline-count">{item.count}</span>
                      <div>
                        <h3>{item.stage}</h3>
                        <p>{item.note}</p>
                      </div>
                    </div>
                    <div className="arranger-pipeline-bar">
                      <span style={{ width: `${Math.max(item.count * 5, 18)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="arranger-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Execution queue</span>
                  <h2>Priority mandates</h2>
                </div>
                <Link href="/teasers/new/" className="arranger-inline-link">
                  Create teaser
                </Link>
              </div>
              <div className="arranger-mandate-list">
                {priorityMandates.map((mandate) => (
                  <div key={mandate.name} className="arranger-mandate-item">
                    <div className="arranger-mandate-meta">
                      <h3>{mandate.name}</h3>
                      <p>{mandate.stage}</p>
                    </div>
                    <div className="arranger-mandate-side">
                      <span>{mandate.recipients}</span>
                      <div className="arranger-mandate-progress">
                        <div style={{ width: `${mandate.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="arranger-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Recipient intelligence</span>
                  <h2>Shortlist candidates for the next share</h2>
                </div>
                <Link href="/dashboard/lead-arranger/recipient-selection/" className="arranger-inline-link">
                  Open selection
                </Link>
              </div>
              <div className="arranger-recipient-table">
                {recipients.map((recipient) => (
                  <div key={recipient.institution} className="arranger-recipient-row">
                    <div>
                      <h3>{recipient.institution}</h3>
                      <p>{recipient.fit}</p>
                    </div>
                    <span>{recipient.region}</span>
                    <strong>{recipient.status}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="arranger-side-column">
            <article className="arranger-card arranger-action-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Action center</span>
                  <h2>Core screens to implement</h2>
                </div>
              </div>
              <div className="arranger-action-list">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href} className="arranger-action-link">
                    <div>
                      <strong>{action.label}</strong>
                      <p>{action.text}</p>
                    </div>
                    <span>Open</span>
                  </Link>
                ))}
              </div>
            </article>

            <article className="arranger-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Readiness</span>
                  <h2>Teaser publishing checklist</h2>
                </div>
              </div>
              <ul className="arranger-checklist">
                <li className="complete">Basic deal details completed</li>
                <li className="complete">Business overview approved</li>
                <li className="complete">Indicative terms drafted</li>
                <li>Recipient list needs final segmentation</li>
                <li>NDA wording needs legal confirmation</li>
              </ul>
            </article>

            <article className="arranger-card">
              <div className="arranger-card-header">
                <div>
                  <span className="arranger-section-eyebrow">Activity</span>
                  <h2>Latest arranger events</h2>
                </div>
              </div>
              <div className="arranger-feed">
                {activityFeed.map((item) => (
                  <div key={`${item.title}-${item.time}`} className="arranger-feed-item">
                    <span className="arranger-feed-dot" />
                    <div>
                      <h3>{item.title}</h3>
                      <time>{item.time}</time>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
