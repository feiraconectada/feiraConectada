"use client";

import type { MouseEvent, ReactNode } from "react";

type MetricType = "whatsapp_click" | "social_click";

interface TrackedExternalLinkProps {
  producerId: number;

  href: string;

  metric: MetricType;

  children: ReactNode;

  className?: string;

  ariaLabel?: string;
}

export default function TrackedExternalLink({
  producerId,
  href,
  metric,
  children,
  className,
  ariaLabel,
}: TrackedExternalLinkProps) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    void fetch(`/api/produtores/${producerId}/metricas`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type: metric,
      }),

      keepalive: true,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
