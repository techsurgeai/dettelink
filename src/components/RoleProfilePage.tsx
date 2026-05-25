"use client";

import { useEffect, useMemo, useState } from "react";
import AppLayout from "./AppLayout";
import { getStoredAuth } from "../lib/auth";

export type Option = { value: string; label: string };

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "select" | "textarea";
  placeholder?: string;
  options?: Option[];
  highlight?: boolean;
};

export type SectionConfig = {
  title: string;
  fields: FieldConfig[];
};

export type StepConfig = {
  title: string;
  sections: SectionConfig[];
};

type ProfileMode = "member" | "lead_arranger";

export const memberSteps: StepConfig[] = [
  {
    title: "Account Information",
    sections: [
      {
        title: "Account Information",
        fields: [
          { name: "fullName", label: "Full Name" },
          { name: "email", label: "Email", type: "email", highlight: true },
          {
            name: "roleTitle",
            label: "Role",
            type: "select",
            options: [
              { value: "", label: "Select Role" },
              { value: "founder", label: "Founder / CEO" },
              { value: "cfo", label: "CFO / Finance Director" },
              { value: "investor", label: "Investor" },
            ],
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            options: [
              { value: "", label: "Select a Country" },
              { value: "AE", label: "United Arab Emirates" },
              { value: "US", label: "United States" },
              { value: "GB", label: "United Kingdom" },
            ],
          },
          { name: "password", label: "Password", type: "password", placeholder: "8+ Characters" },
        ],
      },
      {
        title: "Business Overview",
        fields: [
          { name: "businessName", label: "Business Name", placeholder: "Enter Business Name" },
          {
            name: "businessType",
            label: "Business Type",
            type: "select",
            options: [
              { value: "", label: "Select Type" },
              { value: "startup", label: "Startup" },
              { value: "sme", label: "SME" },
              { value: "enterprise", label: "Enterprise" },
            ],
          },
          {
            name: "industry",
            label: "Industry",
            type: "select",
            options: [
              { value: "", label: "Select Industry" },
              { value: "technology", label: "Technology" },
              { value: "finance", label: "Finance" },
              { value: "healthcare", label: "Healthcare" },
              { value: "retail", label: "Retail" },
            ],
          },
          {
            name: "yearsInOperation",
            label: "Years in Operation",
            type: "select",
            options: [
              { value: "<1", label: "Less than 1 year" },
              { value: "1-5", label: "1-5 years" },
              { value: "5-10", label: "5-10 years" },
              { value: "50+", label: "50+ years" },
            ],
          },
          {
            name: "noOfEmployees",
            label: "No of Employees",
            type: "select",
            options: [
              { value: "1-10", label: "1-10" },
              { value: "11-50", label: "11-50" },
              { value: "51-200", label: "51-200" },
              { value: "200+", label: "200+" },
            ],
          },
          {
            name: "annualRevenueRange",
            label: "Annual Revenue Range",
            type: "select",
            options: [
              { value: "<100K", label: "<100K" },
              { value: "100K-500K", label: "100K-500K" },
              { value: "500K-1M", label: "500K-1M" },
              { value: "1M+", label: "1M+" },
            ],
          },
        ],
      },
    ],
  },
];

