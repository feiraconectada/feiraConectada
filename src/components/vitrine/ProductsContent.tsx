"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/vitrine/ProductCard";

import FilterBar, { type SortOrder } from "@/components/shared/FilterBar";

import type { Product } from "@/types/product";

interface ProductsContentProps {
  products: Product[];
  initialCategory?: string;
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ======================================================
// VALOR PSEUDOALEATÓRIO
//
// Gera sempre o mesmo valor para o mesmo ID.
// Dessa forma:
// - os itens ficam visualmente embaralhados;
// - servidor e cliente geram a mesma ordem;
// - não usamos Math.random();
// - não temos hydration mismatch.
// ======================================================

function getRandomOrderValue(id: number) {
  let value = id;

  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = (value >>> 16) ^ value;

  return value >>> 0;
}

export default function ProductsContent({
  products,
  initialCategory = "todos",
}: ProductsContentProps) {
  const [search, setSearch] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory === "todos" ? [] : [initialCategory],
  );

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

    products.forEach((product) => {
      map.set(product.categorySlug, {
        name: product.categoryName,
        slug: product.categorySlug,
      });
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
  }, [products]);

  // ======================================================
  // FILTROS + ORDENAÇÃO
  // ======================================================

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.categorySlug);

      const searchableText = normalizeText(
        [
          product.name,

          product.description ?? "",

          product.producer,

          product.categoryName,

          product.type === "SERVICE" ? "serviço" : "produto",
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
    // ALEATÓRIO
    // ==================================================

    return [...result].sort(
      (a, b) => getRandomOrderValue(a.id) - getRandomOrderValue(b.id),
    );
  }, [products, search, selectedCategories, sortOrder]);

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
        searchId="product-search"
        searchLabel="Pesquisar produtos e serviços"
        searchPlaceholder="Produto, serviço, produtor ou categoria..."
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <section className="bg-[#F7F3EA] py-12">
        <div className="mx-auto max-w-[1150px] px-6">
          {/* QUANTIDADE */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#5F7590]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "item encontrado"
                : "itens encontrados"}
            </p>
          </div>

          {/* CARDS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D5DEE7] bg-white px-6 py-16 text-center">
              <h2 className="mb-2 text-xl font-extrabold text-[#052F58]">
                Nenhum produto ou serviço encontrado
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
