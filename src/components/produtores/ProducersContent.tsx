"use client";

import { useMemo, useState } from "react";

import ProducerCard from "@/components/produtores/ProducerCard";

import type { Producer } from "@/types/producer";

interface ProducersContentProps {
  producers: Producer[];
}

const categories = [
  "Todos",
  "Comida",
  "Artesanato",
  "Serviços",
  "Roupas",
  "Utilidades",
];

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ProducersContent({ producers }: ProducersContentProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducers = useMemo(() => {
    return producers.filter((producer) => {
      const normalizedSearch = normalizeText(search);

      const producerText = normalizeText(
        `${producer.name} ${producer.category} ${producer.description}`,
      );

      const matchesSearch = producerText.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todos" || producer.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [producers, search, selectedCategory]);

  return (
    <>
      {/* ÁREA AZUL DA PESQUISA */}
      <div className="bg-[#0A355F]">
        <div className="mx-auto max-w-[1050px] px-6 pb-9">
          <div className="relative max-w-[650px]">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#07528A]">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar produtor, produto ou serviço..."
              className="h-[48px] w-full rounded-lg bg-white pl-11 pr-4 text-[13px] text-[#052F58] outline-none placeholder:text-[#9AA9BC] focus:ring-2 focus:ring-[#FF5A1F]/30"
            />
          </div>
        </div>
      </div>

      {/* LISTAGEM */}
      <section className="bg-[#F7F3EA] py-9">
        <div className="mx-auto max-w-[1050px] px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`h-[32px] rounded-full border px-4 text-[11px] font-extrabold transition ${
                  selectedCategory === category
                    ? "border-[#0A355F] bg-[#0A355F] text-white"
                    : "border-[#CDD8E3] bg-white text-[#052F58] hover:border-[#07528A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="mb-5 mt-9 text-[10px] font-black uppercase tracking-[1.4px] text-[#748BA3]">
            {filteredProducers.length}{" "}
            {filteredProducers.length === 1
              ? "resultado encontrado"
              : "resultados encontrados"}
          </p>

          {filteredProducers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducers.map((producer) => (
                <ProducerCard key={producer.id} producer={producer} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#D5DEE7] bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-extrabold text-[#052F58]">
                Nenhum produtor encontrado
              </h2>

              <p className="mt-2 text-sm text-[#8293AA]">
                Tente utilizar outro termo ou categoria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
