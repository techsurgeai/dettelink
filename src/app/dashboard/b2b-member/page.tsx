"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout";
import { getStoredAuth } from "../../../lib/auth";

const kpis = [
  { label: "New Teasers", value: "08", note: "3 need first review today" },
  { label: "NDA Pending", value: "02", note: "1 awaiting signatory approval" },
  { label: "Live Data Rooms", value: "03", note: "2 updated in the last 24 hours" },
  { label: "Unread Deal Messages", value: "05", note: "Across 3 active mandates" },
];

const pipelineStages = [
  { label: "New", value: 8, tone: "green" },
  { label: "Interested", value: 5, tone: "blue" },
  { label: "NDA", value: 2, tone: "gray" },
  { label: "Data Room", value: 3, tone: "gold" },
];

const opportunities = [
  {
    title: "Falcon Energy Refinancing",
    arranger: "BlankDesigns Capital",
    stage: "NDA Review",
    nextStep: "Sign NDA",
    updated: "12 minutes ago",
    href: "/dashboard/b2b-member/teasers/received/nda/",
  },
  {
    title: "BlueHarbor Port Expansion",
    arranger: "Harborline Partners",
    stage: "Data Room Open",
    nextStep: "Review updated process letter",
    updated: "Today, 9:10 AM",
    href: "/dashboard/b2b-member/teasers/received/data-room/",
  },
  {
    title: "Atlas Logistics Growth Facility",
    arranger: "North Gate Advisory",
    stage: "Teaser Review",
    nextStep: "Open teaser",
    updated: "Today, 8:35 AM",
    href: "/dashboard/b2b-member/teasers/received/",
  },
];

const urgentActions = [
  {
    title: "Falcon Energy NDA ready for signature",
    detail: "Confidential access is blocked until your authorized signatory accepts the terms.",
    href: "/dashboard/b2b-member/teasers/received/nda/",
    cta: "Review NDA",
  },
  {
    title: "BlueHarbor uploaded revised diligence pack",
    detail: "A new process letter and management materials were posted in the room.",
    href: "/dashboard/b2b-member/teasers/received/data-room/",
    cta: "Open data room",
  },
  {
    title: "2 unread arranger messages",
    detail: "Process clarifications are waiting in your deal-specific message threads.",
    href: "/dashboard/b2b-member/deal-messages/",
    cta: "Open messages",
  },
];

const activityFeed = [
  {
    title: "Falcon Energy moved into NDA stage",
    meta: "BlankDesigns Capital • 12 minutes ago",
    detail: "Your expression of interest was accepted and the confidentiality package is now live.",
  },
  {
    title: "BlueHarbor data room updated",
    meta: "Harborline Partners • 1 hour ago",
    detail: "The arranger uploaded a revised process note and refreshed management presentation.",
  },
  {
    title: "Atlas Logistics call windows shared",
    meta: "North Gate Advisory • Today, 9:10 AM",
    detail: "Shortlisted recipients can now coordinate management Q&A availability for next week.",
  },
];

export default function B2BMemberDashboardPage() {
  const [userName, setUserName] = useState("Member");
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const { payload } = getStoredAuth();
    if (payload) {
      setUserName(payload.fullName?.split(" ")[0] || payload.email?.split("@")[0] || "Member");
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const stageMax = Math.max(...pipelineStages.map((stage) => stage.value));

  return (
    <AppLayout>
      <div className="dashboard-page b2b-ops-dashboard">
        <div className="dashboard-greeting b2b-ops-header">
          <div>
            <h1>
              {greeting}, {userName}
            </h1>
            <p className="teaser-inbox-subtitle">
              Track mandate movement, clear blockers, and return to the next deal action quickly.
            </p>
          </div>
          <Link href="/dashboard/b2b-member/opportunities/" className="btn btn-primary arranger-green-btn">
            View My Opportunities
          </Link>
        </div>

        <section className="b2b-kpi-strip">
          {kpis.map((item) => (
            <article key={item.label} className="b2b-kpi-card">
              <span className="b2b-kpi-label">{item.label}</span>
              <strong className="b2b-kpi-value">{item.value}</strong>
              <span className="b2b-kpi-note">{item.note}</span>
            </article>
          ))}
        </section>

        <section className="b2b-ops-grid">
          <div className="b2b-ops-main">
            <article className="b2b-panel">
              <div className="b2b-panel-header">
                <h2>Pipeline Stage Distribution</h2>
                <span className="b2b-panel-caption">Active mandates by current workflow step</span>
              </div>

              <div className="b2b-stage-chart">
                {pipelineStages.map((stage) => (
                  <div key={stage.label} className="b2b-stage-row">
                    <div className="b2b-stage-meta">
                      <span className="b2b-stage-label">{stage.label}</span>
                      <strong className="b2b-stage-count">{stage.value}</strong>
                    </div>
                    <div className="b2b-stage-bar-track">
                      <div
                        className={`b2b-stage-bar tone-${stage.tone}`}
                        style={{ width: `${(stage.value / stageMax) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="b2b-panel">
              <div className="b2b-panel-header">
                <h2>Active Opportunities</h2>
                <span className="b2b-panel-caption">Prioritized deals already inside your workflow</span>
              </div>

              <div className="b2b-opportunities-table-wrap">
                <table className="b2b-opportunities-table">
                  <thead>
                    <tr>
                      <th>Deal</th>
                      <th>Lead Arranger</th>
                      <th>Stage</th>
                      <th>Next Step</th>
                      <th>Updated</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map((item) => (
                      <tr key={item.title}>
                        <td>
                          <strong>{item.title}</strong>
                        </td>
                        <td>{item.arranger}</td>
                        <td>
                          <span className={`badge ${item.stage === "Data Room Open" ? "badge-green" : item.stage === "NDA Review" ? "badge-gray" : "badge-yellow"}`}>
                            {item.stage}
                          </span>
                        </td>
                        <td>{item.nextStep}</td>
                        <td>{item.updated}</td>
                        <td>
                          <Link href={item.href} className="b2b-table-link">
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="b2b-ops-side">
            <article className="b2b-panel">
              <div className="b2b-panel-header">
                <h2>Urgent Actions</h2>
                <span className="b2b-panel-caption">Items blocking progress right now</span>
              </div>

              <div className="b2b-urgent-list">
                {urgentActions.map((item) => (
                  <div key={item.title} className="b2b-urgent-item">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <Link href={item.href} className="b2b-urgent-link">
                      {item.cta}
                    </Link>
                  </div>
                ))}
              </div>
            </article>

            <article className="b2b-panel">
              <div className="b2b-panel-header">
                <h2>Recent Activity</h2>
                <span className="b2b-panel-caption">What changed since your last visit</span>
              </div>

              <div className="b2b-activity-feed">
                {activityFeed.map((item) => (
                  <div key={item.title} className="b2b-activity-item">
                    <span className="b2b-activity-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <span className="b2b-activity-meta">{item.meta}</span>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
