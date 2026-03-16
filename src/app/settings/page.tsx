"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [fullName, setFullName] = useState("Andrew Sabastian");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "business", label: "Business Info" },
    { id: "security", label: "Security" },
  ];

  return (
    <AppLayout>
      <div className="settings-page">
        {/* Header */}
        <div className="settings-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Your scheduled consultations & financial discussions</p>
        </div>

        {/* Tabs */}
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

        {/* Content */}
        <div className="settings-content">
          {activeTab === "personal" && (
            <div className="settings-card">
              {/* Profile Avatar */}
              <div className="settings-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
              </div>

              {/* Form Grid */}
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input email-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <div className="select-wrapper">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="analyst">Analyst</option>
                      <option value="client">Client</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <div className="select-wrapper">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select a Country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="in">India</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="settings-card">
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    placeholder="Enter Business Name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Business Type</label>
                  <div className="select-wrapper">
                    <select className="form-select">
                      <option value="">Select Type</option>
                      <option value="sole-proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="nonprofit">Non-Profit</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <div className="select-wrapper">
                    <select className="form-select">
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="services">Services</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Years in Operation</label>
                  <div className="select-wrapper">
                    <select className="form-select">
                      <option value="">Select Years</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-20">11-20 years</option>
                      <option value="21-50">21-50 years</option>
                      <option value="50+">50+ years</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">No of Employees</label>
                  <div className="select-wrapper">
                    <select className="form-select">
                      <option value="">Select Range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Revenue Range</label>
                  <div className="select-wrapper">
                    <select className="form-select">
                      <option value="">Select Range</option>
                      <option value="<100K">&lt;100K</option>
                      <option value="100K-500K">100K-500K</option>
                      <option value="500K-1M">500K-1M</option>
                      <option value="1M-5M">1M-5M</option>
                      <option value="5M-10M">5M-10M</option>
                      <option value="10M+">10M+</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-card">
              <div className="security-grid">
                {/* Change Password Section */}
                <div className="security-section">
                  <div className="security-section-header">
                    <svg className="security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <h3 className="security-section-title">Change Password</h3>
                  </div>
                  <div className="security-form">
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        placeholder="8+ Characters"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        placeholder="8+ Characters"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Additional Security Layer Section */}
                <div className="security-section">
                  <div className="security-section-header">
                    <svg className="security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <h3 className="security-section-title">Add Additional Security Layer</h3>
                  </div>
                  <div className="security-toggle-row">
                    <span className="security-toggle-label">Setup Two Factor Authentication</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="settings-footer">
          <button className="btn btn-outline-gray">Edit</button>
          <button className="btn btn-green-muted">Save</button>
        </div>
      </div>
    </AppLayout>
  );
}
