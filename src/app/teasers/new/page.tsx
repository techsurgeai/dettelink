"use client";

import { useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function NewTeaser() {
  const [status, setStatus] = useState<
    "idle" | "saving" | "done" | "error" | "auth"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      title: data.get("title"),
      sector: data.get("sector"),
      geo: data.get("geo"),
      type: data.get("type"),
      amount: Number(data.get("amount")),
      tenor: data.get("tenor"),
      security: data.get("security"),
      snapshot: data.get("snapshot"),
      overview: data.get("overview"),
      meetingUrl: data.get("meetingUrl")
    };
    const teaserPayload = {
      summary: data.get("summary"),
      terms: data.get("terms"),
      visibility: data.get("visibility")
    };

    try {
      const res = await apiFetch("/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.status === 401) {
        setStatus("auth");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const deal = await res.json();

      const teaserRes = await apiFetch(`/deals/${deal.id}/teasers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teaserPayload)
      });
      if (teaserRes.status === 401) {
        setStatus("auth");
        return;
      }
      if (!teaserRes.ok) throw new Error("Failed");
      const teaser = await teaserRes.json();

      const publishRes = await apiFetch(
        `/deals/${deal.id}/teasers/${teaser.id}/publish`,
        { method: "POST" }
      );
      if (publishRes.status === 401) {
        setStatus("auth");
        return;
      }
      if (!publishRes.ok) throw new Error("Failed");

      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Create Deal Teaser</h1>
        <p>Generate a confidential teaser for syndication.</p>
      </header>
      <section className="card">
        <form className="form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Deal title" required />
          <input name="sector" placeholder="Sector" required />
          <input name="geo" placeholder="Geography" required />
          <select name="type" required>
            <option value="Debt">Debt</option>
            <option value="Equity">Equity</option>
            <option value="Debt_Equity">Debt + Equity</option>
          </select>
          <input name="amount" type="number" min="1" placeholder="Amount" />
          <input name="tenor" placeholder="Tenor / timeline" required />
          <input name="security" placeholder="Security / collateral" required />
          <input name="meetingUrl" placeholder="Virtual meeting URL" />
          <textarea name="snapshot" placeholder="Financial snapshot" required />
          <textarea name="overview" placeholder="Deal overview" required />
          <textarea name="summary" placeholder="Teaser summary" required />
          <textarea name="terms" placeholder="Indicative terms" required />
          <select name="visibility" required>
            <option value="invite_only">Invite only</option>
            <option value="all_members">All members</option>
          </select>
          <button className="primary" disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Create teaser"}
          </button>
        </form>
        {status === "done" && <p>Teaser created.</p>}
        {status === "error" && <p>Failed to create teaser.</p>}
        {status === "auth" && (
          <p>Admin access required to publish teasers.</p>
        )}
      </section>
    </main>
  );
}
