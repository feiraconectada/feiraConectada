"use client";

import { useMemo, useState } from "react";

import ProducerCard from "@/components/produtores/ProducerCard";

import FilterBar, { type SortOrder } from "@/components/shared/FilterBar";

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

// ======================================================
// VALOR PSEUDOALEATÓRIO ESTÁVEL
//
// O mesmo produtor sempre gera o mesmo valor.
// Isso evita Math.random() durante a renderização
// e elimina problemas de hydration.
// ======================================================

function getRandomOrderValue(id: number) {
  let value = id;

  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = (value >>> 16) ^ value;

  return value >>> 0;
}

export default function ProducersContent({ producers }: ProducersContentProps) {
  const [search, setSearch] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // "" = Aleatório
  const [sortOrder, setSortOrder] = useState<SortOrder>("");

  // ======================================================
  // CATEGORIAS DISPONÍVEIS
  // ======================================================

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

  // ======================================================
  // FILTROS + ORDENAÇÃO
  // ======================================================

  const filteredProducers = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    const result = producers.filter((producer) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        producer.categories.some((category) =>
          selectedCategories.includes(category.slug),
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

    // ==================================================
    // A → Z
    // ==================================================

    if (sortOrder === "asc") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }

    // ==================================================
    // Z → A
    // ==================================================

    if (sortOrder === "desc") {
      return [...result].sort((a, b) => b.name.localeCompare(a.name, "pt-BR"));
    }

    // ==================================================
    // MAIS CURTIDOS
    // ==================================================

    if (sortOrder === "likes") {
      return [...result].sort((a, b) => {
        const likeDifference = b.likeCount - a.likeCount;

        if (likeDifference === 0) {
          return a.name.localeCompare(b.name, "pt-BR");
        }

        return likeDifference;
      });
    }

    // ==================================================
    // ALEATÓRIO
    // ==================================================

    return [...result].sort(
      (a, b) => getRandomOrderValue(a.id) - getRandomOrderValue(b.id),
    );
  }, [producers, search, selectedCategories, sortOrder]);

  // ======================================================
  // MARCAR / DESMARCAR CATEGORIA
  // ======================================================

  function toggleCategory(slug: string) {
    setSelectedCategories((current) => {
      if (current.includes(slug)) {
        return current.filter((categorySlug) => categorySlug !== slug);
      }

      return [...current, slug];
    });
  }

  // ======================================================
  // LIMPAR FILTROS
  // ======================================================

  function clearFilters() {
    setSearch("");

    setSelectedCategories([]);

    setSortOrder("");
  }

  const hasActiveFilters =
    search.trim() !== "" || selectedCategories.length > 0 || sortOrder !== "";

  return (
    <>
      <FilterBar
        searchId="producer-search"
        searchLabel="Pesquisar produtores"
        searchPlaceholder="Nome, categoria ou localização..."
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
        showLikeSort
      />

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
                Tente alterar a pesquisa, selecionar outras categorias ou limpar
                os filtros.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-[#0A355F] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#082F55]"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
