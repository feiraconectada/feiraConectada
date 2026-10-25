"use client";

import { useEffect } from "react";

interface ProducerViewTrackerProps {
  producerId: number;
}

function getTodayKey() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;

  const month = parts.find((part) => part.type === "month")?.value;

  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export default function ProducerViewTracker({
  producerId,
}: ProducerViewTrackerProps) {
  useEffect(() => {
    const today = getTodayKey();

    const storageKey =
      `feira-conectada:producer-view:` + `${producerId}:${today}`;

    if (localStorage.getItem(storageKey)) {
      return;
    }

    localStorage.setItem(storageKey, "1");

    fetch(`/api/produtores/${producerId}/metricas`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type: "profile_view",
      }),

      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem(storageKey);
        }
      })
      .catch(() => {
        localStorage.removeItem(storageKey);
      });
  }, [producerId]);

  return null;
}
