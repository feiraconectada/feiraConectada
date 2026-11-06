"use client";

import { useEffect, useState } from "react";

interface ProducerLikeButtonProps {
  producerId: number;
  producerName: string;
  initialCount: number;
}

interface LikeResponse {
  liked: boolean;
  count: number;
}

const VISITOR_KEY = "feira-conectada:visitor-id";

function getVisitorId() {
  let visitorId = window.localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();

    window.localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}

export default function ProducerLikeButton({
  producerId,
  producerName,
  initialCount,
}: ProducerLikeButtonProps) {
  const [liked, setLiked] = useState(false);

  const [count, setCount] = useState(initialCount);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const visitorId = getVisitorId();

    const controller = new AbortController();

    async function loadLikeStatus() {
      try {
        const response = await fetch(
          `/api/produtores/${producerId}/curtidas?visitorId=${encodeURIComponent(
            visitorId,
          )}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as LikeResponse;

        setLiked(data.liked);
        setCount(data.count);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Erro ao consultar curtida:", error);
      }
    }

    void loadLikeStatus();

    return () => {
      controller.abort();
    };
  }, [producerId]);

  async function handleLike() {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const visitorId = getVisitorId();

      const response = await fetch(`/api/produtores/${producerId}/curtidas`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          visitorId,
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as LikeResponse;

      setLiked(data.liked);
      setCount(data.count);
    } catch (error) {
      console.error("Erro ao curtir produtor:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={loading}
      aria-pressed={liked}
      aria-label={
        liked ? `Remover curtida de ${producerName}` : `Curtir ${producerName}`
      }
      className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-extrabold transition ${
        liked
          ? "border-[#FF5A1F] bg-[#FFF0EA] text-[#FF5A1F]"
          : "border-[#D5DEE7] bg-white text-[#5F7590] hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        />
      </svg>

      <span>{count}</span>
    </button>
  );
}
