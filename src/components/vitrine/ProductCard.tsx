import Image from "next/image";

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
    <article className="group min-w-0">
      {/* IMAGEM */}
      <div className="relative aspect-[302/243] overflow-hidden rounded-xl bg-[#E8F2F5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* INFORMAÇÕES */}
      <div className="flex items-start justify-between gap-4 pt-3">
        <div className="min-w-0">
          <span className="text-[9px] font-black uppercase tracking-[0.4px] text-[#07528A]">
            {product.category}
          </span>

          <h2 className="mt-1 truncate text-[18px] font-extrabold tracking-[-0.5px] text-[#052F58]">
            {product.name}
          </h2>

          <p className="mt-1 text-[12px] text-[#6D8198]">
            por {product.producer}
          </p>
        </div>

        <span className="shrink-0 rounded-md bg-[#FFE8D8] px-2 py-1.5 text-[11px] font-black text-[#E4470F]">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}
