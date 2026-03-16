"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

type Asset = {
  id: string;
  title: string;
  assetType: string;
  region: string;
  price: number;
  status: string;
  description: string;
  bids: { id: string; amount: number; status: string }[];
};

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [bidStatus, setBidStatus] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "auth"
  >("loading");

  useEffect(() => {
    setStatus("loading");
    apiFetch("/assets")
      .then(async (res) => {
        if (res.status === 401) {
          setStatus("auth");
          setAssets([]);
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        setAssets(await res.json());
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  async function submitBid(assetId: string) {
    const amount = Number(bidAmounts[assetId]);
    if (!amount) {
      setBidStatus((prev) => ({ ...prev, [assetId]: "Enter a bid amount." }));
      return;
    }
    setBidStatus((prev) => ({ ...prev, [assetId]: "Submitting bid..." }));
    const res = await apiFetch(`/assets/${assetId}/bids`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });
    if (!res.ok) {
      setBidStatus((prev) => ({
        ...prev,
        [assetId]: "Unable to place bid."
      }));
      return;
    }
    const refreshed = await apiFetch("/assets");
    setAssets((await refreshed.json()) ?? []);
    setBidAmounts((prev) => ({ ...prev, [assetId]: "" }));
    setBidStatus((prev) => ({ ...prev, [assetId]: "Bid submitted." }));
  }

  return (
    <main className="dashboard">
      <header>
        <h1>Secondary Market</h1>
        <p>Buy and sell loan portfolios and distressed assets.</p>
      </header>
      <section className="grid">
        {assets.map((asset) => (
          <article key={asset.id} className="card">
            <h3>{asset.title}</h3>
            <p>
              {asset.assetType} - {asset.region}
            </p>
            <p>Status: {asset.status}</p>
            <p>Price: {asset.price.toLocaleString()}</p>
            <p>
              Active bids: {asset.bids.length} - Top offer:{" "}
              {asset.bids[0]?.amount?.toLocaleString() ?? "None"}
            </p>
            <p>{asset.description}</p>
            <div className="divider" />
            <label className="label" htmlFor={`bid-${asset.id}`}>
              Place a bid
            </label>
            <input
              id={`bid-${asset.id}`}
              name={`bid-${asset.id}`}
              type="number"
              placeholder="Bid amount"
              value={bidAmounts[asset.id] ?? ""}
              onChange={(event) =>
                setBidAmounts((prev) => ({
                  ...prev,
                  [asset.id]: event.target.value
                }))
              }
            />
            <button className="primary" onClick={() => submitBid(asset.id)}>
              Submit bid
            </button>
            {bidStatus[asset.id] && <p>{bidStatus[asset.id]}</p>}
          </article>
        ))}
        {status === "loading" && (
          <article className="card">
            <h3>Loading assets</h3>
            <p>Fetching live secondary market listings...</p>
          </article>
        )}
        {status === "error" && (
          <article className="card">
            <h3>Unable to load assets</h3>
            <p>Try again shortly.</p>
          </article>
        )}
        {status === "auth" && (
          <article className="card">
            <h3>Subscription required</h3>
            <p>Activate your plan to bid on secondary market assets.</p>
            <Link className="secondary" href="/billing/">
              View plans
            </Link>
          </article>
        )}
        {status === "idle" && !assets.length && (
          <article className="card">
            <h3>No assets listed</h3>
            <p>Secondary market listings will appear here.</p>
          </article>
        )}
      </section>
    </main>
  );
}

