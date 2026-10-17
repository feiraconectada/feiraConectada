import ProductsContent from "@/components/vitrine/ProductsContent";

import { products } from "@/data/products";

interface VitrinePageProps {
  searchParams: Promise<{
    categoria?: string | string[];
  }>;
}

const validCategories = [
  "Comida",
  "Artesanato",
  "Serviços",
  "Roupas",
  "Utilidades",
];

export default async function VitrinePage({ searchParams }: VitrinePageProps) {
  const params = await searchParams;

  const categoryParam = Array.isArray(params.categoria)
    ? params.categoria[0]
    : params.categoria;

  const initialCategory =
    categoryParam && validCategories.includes(categoryParam)
      ? categoryParam
      : "Todos";

  return (
    <>
      {/* HERO */}
      <section className="hero-pattern relative overflow-hidden bg-[#0A355F] text-white">
        <div className="relative z-10 mx-auto max-w-[1050px] px-6 pb-7 pt-10">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#FF7246]">
            Vitrine local
          </p>

          <h1 className="text-[42px] font-extrabold leading-none tracking-[-2px] sm:text-[54px]">
            Escolha local.
            <br />
            <span className="text-[#FF7246]">Valorize quem faz.</span>
          </h1>

          <p className="mt-4 max-w-[610px] text-[13px] leading-6 text-[#DCE7F0]">
            Encontre produtos e serviços oferecidos por produtores,
            comerciantes, artesãos e profissionais da nossa comunidade.
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
