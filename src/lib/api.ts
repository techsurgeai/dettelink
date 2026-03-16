"use client";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dettelinks-api-2096.azurewebsites.net/api";

export function getToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("dl_token") ?? "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("dl_token", token);
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers ?? {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${apiBase}${path}`, { ...options, headers });
}
