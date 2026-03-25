"use client";

import { useState } from "react";
import AppLayout from "../../../../components/AppLayout";

export default function LeadArrangerSettingsPage() {
  const [activeTab, setActiveTab] = useState("firm");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);

  const tabs = [
    { id: "firm", label: "Firm Settings" },
    { id: "workflow", label: "Workflow" },
    { id: "security", label: "Security" },
  ];

  return (
    <AppLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1 className="page-title">Lead Arranger Settings</h1>
          <p className="page-subtitle">Manage arranger preferences, approval workflow, and account security.</p>
        </div>

        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "firm" ? (
            <div className="settings-card">
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Firm Name</label>
                  <input type="text" className="form-input" defaultValue="Dettelinks Capital Partners" />
                </div>
                <div className="form-group">
                  <label className="form-label">Compliance Contact</label>
                  <input type="text" className="form-input" defaultValue="compliance@dettelinks.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Geography</label>
                  <input type="text" className="form-input" defaultValue="GCC" />
                </div>
                <div className="form-group">
                  <label className="form-label">Default Product Focus</label>
                  <input type="text" className="form-input" defaultValue="Senior Debt" />
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "workflow" ? (
            <div className="settings-card">
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Default Teaser Visibility</label>
                  <input type="text" className="form-input" defaultValue="Invite only" />
                </div>
                <div className="form-group">
                  <label className="form-label">Recipient Approval Rule</label>
                  <input type="text" className="form-input" defaultValue="Compliance review required" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Alerts</label>
                  <button className="btn btn-secondary" onClick={() => setEmailAlertsEnabled((value) => !value)}>
                    {emailAlertsEnabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "security" ? (
            <div className="settings-card">
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Two-Factor Authentication</label>
                  <button className="btn btn-secondary" onClick={() => setTwoFactorEnabled((value) => !value)}>
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
                <div className="form-group">
                  <label className="form-label">Session Policy</label>
                  <input type="text" className="form-input" defaultValue="Auto logout after 30 minutes of inactivity" />
                </div>
                <div className="form-group">
                  <label className="form-label">Approval Access</label>
                  <input type="text" className="form-input" defaultValue="Lead arranger + compliance approver" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
