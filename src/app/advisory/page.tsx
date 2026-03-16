"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import Link from "next/link";

export default function AdvisorySessionsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingSessions = [
    {
      id: 1,
      advisor: "Sarah Lewade",
      role: "Financial Analyst",
      date: "Fri, April 20",
      time: "2:00 PM",
      type: "Video Call",
      status: "Upcoming",
      topics: ["Working Capital Review", "Financing Options Discussion", "Financing Options Discussion"],
    },
    {
      id: 2,
      advisor: "Sarah Lewade",
      role: "Financial Analyst",
      date: "Fri, April 20",
      time: "2:00 PM",
      type: "Video Call",
      status: "Today",
      topics: ["Working Capital Review", "Financing Options Discussion", "Financing Options Discussion"],
    },
    {
      id: 3,
      advisor: "Sarah Lewade",
      role: "Financial Analyst",
      date: "Fri, April 20",
      time: "2:00 PM",
      type: "Video Call",
      status: "Upcoming",
      topics: ["Working Capital Review", "Financing Options Discussion", "Financing Options Discussion"],
    },
  ];

  const pastSessions = [
    {
      id: 1,
      advisor: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      date: "Fri, April 20",
      time: "3:00 PM",
      type: "Video Call",
      status: "Yesterday",
      topics: ["Working Capital Review", "Financing Options Discussion", "Financing Options Discussion"],
    },
    {
      id: 2,
      advisor: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      date: "Wed, April 10",
      time: "3:00 PM",
      type: "Video Call",
      status: "Yesterday",
      topics: ["Working Capital Review", "Financing Options Discussion", "Financing Options Discussion"],
    },
  ];

  const sessions = activeTab === "upcoming" ? upcomingSessions : pastSessions;

  return (
    <AppLayout>
      <div className="advisory-page">
        {/* Header */}
        <div className="advisory-header">
          <div className="advisory-header-left">
            <h1 className="page-title">Advisory Session</h1>
            <p className="page-subtitle">Your scheduled consultations & financial discussions</p>
          </div>
          <Link href="/advisory/schedule" className="btn btn-outline-green">
            + Schedule New Session
          </Link>
        </div>

        {/* Tabs */}
        <div className="advisory-tabs">
          <button
            className={`advisory-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`advisory-tab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>

        {/* Content Grid */}
        <div className={`advisory-content ${activeTab === "past" ? "advisory-content-full" : ""}`}>
          {/* Sessions List */}
          <div className={`sessions-list ${activeTab === "past" ? "sessions-list-grid" : ""}`}>
            {sessions.map((session) => (
              <div key={session.id} className="session-card">
                <div className="session-header">
                  <div className="session-advisor">
                    <div className="advisor-avatar">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt={session.advisor} />
                    </div>
                    <div className="advisor-info">
                      <h4 className="advisor-name">{session.advisor}</h4>
                      <p className="advisor-role">{session.role}</p>
                    </div>
                  </div>
                  <span className={`session-status status-${session.status.toLowerCase()}`}>
                    {session.status}
                  </span>
                </div>

                <div className="session-details">
                  <div className="session-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{session.date}</span>
                  </div>
                  <div className="session-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    <span>{session.time}</span>
                  </div>
                  <div className="session-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23,7 16,12 23,17 23,7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    <span>{session.type}</span>
                  </div>
                </div>

                <div className="session-topics">
                  {session.topics.map((topic, index) => (
                    <div key={index} className="topic-item">
                      <span className="topic-arrow">&#62;</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <div className="session-actions session-actions-full">
                  <button className="btn btn-primary btn-full">View Details</button>
                  {activeTab === "upcoming" && (
                    <button className="btn btn-secondary btn-full">Reschedule</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Prepare for Session */}
          {activeTab === "upcoming" && (
            <div className="advisory-sidebar">
              <div className="prepare-card">
                <h3>Prepare for your session</h3>
                <div className="prepare-list">
                  <div className="prepare-item">
                    <span className="prepare-check done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </span>
                    <span>Upload Latest Financials</span>
                  </div>
                  <div className="prepare-item">
                    <span className="prepare-check done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </span>
                    <span>Review AI Report</span>
                  </div>
                  <div className="prepare-item">
                    <span className="prepare-check done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </span>
                    <span>Prepare Questions</span>
                  </div>
                  <div className="prepare-item">
                    <span className="prepare-check done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </span>
                    <span>Prepare Questions</span>
                  </div>
                </div>
                <button className="btn btn-green btn-full">Upload Documents</button>
                <button className="btn btn-outline-green btn-full">View AI Analysis</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
