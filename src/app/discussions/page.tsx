"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Discussion = {
  id: string;
  title: string;
  createdBy: string | null;
};

export default function Discussions() {
  const [items, setItems] = useState<Discussion[]>([]);
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setStatus("loading");
    apiFetch("/discussions")
      .then(async (res) => {
        if (res.status === 401) {
          setStatus("auth");
          setItems([]);
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        setItems(await res.json());
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="dashboard">
      <header>
        <h1>Discussions</h1>
        <p>Market checks, syndication talk, and deal insights.</p>
      </header>
      <section className="grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>Started by {item.createdBy ?? "Member"}</p>
            <button className="secondary">Open Thread</button>
          </article>
        ))}
        {status === "loading" && (
          <article className="card">
            <h3>Loading discussions</h3>
            <p>Fetching the latest market commentary...</p>
          </article>
        )}
        {status === "error" && (
          <article className="card">
            <h3>Unable to load discussions</h3>
            <p>Please try again in a moment.</p>
          </article>
        )}
        {status === "auth" && (
          <article className="card">
            <h3>Member access required</h3>
            <p>Sign in to join market and deal discussions.</p>
            <Link className="secondary" href="/login/">
              Sign in
            </Link>
          </article>
        )}
        {status === "idle" && !items.length && (
          <article className="card">
            <h3>No discussions yet</h3>
            <p>Start a thread once you are onboarded.</p>
          </article>
        )}
      </section>
    </main>
  );
}

