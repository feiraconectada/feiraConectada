import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number | null) {
  if (price === null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produtores/${product.producerSlug}`}
      className="group block h-full"
      aria-label={`Ver produtor ${product.producer}`}
    >
      <article className="h-full overflow-hidden rounded-2xl border border-[#D5DEE7] bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-[#0A355F] group-hover:shadow-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8F2F5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-x-4 bottom-4 translate-y-2 rounded-lg bg-[#052F58]/95 px-4 py-2.5 text-center text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Clique para ver produtor
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[11px] font-black uppercase tracking-[1px] text-[#FF5A1F]">
              {product.categoryName}
            </span>

            <span className="rounded-full bg-[#E8F2F5] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.5px] text-[#0A355F]">
              {product.type === "SERVICE" ? "Serviço" : "Produto"}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-extrabold tracking-[-0.5px] text-[#052F58]">
            {product.name}
          </h2>

          <p className="mb-3 text-sm font-semibold text-[#5F7590]">
            por{" "}
            <span className="font-extrabold text-[#0A355F]">
              {product.producer}
            </span>
          </p>

          {product.description && (
            <p className="mb-4 text-sm leading-6 text-[#5F7590]">
              {product.description}
            </p>
          )}

          <div className="flex items-end justify-between gap-4">
            <p className="text-lg font-black text-[#052F58]">
              {formatPrice(product.price)}
            </p>

            <span className="text-xs font-bold text-[#0A355F] opacity-0 transition group-hover:opacity-100">
              Ver produtor →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
