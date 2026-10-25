"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/vitrine/ProductCard";

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

export default function ProductsContent({
  products,
  initialCategory = "todos",
}: ProductsContentProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "todos" ||
        product.categorySlug === selectedCategory;

      const searchableText = normalizeText(
        [
          product.name,
          product.description ?? "",
          product.producer,
          product.categoryName,
        ].join(" "),
      );

      const matchesSearch =
        normalizedSearch === "" || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      <section className="border-b border-[#D5DEE7] bg-white">
        <div className="mx-auto max-w-[1150px] px-6 py-8">
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="product-search"
                className="mb-2 block text-sm font-bold text-[#052F58]"
              >
                Pesquisar produtos e serviços
              </label>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Busque por produto, serviço, produtor ou categoria..."
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
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "item encontrado"
                : "itens encontrados"}
            </p>
          </div>

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
                Tente outra pesquisa ou selecione uma categoria diferente.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
