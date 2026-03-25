"use client";

import AuthLoginPage from "../../../components/AuthLoginPage";

export default function B2BMemberLoginPage() {
  return (
    <AuthLoginPage
      title="B2B Member Log In"
      subtitle="Please login to your B2B marketplace member account to continue"
      submitLabel="Log In as B2B Member"
      loadingLabel="Logging in..."
      requiredRole="b2b_member"
      footerText="Need a client account instead?"
      footerHref="/login/"
      footerLinkLabel="Go to Client Login"
      extraLinks={[{ href: "/lead-arranger/login/", label: "Login as Lead Arranger" }]}
    />
  );
}
