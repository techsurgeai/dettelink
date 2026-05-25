"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function AIAnalysisPage() {
  const [activeTab, setActiveTab] = useState("key-financial-highlights");

  const tabs = [
    { id: "key-financial-highlights", label: "Key Financial Highlights" },
    { id: "financial-health", label: "Financial Health" },
    { id: "working-capital", label: "Working Capital" },
    { id: "liquidity", label: "Liquidity" },
    { id: "risk-analysis", label: "Risk Analysis" },
  ];

  return (
    <AppLayout>
      <div className="ai-analysis-page">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">AI Financial Analysis</h1>
          <p className="page-subtitle">Alex Manufacturing LTD</p>
          <p className="page-meta">Last Updated: 12 Jan 2026</p>
        </div>

        {/* Tabs */}
        <div className="analysis-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`analysis-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="analysis-content">
          {/* Key Financial Highlights Tab Content */}
          {activeTab === "key-financial-highlights" && (
          <div className="analysis-grid">
            <div className="analysis-left">
              <div className="analysis-card">
                <h2 className="card-title">Key Financial Highlights</h2>
                <div className="summary-text">
                  <p>AI identified steady revenue momentum, manageable leverage, and a liquidity profile that supports near-term operating needs with room for optimization.</p>
                </div>
              </div>

              <div className="analysis-card">
                <h3 className="card-title">Headline Metrics</h3>
                <div className="metrics-list">
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">Revenue Growth</span>
                    <span className="metric-badge metric-good">18.4%</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">EBITDA Margin</span>
                    <span className="metric-badge metric-good">21.6%</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">Net Debt / EBITDA</span>
                    <span className="metric-badge metric-watch">2.3x</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">Cash Conversion</span>
                    <span className="metric-badge metric-good">74%</span>
                  </div>
                </div>
              </div>

              <div className="charts-row">
                <div className="chart-box">
                  <div className="chart-box-header">
                    <h3>Working Capital</h3>
                    <span className="chart-period">Last 6 Months</span>
                  </div>
                  <div className="bar-chart-container">
                    <div className="bar-chart-y-axis">
                      <span>$4M</span>
                      <span>$3M</span>
                      <span>$2M</span>
                      <span>$1M</span>
                      <span>$0</span>
                    </div>
                    <div className="bar-chart-bars">
                      <div className="bar-item"><div className="bar" style={{ height: "30%" }}></div></div>
                      <div className="bar-item"><div className="bar" style={{ height: "45%" }}></div></div>
                      <div className="bar-item"><div className="bar" style={{ height: "35%" }}></div></div>
                      <div className="bar-item"><div className="bar" style={{ height: "65%" }}></div></div>
                      <div className="bar-item"><div className="bar" style={{ height: "55%" }}></div></div>
                      <div className="bar-item"><div className="bar" style={{ height: "90%" }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="chart-box">
                  <div className="chart-box-header">
                    <h3>Liquidity Ratio</h3>
                    <span className="chart-period">Last 6 Months</span>
                  </div>
                  <div className="line-chart-wrapper">
                    <div className="line-chart-y-axis">
                      <span>3</span>
                      <span>2.25</span>
                      <span>1.5</span>
                      <span>0.75</span>
                      <span>0</span>
                    </div>
                    <div className="line-chart-area">
                      <svg viewBox="0 0 300 160" preserveAspectRatio="none" className="line-chart-svg">
                        <defs>
                          <linearGradient id="keyHighlightsLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#549780" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#549780" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="10" x2="300" y2="10" stroke="#f0f0f0" strokeWidth="0.5" />
                        <line x1="0" y1="45" x2="300" y2="45" stroke="#f0f0f0" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="#f0f0f0" strokeWidth="0.5" />
                        <line x1="0" y1="115" x2="300" y2="115" stroke="#f0f0f0" strokeWidth="0.5" />
                        <line x1="0" y1="150" x2="300" y2="150" stroke="#f0f0f0" strokeWidth="0.5" />
                        <path
                          d="M10,57 C30,63 48,66 68,66 C88,66 106,65 126,64 C146,55 164,42 184,38 C204,28 222,16 242,15 C262,18 275,40 290,47 L290,150 L10,150 Z"
                          fill="url(#keyHighlightsLineGradient)"
                        />
                        <path
                          d="M10,57 C30,63 48,66 68,66 C88,66 106,65 126,64 C146,55 164,42 184,38 C204,28 222,16 242,15 C262,18 275,40 290,47"
                          fill="none"
                          stroke="#549780"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="10" cy="57" r="4" fill="#549780" />
                        <circle cx="68" cy="66" r="4" fill="#549780" />
                        <circle cx="126" cy="64" r="4" fill="#549780" />
                        <circle cx="184" cy="38" r="4" fill="#549780" />
                        <circle cx="242" cy="15" r="4" fill="#549780" />
                        <circle cx="290" cy="47" r="4" fill="#549780" />
                      </svg>
                      <div className="line-chart-x-axis">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>Mai</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="analysis-right">
              <div className="analysis-card">
                <h3 className="card-title">AI Highlights</h3>
                <div className="actions-list">
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Revenue trend remains positive across the latest reporting period.</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Operating margins are resilient but working capital remains the main improvement area.</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Current liquidity supports operations without signaling immediate distress.</span>
                  </div>
                </div>
              </div>

              <div className="analysis-card">
                <h3 className="card-title">Focus Areas</h3>
                <ul className="observation-list">
                  <li>Shorten receivable collection cycles</li>
                  <li>Preserve cash buffer ahead of expansion spend</li>
                  <li>Track debt capacity before adding long-term financing</li>
                  <li>Refresh uploaded statements for the next AI review</li>
                </ul>
              </div>

              <div className="chart-box risk-box">
                <h3 className="chart-box-title">Risk Rating</h3>
                <p className="risk-subtitle">Overall Assessment</p>
                <div className="risk-gauge-center">
                  <svg viewBox="0 0 200 120" className="risk-semicircle-svg">
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#549780"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray="88 252"
                    />
                  </svg>
                  <div className="risk-semicircle-value">35%</div>
                </div>
                <div className="risk-center-label">
                  <span className="risk-label-text">Low</span>
                  <span className="risk-label-desc">Strong Financial Position</span>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Financial Health Tab Content */}
          {activeTab === "financial-health" && (
          <div className="analysis-grid">
            {/* Left Column */}
            <div className="analysis-left">
              {/* Executive Summary */}
              <div className="analysis-card">
                <h2 className="card-title">Executive Summary</h2>
                <div className="summary-text">
                  <p>Your business shows stable liquidity position with moderate short-term funding pressure. AI recommends optimizing working capital cycles before pursuing long term debt financing.</p>
                </div>
              </div>

              {/* Key Signals */}
              <div className="analysis-card">
                <h3 className="card-title">Key Signals</h3>
                <div className="signals-list">
                  <div className="signal-item">
                    <span className="signal-icon signal-icon-bank">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                      </svg>
                    </span>
                    <span className="signal-label">Liquidity:</span>
                    <span className="signal-value signal-stable">Stable</span>
                  </div>
                  <div className="signal-item">
                    <span className="signal-icon signal-icon-warning">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </span>
                    <span className="signal-label">Risk Level:</span>
                    <span className="signal-badge signal-moderate">Moderate</span>
                  </div>
                  <div className="signal-item">
                    <span className="signal-icon signal-icon-chart">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="20" x2="12" y2="10" />
                        <line x1="18" y1="20" x2="18" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="16" />
                      </svg>
                    </span>
                    <span className="signal-label">Funding Readiness:</span>
                    <span className="signal-value signal-percent">72%</span>
                  </div>
                </div>
              </div>

              {/* Financial Trend Chart */}
              <div className="analysis-card">
                <div className="chart-header">
                  <h3 className="card-title">Financial Trend</h3>
                  <select className="chart-period-select">
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>Last 24 Months</option>
                  </select>
                </div>
                <div className="trend-chart">
                  <div className="chart-y-axis">
                    <span>25k</span>
                    <span>20K</span>
                    <span>15k</span>
                    <span>10k</span>
                    <span>5k</span>
                    <span>1k</span>
                    <span>0</span>
                  </div>
                  <div className="chart-area">
                    <svg viewBox="0 0 500 250" className="line-chart-svg" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2D8A6E" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#2D8A6E" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Smooth curved line - matches image data points */}
                      <path
                        d="M20,200 C50,205 70,210 100,215 C130,220 150,210 180,205 C220,195 260,120 320,70 C360,35 380,50 400,60 C430,75 460,110 480,130"
                        fill="none"
                        stroke="#2D8A6E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Gradient fill under curve */}
                      <path
                        d="M20,200 C50,205 70,210 100,215 C130,220 150,210 180,205 C220,195 260,120 320,70 C360,35 380,50 400,60 C430,75 460,110 480,130 L480,250 L20,250 Z"
                        fill="url(#chartGradient)"
                      />
                      {/* Data points - positioned at curve endpoints */}
                      <circle cx="20" cy="200" r="5" fill="#2D8A6E" />
                      <circle cx="100" cy="215" r="5" fill="#2D8A6E" />
                      <circle cx="180" cy="205" r="5" fill="#2D8A6E" />
                      <circle cx="320" cy="70" r="5" fill="#2D8A6E" />
                      <circle cx="400" cy="60" r="5" fill="#2D8A6E" />
                      <circle cx="480" cy="130" r="5" fill="#2D8A6E" />
                    </svg>
                  </div>
                </div>
                <div className="chart-x-axis">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>Mai</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="analysis-right">
              {/* Recommended Actions */}
              <div className="analysis-card">
                <h3 className="card-title">Next Recommended Actions</h3>
                <div className="actions-list">
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Upload Updated Bank Statements</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Schedule Advisory Version</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Improve Receivable Cycle</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-full">Schedule Consultation</button>
              </div>

              {/* Executive Summary Metrics */}
              <div className="analysis-card">
                <h3 className="card-title">Executive Summary</h3>
                <div className="metrics-list">
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">Revenue Growth</span>
                    <span className="metric-badge metric-good">Good</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">EBITDA Margin</span>
                    <span className="metric-badge metric-watch">Watch</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-icon">&#62;</span>
                    <span className="metric-label">Cash Position</span>
                    <span className="metric-badge metric-risk">Risk</span>
                  </div>
                </div>
              </div>

              {/* FAQ Accordions */}
              <div className="analysis-card">
                <div className="faq-item">
                  <span className="faq-icon">&#62;</span>
                  <span>Why this matters?</span>
                </div>
                <div className="faq-item">
                  <span className="faq-icon">&#62;</span>
                  <span>What AI observed?</span>
                </div>
                <div className="faq-item">
                  <span className="faq-icon">&#62;</span>
                  <span>What you should do next?</span>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Risk Analysis Tab Content */}
          {activeTab === "risk-analysis" && (
          <div className="risk-analysis-content">
            {/* Risk Score Header - 3 Column Layout */}
            <div className="risk-score-header">
              {/* Overall Risk Score */}
              <div className="analysis-card risk-score-box">
                <h3 className="card-title">Overall Risk Score</h3>
                <div className="risk-score-value">35%</div>
                <p className="risk-score-desc">Lower Score indicates lower financial risk</p>
              </div>

              {/* Risk Gauge */}
              <div className="analysis-card risk-gauge-box">
                <div className="risk-gauge-center">
                  <svg viewBox="0 0 200 120" className="risk-semicircle-svg">
                    {/* Background arc */}
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />
                    {/* Filled arc (35%) */}
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#2D8A6E"
                      strokeWidth="24"
                      strokeLinecap="round"
                      strokeDasharray="88 252"
                    />
                  </svg>
                  <div className="risk-semicircle-value">35%</div>
                </div>
                <div className="risk-center-label">
                  <span className="risk-label-text">Low</span>
                  <span className="risk-label-desc">Strong Financial Position</span>
                </div>
              </div>

              {/* Risk Description */}
              <div className="analysis-card risk-desc-box">
                <p className="risk-description-text">Your business shows stable liquidity position with moderate short-term funding pressure. AI recommends optimizing working capital cycles before pursuing long term debt financing.</p>
              </div>
            </div>

            {/* Risk Factors Grid */}
              <div className="risk-factors-grid">
                <div className="analysis-card risk-factor-card">
                  <h3 className="risk-factor-title">Operational Risk</h3>
                  <div className="risk-factor-row">
                    <span className="risk-factor-badge risk-low">Low</span>
                    <span className="risk-factor-percent">20%</span>
                  </div>
                  <div className="risk-factor-bar">
                    <div className="risk-factor-fill risk-fill-green" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div className="analysis-card risk-factor-card">
                  <h3 className="risk-factor-title">Market Risk</h3>
                  <div className="risk-factor-row">
                    <span className="risk-factor-badge risk-low">Low</span>
                    <span className="risk-factor-percent">20%</span>
                  </div>
                  <div className="risk-factor-bar">
                    <div className="risk-factor-fill risk-fill-green" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div className="analysis-card risk-factor-card">
                  <h3 className="risk-factor-title">Credit Risk</h3>
                  <div className="risk-factor-row">
                    <span className="risk-factor-badge risk-moderate">Medium</span>
                    <span className="risk-factor-percent">20%</span>
                  </div>
                  <div className="risk-factor-bar">
                    <div className="risk-factor-fill risk-fill-yellow" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>

              {/* AI Observation & Recommended Actions Grid */}
              <div className="observation-actions-grid">
                {/* AI Observation */}
                <div className="analysis-card">
                  <h3 className="card-title">AI Observation</h3>
                  <ul className="observation-list">
                    <li>Supplier dependency is moderately high</li>
                    <li>Receivable cycle impacts liquidity</li>
                    <li>Company has overall lower financial Risk</li>
                    <li>Company has overall lower financial Risk</li>
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div className="analysis-card">
                  <h3 className="card-title">Recommended Actions</h3>
                  <div className="actions-list">
                    <div className="action-item">
                      <span className="action-check">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                          <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Maintain minimum cash buffer</span>
                    </div>
                    <div className="action-item">
                      <span className="action-check">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                          <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Renegotiate supplier payment terms</span>
                    </div>
                    <div className="action-item">
                      <span className="action-check">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                          <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Improve Receivable collections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Working Capital Tab Content */}
          {activeTab === "working-capital" && (
          <div className="analysis-grid">
            {/* Left Column */}
            <div className="analysis-left">
              {/* Working Capital Overview Chart */}
              <div className="analysis-card">
                <div className="chart-header">
                  <h3 className="card-title">Working Capital Overview</h3>
                  <select className="chart-period-select">
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                  </select>
                </div>
                <div className="stacked-bar-chart">
                  <div className="stacked-chart-y-axis">
                    <span>320k</span>
                    <span>240k</span>
                    <span>160k</span>
                    <span>80k</span>
                    <span>0k</span>
                  </div>
                  <div className="stacked-chart-area">
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '25%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '10%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Jul</span>
                    </div>
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '55%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '15%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Aug</span>
                    </div>
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '70%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '20%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Sep</span>
                    </div>
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '85%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '15%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Oct</span>
                    </div>
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '50%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '15%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Nov</span>
                    </div>
                    <div className="stacked-bar-group">
                      <div className="stacked-bar">
                        <div className="stacked-segment segment-dark" style={{ height: '35%' }}></div>
                        <div className="stacked-segment segment-light" style={{ height: '15%' }}></div>
                      </div>
                      <span className="stacked-bar-label">Dec</span>
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <span className="legend-item"><span className="legend-dot legend-dark"></span> Jul</span>
                  <span className="legend-item"><span className="legend-dot legend-light"></span> Jul</span>
                </div>
              </div>

              {/* AI Insights */}
              <div className="analysis-card">
                <h3 className="card-title">AI Insights</h3>
                <p className="insight-text">Your receivable cycle is longer than industry benchmarks by 18 days</p>
                <button className="btn btn-outline">Improve Cash Cycle</button>
              </div>
            </div>

            {/* Right Column */}
            <div className="analysis-right">
              {/* Next Recommended Actions */}
              <div className="analysis-card">
                <h3 className="card-title">Next Recommended Actions</h3>
                <div className="actions-list">
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Upload Updated Bank Statements</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Schedule Advisory Version</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Improve Receivable Cycle</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-full">Schedule Consultation</button>
              </div>
            </div>
          </div>
          )}

          {/* Liquidity Tab Content */}
          {activeTab === "liquidity" && (
          <div className="liquidity-content">
            {/* Top Row - 3 Cards */}
            <div className="liquidity-top-row">
              {/* Liquidity Ratio Card */}
              <div className="analysis-card liquidity-ratio-card">
                <h3 className="card-title">Liquidity Ratio</h3>
                <div className="liquidity-ratio-value">2.1</div>
                <p className="liquidity-ratio-desc">Current Ratio is health</p>
              </div>

              {/* Healthy Status Card */}
              <div className="analysis-card liquidity-status-card">
                <div className="liquidity-gauge-container">
                  <svg viewBox="0 0 120 70" className="liquidity-gauge-svg">
                    {/* Background arc (light green) */}
                    <path
                      d="M 15,60 A 45,45 0 0,1 105,60"
                      fill="none"
                      stroke="#C4D9D2"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Filled arc (dark green - about 70%) */}
                    <path
                      d="M 15,60 A 45,45 0 0,1 85,20"
                      fill="none"
                      stroke="#2D8A6E"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="liquidity-gauge-text">
                    <span className="liquidity-gauge-value">2.1</span>
                    <span className="liquidity-gauge-label">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="analysis-card liquidity-desc-card">
                <p className="liquidity-description">Your business shows stable liquidity position with moderate short-term funding pressure. AI recommends optimizing working capital cycles before pursuing long term debt financing.</p>
              </div>
            </div>

            {/* Liquidity Trend Chart */}
            <div className="analysis-card liquidity-trend-card">
              <div className="chart-header">
                <h3 className="card-title">Liquidity Trend</h3>
                <select className="chart-period-select">
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
              <div className="liquidity-line-chart">
                <div className="liquidity-chart-y-axis">
                  <span>25k</span>
                  <span>20K</span>
                  <span>15k</span>
                  <span>10k</span>
                  <span>5k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>
                <div className="liquidity-chart-area">
                  <div className="liquidity-chart-wrapper">
                    <svg viewBox="0 0 100 100" className="liquidity-line-svg" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="liquidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2D8A6E" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#2D8A6E" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Gradient fill under curve */}
                      <path
                        d="M0,85 C8,83 16,80 20,78 C28,75 36,72 40,68 C52,40 64,25 72,20 C80,32 84,38 88,36 C94,40 97,44 100,42 L100,100 L0,100 Z"
                        fill="url(#liquidityGradient)"
                      />
                      {/* Line */}
                      <path
                        d="M0,85 C8,83 16,80 20,78 C28,75 36,72 40,68 C52,40 64,25 72,20 C80,32 84,38 88,36 C94,40 97,44 100,42"
                        fill="none"
                        stroke="#2D8A6E"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Data points as CSS circles */}
                    <div className="chart-dot" style={{ left: '0%', top: '85%' }}></div>
                    <div className="chart-dot" style={{ left: '20%', top: '78%' }}></div>
                    <div className="chart-dot" style={{ left: '40%', top: '68%' }}></div>
                    <div className="chart-dot" style={{ left: '72%', top: '20%' }}></div>
                    <div className="chart-dot" style={{ left: '88%', top: '36%' }}></div>
                    <div className="chart-dot" style={{ left: '100%', top: '42%' }}></div>
                  </div>
                  <div className="liquidity-chart-x-axis">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mai</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - AI Observation & Recommended Actions */}
            <div className="liquidity-bottom-row">
              {/* AI Observation */}
              <div className="analysis-card">
                <h3 className="card-title">AI Observation</h3>
                <ul className="observation-list">
                  <li>Supplier dependency is moderately high</li>
                  <li>Receivable cycle impacts liquidity</li>
                  <li>Company has overall lower financial Risk</li>
                  <li>Company has overall lower financial Risk</li>
                </ul>
              </div>

              {/* Recommended Actions */}
              <div className="analysis-card">
                <h3 className="card-title">Recommended Actions</h3>
                <div className="actions-list">
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Maintain minimum cash buffer</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Renegotiate supplier payment terms</span>
                  </div>
                  <div className="action-item">
                    <span className="action-check">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2D8A6E" />
                        <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Improve Receivable collections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Bottom CTA */}
          <div className="analysis-cta">
            <h3>Questions about this analysis?</h3>
            <div className="cta-buttons">
              <button className="btn btn-primary">Discuss with Advisor</button>
              <button className="btn btn-secondary">Request Re-Analysis</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
