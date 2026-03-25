"use client";

type TokenPayload = {
  email?: string;
  fullName?: string;
  role?: string;
};

export const LEAD_ARRANGER_ROLE = "lead_arranger";
export const B2B_MEMBER_ROLE = "b2b_member";

export function parseTokenPayload(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function normalizeRole(role?: string | null) {
  return (role ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function isLeadArrangerRole(role?: string | null) {
  return normalizeRole(role) === LEAD_ARRANGER_ROLE;
}

export function isB2BMemberRole(role?: string | null) {
  return normalizeRole(role) === B2B_MEMBER_ROLE;
}

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return { token: "", payload: null as TokenPayload | null, role: "" };
  }

  const token = window.localStorage.getItem("dl_token") ?? "";
  const payload = token ? parseTokenPayload(token) : null;
  return {
    token,
    payload,
    role: normalizeRole(payload?.role),
  };
}

export function getDashboardPathForRole(role?: string | null) {
  if (isLeadArrangerRole(role)) return "/dashboard/lead-arranger/";
  if (isB2BMemberRole(role)) return "/dashboard/b2b-member/";
  return "/dashboard/";
}

export function getLoginPathForRole(role?: string | null) {
  return "/login/";
}

export function getRoleLabel(role?: string | null) {
  if (isLeadArrangerRole(role)) return "Lead Arranger";
  if (isB2BMemberRole(role)) return "B2B Member";
  if (!role) return "Member";

  return normalizeRole(role)
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
