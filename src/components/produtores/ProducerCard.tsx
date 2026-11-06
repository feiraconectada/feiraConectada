import Image from "next/image";
import Link from "next/link";

import ProducerLikeButton from "@/components/produtores/ProducerLikeButton";

import type { Producer } from "@/types/producer";

interface ProducerCardProps {
  producer: Producer;
}

export default function ProducerCard({ producer }: ProducerCardProps) {
  const categoryNames = producer.categories
    .map((category) => category.name)
    .join(" • ");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D5DEE7] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0A355F] hover:shadow-md">
      <Link
        href={`/produtores/${producer.slug}`}
        className="block flex-1"
        aria-label={`Ver produtor ${producer.name}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8F2F5]">
          <Image
            src={producer.image}
            alt={producer.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-x-4 bottom-4 translate-y-2 rounded-lg bg-[#052F58]/95 px-4 py-2.5 text-center text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Clique para ver produtor
          </div>
        </div>

        <div className="p-5 pb-2">
          {categoryNames && (
            <p className="mb-2 text-[11px] font-black uppercase tracking-[1.2px] text-[#FF5A1F]">
              {categoryNames}
            </p>
          )}

          <h2 className="mb-2 text-xl font-extrabold tracking-[-0.6px] text-[#052F58]">
            {producer.name}
          </h2>

          <p className="mb-4 text-sm leading-6 text-[#5F7590]">
            {producer.description}
          </p>

          {producer.location && (
            <div className="flex items-start gap-2 text-sm text-[#5F7590]">
              <span aria-hidden="true">📍</span>

              <span>{producer.location}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between gap-4 px-5 pb-5 pt-3">
        <Link
          href={`/produtores/${producer.slug}`}
          className="text-sm font-extrabold text-[#0A355F] transition hover:text-[#FF5A1F]"
        >
          Ver produtor →
        </Link>

        <ProducerLikeButton
          producerId={producer.id}
          producerName={producer.name}
          initialCount={producer.likeCount}
        />
      </div>
    </article>
  );
}
