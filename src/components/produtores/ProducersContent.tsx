"use client";

import { useMemo, useState } from "react";

import ProducerCard from "@/components/produtores/ProducerCard";

import type { Producer } from "@/types/producer";

interface ProducersContentProps {
  producers: Producer[];
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ProducersContent({ producers }: ProducersContentProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        slug: string;
      }
    >();

    producers.forEach((producer) => {
      producer.categories.forEach((category) => {
        map.set(category.slug, {
          name: category.name,
          slug: category.slug,
        });
      });
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
  }, [producers]);

  const filteredProducers = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return producers.filter((producer) => {
      const matchesCategory =
        selectedCategory === "todos" ||
        producer.categories.some(
          (category) => category.slug === selectedCategory,
        );

      const searchableText = normalizeText(
        [
          producer.name,
          producer.description,
          producer.location ?? "",
          ...producer.categories.map((category) => category.name),
        ].join(" "),
      );

      const matchesSearch =
        normalizedSearch === "" || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [producers, search, selectedCategory]);

  return (
    <>
      <section className="border-b border-[#D5DEE7] bg-white">
        <div className="mx-auto max-w-[1150px] px-6 py-8">
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="producer-search"
                className="mb-2 block text-sm font-bold text-[#052F58]"
              >
                Pesquisar produtores
              </label>

              <input
                id="producer-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Busque por nome, categoria ou localização..."
                className="w-full rounded-xl border border-[#D5DEE7] bg-white px-4 py-3 text-sm text-[#052F58] outline-none transition placeholder:text-[#8293AA] focus:border-[#0A355F]"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-[#052F58]">
                Categorias
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("todos")}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    selectedCategory === "todos"
                      ? "bg-[#0A355F] text-white"
                      : "border border-[#D5DEE7] bg-white text-[#052F58] hover:border-[#0A355F]"
                  }`}
                >
                  Todos
                </button>

                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      selectedCategory === category.slug
                        ? "bg-[#0A355F] text-white"
                        : "border border-[#D5DEE7] bg-white text-[#052F58] hover:border-[#0A355F]"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-12">
        <div className="mx-auto max-w-[1150px] px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#5F7590]">
              {filteredProducers.length}{" "}
              {filteredProducers.length === 1
                ? "produtor encontrado"
                : "produtores encontrados"}
            </p>
          </div>

          {filteredProducers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducers.map((producer) => (
                <ProducerCard key={producer.id} producer={producer} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D5DEE7] bg-white px-6 py-16 text-center">
              <h2 className="mb-2 text-xl font-extrabold text-[#052F58]">
                Nenhum produtor encontrado
              </h2>

              <p className="text-sm text-[#5F7590]">
                Tente pesquisar por outro nome ou selecionar uma categoria
                diferente.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
