import { prisma } from "@/lib/prisma";

import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const listings = await prisma.listing.findMany({
    where: {
      active: true,
    },

    include: {
      category: true,
      producer: true,
    },

    orderBy: {
      name: "asc",
    },
  });

  return listings
    .filter((listing) => listing.producer.active && listing.category.active)
    .map((listing) => ({
      id: listing.id,

      name: listing.name,

      description: listing.description,

      type: listing.type,

      categoryName: listing.category.name,

      categorySlug: listing.category.slug,

      producer: listing.producer.name,

      producerSlug: listing.producer.slug,

      image:
        listing.imageUrl ??
        listing.producer.imageUrl ??
        "/assets/logo-feira-original.png",

      price: listing.price !== null ? Number(listing.price) : null,
    }));
}
