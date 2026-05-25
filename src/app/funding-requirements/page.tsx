"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import { initialFormData, memberFundingRequirementSteps, renderField } from "../../components/RoleProfilePage";

const fundingRequirementSteps = memberFundingRequirementSteps;

export default function FundingRequirementsPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

  const currentStep = fundingRequirementSteps[Math.max(0, step - 1)];
  const progress = useMemo(() => Math.round((step / fundingRequirementSteps.length) * 100), [step]);

  const handleNext = () => {
    if (step < fundingRequirementSteps.length) {
      setStep((prev) => prev + 1);
      return;
    }

    localStorage.setItem("dl_funding_requirements", JSON.stringify(formData));
    localStorage.setItem("dl_funding_requirements_complete", "true");
    localStorage.setItem("dl_show_upload_guidance", "true");
    alert("Funding requirements saved successfully!");
    router.push("/dashboard/");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("dl_funding_requirements_draft", JSON.stringify(formData));
    alert("Funding requirements draft saved successfully!");
  };

  return (
    <AppLayout>
      <div className="profile-page">
        <h1 className="page-title">Funding Requirements</h1>

        <div className="profile-form-container">
          <div className="step-indicator">
            <span className="step-text">Step {step} of {fundingRequirementSteps.length}</span>
            <div className="step-progress">
              {fundingRequirementSteps.map((_, index) => (
                <div key={index} className={`step-bar ${step >= index + 1 ? "active" : ""}`} />
              ))}
            </div>
          </div>

          <div className="profile-completion" style={{ marginBottom: 24 }}>
            <div className="completion-header">
              <span className="completion-label">Completion Progress</span>
              <span className="completion-percent-badge">{progress}%</span>
            </div>
            <div className="completion-bar">
              <div className="completion-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

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

          <div className="profile-actions">
            <div className="profile-actions-left">
              {step > 1 && (
                <button className="btn-profile-outline" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
            <div className="profile-actions-right">
              <button className="btn-profile-outline" onClick={handleSaveDraft}>
                Save
              </button>
              <button className="btn-profile-primary" onClick={handleNext}>
                {step < fundingRequirementSteps.length ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
