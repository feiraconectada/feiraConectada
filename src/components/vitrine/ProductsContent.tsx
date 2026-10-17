"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/vitrine/ProductCard";

import type { Product } from "@/types/product";

interface ProductsContentProps {
  products: Product[];
  initialCategory?: string;
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

export default function ProductsContent({
  products,
  initialCategory = "Todos",
}: ProductsContentProps) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const normalizedSearch = normalizeText(search);

      const productText = normalizeText(
        `${product.name} ${product.category} ${product.producer}`,
      );

      const matchesSearch = productText.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      {/* PESQUISA */}
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
              placeholder="Buscar produto, serviço ou produtor..."
              className="h-[48px] w-full rounded-lg bg-white pl-11 pr-4 text-[13px] text-[#052F58] outline-none placeholder:text-[#9AA9BC] focus:ring-2 focus:ring-[#FF5A1F]/30"
            />
          </div>
        </div>
      </div>

      {/* VITRINE */}
      <section className="bg-[#F7F3EA] py-9">
        <div className="mx-auto max-w-[1050px] px-6">
          {/* FILTROS */}
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

          {/* RESULTADOS */}
          <p className="mb-6 mt-9 text-[10px] font-black uppercase tracking-[1.4px] text-[#748BA3]">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "item encontrado"
              : "itens encontrados"}
          </p>

          {/* CARDS */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#D5DEE7] bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-extrabold text-[#052F58]">
                Nenhum item encontrado
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
