"use client";

import { useEffect, useRef, useState } from "react";

export interface FilterCategory {
  name: string;
  slug: string;
}

export type SortOrder = "" | "asc" | "desc" | "likes";

interface FilterBarProps {
  searchId: string;

  searchLabel: string;

  searchPlaceholder: string;

  search: string;

  onSearchChange: (value: string) => void;

  categories: FilterCategory[];

  selectedCategories: string[];

  onToggleCategory: (slug: string) => void;

  sortOrder: SortOrder;

  onSortChange: (value: SortOrder) => void;

  onClear: () => void;

  hasActiveFilters: boolean;

  showLikeSort?: boolean;
}

export default function FilterBar({
  searchId,
  searchLabel,
  searchPlaceholder,
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  sortOrder,
  onSortChange,
  onClear,
  hasActiveFilters,
  showLikeSort = false,
}: FilterBarProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedNames = categories
    .filter((category) => selectedCategories.includes(category.slug))
    .map((category) => category.name);

  let categoryLabel = "Todas as categorias";

  if (selectedNames.length === 1) {
    categoryLabel = selectedNames[0];
  }

  if (selectedNames.length > 1) {
    categoryLabel = `${selectedNames.length} categorias selecionadas`;
  }

  return (
    <section className="border-b border-[#D5DEE7] bg-white">
      <div className="mx-auto max-w-[1150px] px-6 py-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px_190px_auto] lg:items-end">
          {/* PESQUISA */}
          <div>
            <label
              htmlFor={searchId}
              className="mb-2 block text-sm font-bold text-[#052F58]"
            >
              {searchLabel}
            </label>

            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-[46px] w-full rounded-xl border border-[#D5DEE7] bg-white px-4 text-sm text-[#052F58] outline-none transition placeholder:text-[#8293AA] focus:border-[#0A355F] focus:ring-2 focus:ring-[#0A355F]/10"
            />
          </div>

          {/* CATEGORIAS */}
          <div ref={dropdownRef} className="relative">
            <p className="mb-2 text-sm font-bold text-[#052F58]">Categorias</p>

            <button
              type="button"
              onClick={() => setCategoriesOpen((current) => !current)}
              aria-expanded={categoriesOpen}
              className="flex h-[46px] w-full items-center justify-between gap-3 rounded-xl border border-[#D5DEE7] bg-white px-4 text-left text-sm font-semibold text-[#052F58] transition hover:border-[#0A355F]"
            >
              <span className="truncate">{categoryLabel}</span>

              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 shrink-0 transition ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[#D5DEE7] bg-white p-2 shadow-xl">
                {categories.map((category) => {
                  const checked = selectedCategories.includes(category.slug);

                  return (
                    <label
                      key={category.slug}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#052F58] transition hover:bg-[#E8F2F5]"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleCategory(category.slug)}
                        className="h-4 w-4 accent-[#0A355F]"
                      />

                      <span>{category.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* ORDENAÇÃO */}
          <div>
            <label
              htmlFor={`${searchId}-sort`}
              className="mb-2 block text-sm font-bold text-[#052F58]"
            >
              Ordenar por
            </label>

            <select
              id={`${searchId}-sort`}
              value={sortOrder}
              onChange={(event) =>
                onSortChange(event.target.value as SortOrder)
              }
              className="h-[46px] w-full rounded-xl border border-[#D5DEE7] bg-white px-4 text-sm font-semibold text-[#052F58] outline-none transition focus:border-[#0A355F]"
            >
              <option value="">Aleatório</option>

              <option value="asc">A → Z</option>

              <option value="desc">Z → A</option>

              {showLikeSort && <option value="likes">Mais curtidos</option>}
            </select>
          </div>

          {/* LIMPAR */}
          <button
            type="button"
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="h-[46px] rounded-xl border border-[#D5DEE7] bg-white px-5 text-sm font-bold text-[#052F58] transition hover:border-[#FF5A1F] hover:text-[#FF5A1F] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </section>
  );
}