export const memberFundingRequirementSteps: StepConfig[] = [
  {
    title: "Funding Intent",
    sections: [
      {
        title: "Funding Intent",
        fields: [
          {
            name: "purposeOfFunding",
            label: "Purpose of Funding",
            type: "select",
            options: [
              { value: "", label: "Select Purpose" },
              { value: "working-capital", label: "Working Capital" },
              { value: "expansion", label: "Expansion" },
              { value: "equipment", label: "Equipment Purchase" },
              { value: "inventory", label: "Inventory" },
              { value: "marketing", label: "Marketing" },
            ],
          },
          {
            name: "preferredFundingType",
            label: "Preferred Funding Type",
            type: "select",
            options: [
              { value: "", label: "Select Type" },
              { value: "equity", label: "Equity" },
              { value: "debt", label: "Debt" },
              { value: "convertible", label: "Convertible Note" },
              { value: "grant", label: "Grant" },
            ],
          },
          { name: "targetFundingAmount", label: "Target Funding Amount", placeholder: "Input in local currency" },
          {
            name: "useOfFunds",
            label: "Use of Funds",
            type: "select",
            options: [
              { value: "", label: "Select Use" },
              { value: "working-capital", label: "Working Capital" },
              { value: "hiring", label: "Hiring" },
              { value: "product-development", label: "Product Development" },
              { value: "marketing", label: "Marketing" },
              { value: "operations", label: "Operations" },
            ],
          },
          {
            name: "fundingTimeline",
            label: "Funding Timeline",
            type: "select",
            options: [
              { value: "", label: "Select Timeline" },
              { value: "immediate", label: "Immediate" },
              { value: "1-3-months", label: "1-3 months" },
              { value: "3-6-months", label: "3-6 months" },
              { value: "6-12-months", label: "6-12 months" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Financial Overview",
    sections: [
      {
        title: "Financial Overview",
        fields: [
          {
            name: "currentRevenue",
            label: "Current Revenue",
            type: "select",
            options: [
              { value: "", label: "Select Range" },
              { value: "<50M", label: "<50 Million" },
              { value: "50M-100M", label: "50-100 Million" },
              { value: "100M-250M", label: "100-250 Million" },
              { value: "250M-500M", label: "250-500 Million" },
              { value: "500M+", label: "500 Million Above" },
            ],
          },
          { name: "monthlyExpenses", label: "Monthly Expenses", placeholder: "Input in local currency" },
          {
            name: "profitMargin",
            label: "Profit Margin",
            type: "select",
            options: [
              { value: "", label: "Select Range" },
              { value: "negative", label: "Negative" },
              { value: "0-10", label: "0% - 10%" },
              { value: "10-20", label: "10% - 20%" },
              { value: "20-30", label: "20% - 30%" },
              { value: "30+", label: "30%+" },
            ],
          },
          { name: "totalAssets", label: "Total Assets", placeholder: "Input in local currency" },
          { name: "totalLiabilities", label: "Total Liabilities", placeholder: "Input in local currency" },
          {
            name: "cashFlow",
            label: "Cash Flow",
            type: "select",
            options: [
              { value: "", label: "Select Status" },
              { value: "positive", label: "Positive" },
              { value: "neutral", label: "Neutral" },
              { value: "negative", label: "Negative" },
            ],
          },
        ],
      },
    ],
  },
];

const leadArrangerSteps: StepConfig[] = [
  {
    title: "Account Info",
    sections: [
      {
        title: "Personal Details",
        fields: [
          { name: "fullName", label: "Full Name" },
          { name: "jobTitle", label: "Title", placeholder: "Managing Director" },
          { name: "email", label: "Work Email", type: "email", highlight: true },
          { name: "phone", label: "Phone", placeholder: "+971 55 123 4567" },
          { name: "profilePhoto", label: "Profile Photo URL", placeholder: "https://example.com/photo.jpg" },
          {
            name: "country",
            label: "Office Country",
            type: "select",
            options: [
              { value: "", label: "Select a Country" },
              { value: "AE", label: "United Arab Emirates" },
              { value: "SA", label: "Saudi Arabia" },
              { value: "GB", label: "United Kingdom" },
              { value: "SG", label: "Singapore" },
            ],
          },
          { name: "password", label: "Password", type: "password", placeholder: "8+ Characters" },
        ],
      },
      {
        title: "Firm Details",
        fields: [
          { name: "firmName", label: "Firm Name", placeholder: "Dettelinks Capital Partners" },
          { name: "officeLocation", label: "Office Location", placeholder: "Dubai International Financial Centre" },
          { name: "website", label: "Website", placeholder: "https://example.com" },
          { name: "regulatoryStatus", label: "Regulatory Status / License Info", placeholder: "DFSA regulated advisory entity" },
        ],
      },
    ],
  },
  {
    title: "Role & Coverage",
    sections: [
      {
        title: "Role Details",
        fields: [
          { name: "department", label: "Department", placeholder: "Origination & Syndication" },
          {
            name: "seniority",
            label: "Seniority",
            type: "select",
            options: [
              { value: "", label: "Select Seniority" },
              { value: "associate", label: "Associate" },
              { value: "director", label: "Director" },
              { value: "managing-director", label: "Managing Director" },
              { value: "partner", label: "Partner" },
            ],
          },
          { name: "dealResponsibilities", label: "Deal Responsibilities", type: "textarea", placeholder: "Origination, structuring, distribution, and mandate execution responsibilities." },
          { name: "sectorsCovered", label: "Sectors Covered", placeholder: "Infrastructure, energy, logistics" },
        ],
      },
      {
        title: "Deal Coverage",
        fields: [
          { name: "preferredGeographies", label: "Preferred Geographies", placeholder: "GCC, UK, South Asia" },
          { name: "ticketSizes", label: "Ticket Sizes", placeholder: "USD 10m - USD 150m" },
          {
            name: "productTypes",
            label: "Product Types",
            type: "select",
            options: [
              { value: "", label: "Select Primary Focus" },
              { value: "senior-debt", label: "Senior Debt" },
              { value: "equity", label: "Equity" },
              { value: "structured-finance", label: "Structured Finance" },
              { value: "hybrid", label: "Hybrid / Debt + Equity" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Track Record & Team",
    sections: [
      {
        title: "Credentials",
        fields: [
          { name: "yearsExperience", label: "Years of Experience", placeholder: "12 years" },
          { name: "pastTransactions", label: "Past Transactions", type: "textarea", placeholder: "Summarize previous deals closed or mandates supported." },
          { name: "notableMandates", label: "Notable Mandates", type: "textarea", placeholder: "Highlight standout transactions or live examples." },
          { name: "certifications", label: "Certifications", placeholder: "CFA, CAIA, regulatory certifications" },
        ],
      },
      {
        title: "Team Setup",
        fields: [
          { name: "supportContacts", label: "Support Contacts", type: "textarea", placeholder: "Assistants, analysts, or coordination contacts." },
          { name: "complianceContact", label: "Compliance Contact", placeholder: "Name and email" },
          { name: "executionTeamMembers", label: "Execution Team Members", type: "textarea", placeholder: "List the core team supporting active mandates." },
        ],
      },
    ],
  },
  {
    title: "Communication & Compliance",
    sections: [
      {
        title: "Communication Settings",
        fields: [
          {
            name: "preferredContactMethod",
            label: "Preferred Contact Method",
            type: "select",
            options: [
              { value: "", label: "Select Method" },
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
              { value: "whatsapp", label: "WhatsApp" },
              { value: "platform-messages", label: "Platform Messages" },
            ],
          },
          { name: "availability", label: "Availability", placeholder: "Sun-Thu, 9am-7pm GST" },
          {
            name: "notificationPreferences",
            label: "Notification Preferences",
            type: "select",
            options: [
              { value: "", label: "Select Preference" },
              { value: "all", label: "All mandate and teaser alerts" },
              { value: "priority", label: "Priority alerts only" },
              { value: "daily-digest", label: "Daily digest" },
            ],
          },
        ],
      },
      {
        title: "Compliance and Verification",
        fields: [
          {
            name: "kycStatus",
            label: "KYC / Business Verification Status",
            type: "select",
            options: [
              { value: "", label: "Select Status" },
              { value: "pending", label: "Pending verification" },
              { value: "submitted", label: "Documents submitted" },
              { value: "verified", label: "Verified" },
            ],
          },
          {
            name: "ndaAuthority",
            label: "NDA / Approval Authority",
            type: "select",
            options: [
              { value: "", label: "Select Access Level" },
              { value: "full", label: "Can approve and publish teasers" },
              { value: "limited", label: "Can draft, approval required" },
              { value: "viewer", label: "View only" },
            ],
          },
          {
            name: "approvalRights",
            label: "Approval Rights",
            type: "select",
            options: [
              { value: "", label: "Select Rights" },
              { value: "publish", label: "Can publish teasers and approve access" },
              { value: "draft-only", label: "Can draft only" },
              { value: "review", label: "Can review and comment" },
            ],
          },
        ],
      },
      {
        title: "Public Arranger Bio",
        fields: [
          { name: "shortFirmIntro", label: "Short Firm Intro", type: "textarea", placeholder: "Short firm intro shown to counterparties." },
          { name: "arrangerSummary", label: "Arranger Summary", type: "textarea", placeholder: "Counterparty-facing arranger summary for live mandates." },
        ],
      },
      {
        title: "Documents",
        fields: [
          { name: "companyProfileDocument", label: "Company Profile", placeholder: "Company profile document link or file name" },
          { name: "mandateLetterTemplate", label: "Mandate Letter Template", placeholder: "Mandate letter template link or file name" },
          { name: "teaserDisclaimerTemplate", label: "Teaser Disclaimer Template", placeholder: "Teaser disclaimer template link or file name" },
        ],
      },
    ],
  },
];

export const initialFormData: Record<string, string> = {
  fullName: "Andrew Sabastian",
  email: "johndoe@gmail.com",
  password: "",
  roleTitle: "",
  country: "",
  businessName: "",
  businessType: "",
  industry: "",
  yearsInOperation: "50+",
  noOfEmployees: "1-10",
  annualRevenueRange: "<100K",
  purposeOfFunding: "",
  preferredFundingType: "",
  targetFundingAmount: "",
  useOfFunds: "",
  fundingTimeline: "",
  currentRevenue: "",
  monthlyExpenses: "",
  profitMargin: "",
  totalAssets: "",
  totalLiabilities: "",
  cashFlow: "",
  jobTitle: "",
  phone: "",
  profilePhoto: "",
  firmName: "",
  website: "",
  officeLocation: "",
  regulatoryStatus: "",
  department: "",
  seniority: "",
  dealResponsibilities: "",
  sectorsCovered: "",
  preferredGeographies: "",
  ticketSizes: "",
  productTypes: "",
  yearsExperience: "",
  pastTransactions: "",
  notableMandates: "",
  certifications: "",
  supportContacts: "",
  complianceContact: "",
  executionTeamMembers: "",
  preferredContactMethod: "",
  availability: "",
  notificationPreferences: "",
  kycStatus: "",
  ndaAuthority: "",
  approvalRights: "",
  shortFirmIntro: "",
  arrangerSummary: "",
  companyProfileDocument: "",
  mandateLetterTemplate: "",
  teaserDisclaimerTemplate: "",
};

export function renderField(
  field: FieldConfig,
  formData: Record<string, string>,
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  readOnly: boolean
) {
  const commonProps = {
    className: `form-input ${field.highlight ? "input-highlight" : ""}`.trim(),
    value: formData[field.name] ?? "",
    readOnly,
  };

  if (field.type === "select") {
    return (
      <select
        {...commonProps}
        onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
        disabled={readOnly}
      >
        {field.options?.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        {...commonProps}
        rows={4}
        placeholder={field.placeholder}
        onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
      />
    );
  }

  return (
    <input
      {...commonProps}
      type={field.type ?? "text"}
      placeholder={field.placeholder}
      onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
    />
  );
}

export default function RoleProfilePage({ mode }: { mode: ProfileMode }) {
  const [step, setStep] = useState(1);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

  const isLeadArranger = mode === "lead_arranger";
  const steps = isLeadArranger ? leadArrangerSteps : memberSteps;
  const completionKey = isLeadArranger ? "dl_profile_complete_lead_arranger" : "dl_profile_complete";
  const popupDismissKey = isLeadArranger ? "dl_profile_popup_dismissed_lead_arranger" : "dl_profile_popup_dismissed";

  useEffect(() => {
    const { payload } = getStoredAuth();
    if (payload) {
      setFormData((prev) => ({
        ...prev,
        fullName: payload.fullName || prev.fullName,
        email: payload.email || prev.email,
      }));
    }

    if (localStorage.getItem(completionKey)) {
      setIsProfileSaved(true);
      setStep(steps.length);
    }
  }, [completionKey, steps.length]);

  const profileCompletion = useMemo(() => {
    if (isProfileSaved) return 100;
    return Math.round((step / steps.length) * 100);
  }, [isProfileSaved, step, steps.length]);

  const handleNext = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSave = () => {
    localStorage.setItem(`dl_profile_draft_${mode}`, JSON.stringify(formData));
    alert("Profile draft saved successfully!");
  };

  const handleCompleteProfile = () => {
    setIsProfileSaved(true);
    localStorage.setItem(completionKey, "true");
    sessionStorage.removeItem(popupDismissKey);
  };

  const handleEditProfile = () => {
    setIsProfileSaved(false);
    localStorage.removeItem(completionKey);
    setStep(1);
  };

  const currentStep = steps[Math.max(0, step - 1)];

  return (
    <AppLayout>
      <div className="profile-page">
        <h1 className="page-title">{isLeadArranger ? "Lead Arranger Profile" : "My Profile"}</h1>

        <div className="profile-card-container">
          <div className="profile-header-card">
            <div className="profile-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
            </div>
            <h2 className="profile-name">
              {formData.fullName}
              <span className="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#fff" />
                  <path d="M9 12l2 2 4-4" stroke="#2D8A6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </h2>
            <p className="profile-role">{isLeadArranger ? "Lead Arranger" : "Founder at Trello"}</p>
            {!isProfileSaved && (
              <div className="profile-completion">
                <div className="completion-header">
                  <span className="completion-label">Complete Your Profile</span>
                  <span className="completion-percent-badge">{profileCompletion}%</span>
                </div>
                <div className="completion-bar">
                  <div className="completion-bar-fill" style={{ width: `${profileCompletion}%` }} />
                </div>
              </div>
            )}
            {isProfileSaved && (
              <button className="btn-edit-profile" onClick={handleEditProfile}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-form-container">
          {!isProfileSaved && (
            <div className="step-indicator">
              <span className="step-text">Step {step} of {steps.length}</span>
              <div className="step-progress">
                {steps.map((_, index) => (
                  <div key={index} className={`step-bar ${step >= index + 1 ? "active" : ""}`} />
                ))}
              </div>
            </div>
          )}

          {isProfileSaved ? (
            <>
              {steps.map((savedStep) => (
                <div key={savedStep.title} style={{ marginTop: 24 }}>
                  <h3 className="section-title">{savedStep.title}</h3>
                  <div className="profile-form-grid">
                    {savedStep.sections.map((section) => (
                      <div key={section.title} className="profile-section">
                        <h3 className="section-title">{section.title}</h3>
                        {section.fields.map((field) => (
                          <div key={field.name} className="form-group">
                            <label className="form-label">{field.label}</label>
                            {renderField(field, formData, setFormData, true)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h3 className="section-title">{currentStep.title}</h3>
              <div className="profile-form-grid">
                {currentStep.sections.map((section) => (
                  <div key={section.title} className="profile-section">
                    <h3 className="section-title">{section.title}</h3>
                    {section.fields.map((field) => (
                      <div key={field.name} className="form-group">
                        <label className="form-label">{field.label}</label>
                        {renderField(field, formData, setFormData, false)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {!isProfileSaved && (
            <div className="profile-actions">
              <div className="profile-actions-left">
                {step > 1 && (
                  <button className="btn-profile-outline" onClick={handleBack}>
                    Back
                  </button>
                )}
              </div>
              <div className="profile-actions-right">
                <button className="btn-profile-outline" onClick={handleSave}>
                  Save
                </button>
                {step < steps.length ? (
                  <button className="btn-profile-primary" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className="btn-profile-primary" onClick={handleCompleteProfile}>
                    Complete Profile
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
