"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type Ad = {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
};

export default function AdsPanel() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    apiFetch("/ads")
      .then((res) => (res.ok ? res.json() : []))
      .then(setAds)
      .catch(() => setAds([]));
  }, []);

  if (!ads.length) return null;

  return (
    <section className="ad-grid">
      {ads.map((ad) => (
        <article key={ad.id} className="ad-card">
          <img src={ad.imageUrl} alt={ad.title} />
          <div>
            <h3>{ad.title}</h3>
            <a className="secondary" href={ad.targetUrl} target="_blank">
              Learn more
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
