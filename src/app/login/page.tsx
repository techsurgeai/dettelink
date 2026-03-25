"use client";

import AuthLoginPage from "../../components/AuthLoginPage";

export default function LoginPage() {
  return (
    <AuthLoginPage
      title="Log In"
      subtitle="Please login to your account to continue"
      submitLabel="Log In"
      loadingLabel="Logging in..."
      footerText="Don't have an account?"
      footerHref="/register/"
      footerLinkLabel="Register Now"
      extraLinks={[
        { href: "/lead-arranger/login/", label: "Login as Lead Arranger" },
        { href: "/b2b-member/login/", label: "Login as B2B Member" },
      ]}
    />
  );
}
