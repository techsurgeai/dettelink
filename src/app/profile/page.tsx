"use client";

import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";

export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const [profileCompletion, setProfileCompletion] = useState(60);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [formData, setFormData] = useState({
    // Account Information
    fullName: "Andrew Sabastian",
    email: "johndoe@gmail.com",
    role: "",
    country: "",
    password: "",
    // Business Overview
    businessName: "",
    businessType: "",
    industry: "",
    yearsInOperation: "50",
    noOfEmployees: "1-10",
    annualRevenueRange: "<100K",
    // Funding Intent (Step 2)
    purposeOfFunding: "",
    preferredFundingType: "",
    targetFundingAmount: "",
    useOfFunds: "",
    fundingTimeline: "",
    // Financial Overview (Step 3)
    currentRevenue: "",
    monthlyExpenses: "",
    profitMargin: "",
    totalAssets: "",
    totalLiabilities: "",
    cashFlow: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("dl_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setFormData(prev => ({
          ...prev,
          fullName: payload.fullName || prev.fullName,
          email: payload.email || prev.email,
        }));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setProfileCompletion(Math.min(profileCompletion + 20, 100));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  const handleCompleteProfile = () => {
    setIsProfileSaved(true);
    setProfileCompletion(100);
  };

  const handleEditProfile = () => {
    setIsProfileSaved(false);
    setStep(1);
  };

  return (
    <AppLayout>
      <div className="profile-page">
        <h1 className="page-title">My Profile</h1>

        {/* Profile Card Container */}
        <div className="profile-card-container">
          <div className="profile-header-card">
            <div className="profile-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
            </div>
            <h2 className="profile-name">
              {formData.fullName}
              <span className="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#fff"/>
                  <path d="M9 12l2 2 4-4" stroke="#2D8A6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h2>
            <p className="profile-role">Founder at Trello</p>
            <div className="profile-completion">
              <div className="completion-header">
                <span className="completion-label">Complete Your Profile</span>
                <span className="completion-percent-badge">{profileCompletion}%</span>
              </div>
              <div className="completion-bar">
                <div className="completion-bar-fill" style={{ width: `${profileCompletion}%` }}></div>
              </div>
            </div>
            {isProfileSaved && (
              <button className="btn-edit-profile" onClick={handleEditProfile}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="profile-form-container">
          {!isProfileSaved && (
            <>
              {/* Step Indicator */}
              <div className="step-indicator">
                <span className="step-text">Step {step} of 3</span>
                <div className="step-progress">
                  <div className={`step-bar ${step >= 1 ? 'active' : ''}`}></div>
                  <div className={`step-bar ${step >= 2 ? 'active' : ''}`}></div>
                  <div className={`step-bar ${step >= 3 ? 'active' : ''}`}></div>
                </div>
              </div>
            </>
          )}

          {/* Saved Profile View */}
          {isProfileSaved && (
            <>
              {/* Account Information & Business Overview */}
              <div className="profile-form-grid">
                <div className="profile-section">
                  <h3 className="section-title">Account Information</h3>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" value={formData.fullName} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input input-highlight" value={formData.email} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-input" value={formData.role || "Select Role"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-input" value={formData.country || "Select a Country"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-input" value="********" readOnly />
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="section-title">Business Overview</h3>
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input type="text" className="form-input" value={formData.businessName || "Enter Business Name"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Type</label>
                    <input type="text" className="form-input" value={formData.businessType || "Select Type"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <input type="text" className="form-input" value={formData.industry || "Select Industry"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Years in Operation</label>
                    <input type="text" className="form-input" value={formData.yearsInOperation} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">No of Employees</label>
                    <input type="text" className="form-input" value={formData.noOfEmployees} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Annual Revenue Range</label>
                    <input type="text" className="form-input" value={formData.annualRevenueRange} readOnly />
                  </div>
                </div>
              </div>

              {/* Funding Intent */}
              <h3 className="section-title" style={{ marginTop: '32px' }}>Funding Intent</h3>
              <div className="profile-form-grid">
                <div className="profile-section">
                  <div className="form-group">
                    <label className="form-label">Purpose of Funding</label>
                    <input type="text" className="form-input" value={formData.purposeOfFunding || "Working Capital"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Funding Type</label>
                    <input type="text" className="form-input" value={formData.preferredFundingType || "Equity"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Funding Amount</label>
                    <input type="text" className="form-input" value={formData.targetFundingAmount || "Input in local currency"} readOnly />
                  </div>
                </div>

                <div className="profile-section">
                  <div className="form-group">
                    <label className="form-label">Purpose of Funding</label>
                    <input type="text" className="form-input" value={formData.useOfFunds || "Working Capital"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Funding Timeline</label>
                    <input type="text" className="form-input" value={formData.fundingTimeline || "3-6 months"} readOnly />
                  </div>
                </div>
              </div>

              {/* Financial Overview */}
              <h3 className="section-title" style={{ marginTop: '32px' }}>Financial Overview</h3>
              <div className="profile-form-grid">
                <div className="profile-section">
                  <div className="form-group">
                    <label className="form-label">Annual Revenue (Last FY)</label>
                    <input type="text" className="form-input" value={formData.currentRevenue || "$1"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Monthly Average Revenue</label>
                    <input type="text" className="form-input" value={formData.monthlyExpenses || "$1"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Operating Expenses</label>
                    <input type="text" className="form-input" value={formData.profitMargin || "$1"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Net Profit / Loss</label>
                    <input type="text" className="form-input" value="$1" readOnly />
                  </div>
                </div>

                <div className="profile-section">
                  <div className="form-group">
                    <label className="form-label">Cash & Bank Balance</label>
                    <input type="text" className="form-input" value={formData.totalAssets || "$1"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short-Term Liabilities</label>
                    <input type="text" className="form-input" value={formData.totalLiabilities || "Enter OD Memo"} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short-Term Liabilities</label>
                    <input type="text" className="form-input" value={formData.cashFlow || "$1"} readOnly />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 1: Account Information & Business Overview */}
          {!isProfileSaved && step === 1 && (
            <div className="profile-form-grid">
              {/* Account Information */}
              <div className="profile-section">
              <h3 className="section-title">Account Information</h3>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input input-highlight"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="founder">Founder / CEO</option>
                  <option value="cfo">CFO / Finance Director</option>
                  <option value="investor">Investor</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <select
                  className="form-input"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="">Select a Country</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="8+ Characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Business Overview */}
            <div className="profile-section">
              <h3 className="section-title">Business Overview</h3>

              <div className="form-group">
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Business Type</label>
                <select
                  className="form-input"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="startup">Startup</option>
                  <option value="sme">SME</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Industry</label>
                <select
                  className="form-input"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Years in Operation</label>
                <select
                  className="form-input"
                  value={formData.yearsInOperation}
                  onChange={(e) => setFormData({ ...formData, yearsInOperation: e.target.value })}
                >
                  <option value="<1">Less than 1 year</option>
                  <option value="1-5">1-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="50">50+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">No of Employees</label>
                <select
                  className="form-input"
                  value={formData.noOfEmployees}
                  onChange={(e) => setFormData({ ...formData, noOfEmployees: e.target.value })}
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Annual Revenue Range</label>
                <select
                  className="form-input"
                  value={formData.annualRevenueRange}
                  onChange={(e) => setFormData({ ...formData, annualRevenueRange: e.target.value })}
                >
                  <option value="<100K">&lt;100K</option>
                  <option value="100K-500K">100K-500K</option>
                  <option value="500K-1M">500K-1M</option>
                  <option value="1M+">1M+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Funding Intent */}
        {!isProfileSaved && step === 2 && (
          <>
            <h3 className="section-title">Funding Intent</h3>
            <div className="profile-form-grid">
              <div className="profile-section">
                <div className="form-group">
                  <label className="form-label">Purpose of Funding</label>
                  <select
                    className="form-input"
                    value={formData.purposeOfFunding}
                    onChange={(e) => setFormData({ ...formData, purposeOfFunding: e.target.value })}
                  >
                    <option value="">Select Purpose</option>
                    <option value="working-capital">Working Capital</option>
                    <option value="expansion">Expansion</option>
                    <option value="equipment">Equipment Purchase</option>
                    <option value="inventory">Inventory</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Funding Type</label>
                  <select
                    className="form-input"
                    value={formData.preferredFundingType}
                    onChange={(e) => setFormData({ ...formData, preferredFundingType: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option value="equity">Equity</option>
                    <option value="debt">Debt</option>
                    <option value="convertible">Convertible Note</option>
                    <option value="grant">Grant</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Funding Amount</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Input in local currency"
                    value={formData.targetFundingAmount}
                    onChange={(e) => setFormData({ ...formData, targetFundingAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="profile-section">
                <div className="form-group">
                  <label className="form-label">Use of Funds</label>
                  <select
                    className="form-input"
                    value={formData.useOfFunds}
                    onChange={(e) => setFormData({ ...formData, useOfFunds: e.target.value })}
                  >
                    <option value="">Select Use</option>
                    <option value="working-capital">Working Capital</option>
                    <option value="hiring">Hiring</option>
                    <option value="product-development">Product Development</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Funding Timeline</label>
                  <select
                    className="form-input"
                    value={formData.fundingTimeline}
                    onChange={(e) => setFormData({ ...formData, fundingTimeline: e.target.value })}
                  >
                    <option value="">Select Timeline</option>
                    <option value="immediate">Immediate</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="12-plus-months">12+ months</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Financial Overview */}
        {!isProfileSaved && step === 3 && (
          <>
            <h3 className="section-title">Financial Overview</h3>
            <div className="profile-form-grid">
              <div className="profile-section">
                <div className="form-group">
                  <label className="form-label">Current Revenue</label>
                  <select
                    className="form-input"
                    value={formData.currentRevenue}
                    onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                  >
                    <option value="">Select Range</option>
                    <option value="<50K">&lt;$50K</option>
                    <option value="50K-100K">$50K - $100K</option>
                    <option value="100K-500K">$100K - $500K</option>
                    <option value="500K-1M">$500K - $1M</option>
                    <option value="1M+">$1M+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Monthly Expenses</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Input in local currency"
                    value={formData.monthlyExpenses}
                    onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Profit Margin</label>
                  <select
                    className="form-input"
                    value={formData.profitMargin}
                    onChange={(e) => setFormData({ ...formData, profitMargin: e.target.value })}
                  >
                    <option value="">Select Range</option>
                    <option value="negative">Negative</option>
                    <option value="0-10">0% - 10%</option>
                    <option value="10-20">10% - 20%</option>
                    <option value="20-30">20% - 30%</option>
                    <option value="30+">30%+</option>
                  </select>
                </div>
              </div>

              <div className="profile-section">
                <div className="form-group">
                  <label className="form-label">Total Assets</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Input in local currency"
                    value={formData.totalAssets}
                    onChange={(e) => setFormData({ ...formData, totalAssets: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Liabilities</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Input in local currency"
                    value={formData.totalLiabilities}
                    onChange={(e) => setFormData({ ...formData, totalLiabilities: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cash Flow</label>
                  <select
                    className="form-input"
                    value={formData.cashFlow}
                    onChange={(e) => setFormData({ ...formData, cashFlow: e.target.value })}
                  >
                    <option value="">Select Status</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
          {!isProfileSaved && (
            <div className="profile-actions">
              <div className="profile-actions-left">
                {step > 1 && (
                  <button className="btn-profile-outline" onClick={handleBack}>Back</button>
                )}
              </div>
              <div className="profile-actions-right">
                <button className="btn-profile-outline" onClick={handleSave}>Save</button>
                {step < 3 ? (
                  <button className="btn-profile-primary" onClick={handleNext}>Next</button>
                ) : (
                  <button className="btn-profile-primary" onClick={handleCompleteProfile}>Complete Profile</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
