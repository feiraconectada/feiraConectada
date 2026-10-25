import ProductsContent from "@/components/vitrine/ProductsContent";

import { getProducts } from "@/data/products";

export const dynamic = "force-dynamic";

interface VitrinePageProps {
  searchParams: Promise<{
    categoria?: string | string[];
  }>;
}

export default async function VitrinePage({ searchParams }: VitrinePageProps) {
  const params = await searchParams;

  const categoryParam = Array.isArray(params.categoria)
    ? params.categoria[0]
    : params.categoria;

  const initialCategory = categoryParam?.trim() || "todos";

  const products = await getProducts();

  return (
    <>
      <section className="hero-pattern bg-[#0A355F] py-16 text-white">
        <div className="mx-auto max-w-[1150px] px-6">
          <p className="mb-3 text-[11px] font-black uppercase tracking-[1.5px] text-[#FF7246]">
            Vitrine local
          </p>

          <h1 className="mb-4 max-w-2xl text-4xl font-black tracking-[-1.8px] sm:text-5xl">
            Produtos e serviços feitos por aqui.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white/75">
            Conheça produtos e serviços oferecidos por negócios locais e
            encontre o que você precisa perto de você.
          </p>
        </div>
      </section>

      <ProductsContent
        key={initialCategory}
        products={products}
        initialCategory={initialCategory}
      />
    </>
  );
}
