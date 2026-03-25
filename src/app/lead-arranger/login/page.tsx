"use client";

import AuthLoginPage from "../../../components/AuthLoginPage";

export default function LeadArrangerLoginPage() {
  return (
    <AuthLoginPage
      title="Lead Arranger Log In"
      subtitle="Please login to your lead arranger account to continue"
      submitLabel="Log In as Lead Arranger"
      loadingLabel="Logging in..."
      requiredRole="lead_arranger"
      footerText="Don't have a lead arranger account?"
      footerHref="/lead-arranger/register/"
      footerLinkLabel="Sign Up"
      extraLinks={[{ href: "/login/", label: "Go to Client Login" }]}
    />
  );
}
