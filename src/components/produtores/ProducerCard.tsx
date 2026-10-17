import Image from "next/image";

import type { Producer } from "@/types/producer";

interface ProducerCardProps {
  producer: Producer;
}

export default function ProducerCard({ producer }: ProducerCardProps) {
  return (
    <article className="group grid min-h-[145px] grid-cols-[115px_1fr] overflow-hidden rounded-xl border border-[#D5DEE7] bg-white transition hover:-translate-y-0.5 hover:border-[#75A2C5] hover:shadow-sm sm:grid-cols-[125px_1fr]">
      <div className="relative min-h-[145px]">
        <Image
          src={producer.image}
          alt={producer.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col p-4">
        <span className="text-[9px] font-black uppercase tracking-[0.4px] text-[#07528A]">
          {producer.category}
        </span>

        <h2 className="mt-2 text-[18px] font-extrabold leading-tight tracking-[-0.5px] text-[#052F58]">
          {producer.name}
        </h2>

        <p className="mt-2 flex-1 text-[12px] leading-[1.5] text-[#6E8299]">
          {producer.description}
        </p>

        <button
          type="button"
          className="mt-3 self-start text-[11px] font-extrabold text-[#07528A] transition group-hover:text-[#FF5A1F]"
        >
          Ver perfil →
        </button>
      </div>
    </article>
  );
}
