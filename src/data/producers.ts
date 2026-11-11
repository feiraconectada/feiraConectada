import { prisma } from "@/lib/prisma";

import type { Producer, ProducerDetails } from "@/types/producer";

// ======================================================
// QUANTIDADE DE PRODUTORES ATIVOS
// ======================================================

export async function getProducerCount(): Promise<number> {
  return prisma.producer.count({
    where: {
      active: true,
    },
  });
}

// ======================================================
// LISTAGEM DE PRODUTORES
// ======================================================

export async function getProducers(): Promise<Producer[]> {
  const producers = await prisma.producer.findMany({
    where: {
      active: true,
    },

    include: {
      categories: {
        include: {
          category: true,
        },
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return producers.map((producer) => ({
    id: producer.id,

    name: producer.name,

    slug: producer.slug,

    description:
      producer.offeringsSummary ??
      "Conheça os produtos e serviços deste negócio local.",

    location: producer.locationDescription ?? producer.address ?? null,

    phone: producer.phone,

    likeCount: producer._count.likes,

    image: producer.imageUrl ?? "/assets/logo-feira-original.png",

    categories: producer.categories
      .filter((producerCategory) => producerCategory.category.active)
      .map((producerCategory) => ({
        id: producerCategory.category.id,
        name: producerCategory.category.name,
        slug: producerCategory.category.slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
  }));
}

// ======================================================
// PRODUTOR INDIVIDUAL
// ======================================================

export async function getProducerBySlug(
  slug: string,
): Promise<ProducerDetails | null> {
  const producer = await prisma.producer.findUnique({
    where: {
      slug,
    },

    include: {
      categories: {
        include: {
          category: true,
        },
      },

      commercializationMethods: {
        include: {
          method: true,
        },
      },

      socialLinks: true,

      listings: {
        where: {
          active: true,
        },

        include: {
          category: true,
        },

        orderBy: {
          name: "asc",
        },
      },

      // ==================================================
      // GALERIA
      // ==================================================

      galleryImages: {
        where: {
          active: true,
        },

        orderBy: [
          {
            position: "asc",
          },
          {
            id: "asc",
          },
        ],
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!producer || !producer.active) {
    return null;
  }

  return {
    id: producer.id,

    name: producer.name,

    slug: producer.slug,

    description:
      producer.offeringsSummary ??
      "Conheça os produtos e serviços deste negócio local.",

    location: producer.locationDescription ?? producer.address ?? null,

    phone: producer.phone,

    email: producer.email,

    likeCount: producer._count.likes,

    image: producer.imageUrl ?? "/assets/logo-feira-original.png",

    hasFixedLocation: producer.hasFixedLocation,

    address: producer.address,

    categories: producer.categories
      .filter((producerCategory) => producerCategory.category.active)
      .map((producerCategory) => ({
        id: producerCategory.category.id,
        name: producerCategory.category.name,
        slug: producerCategory.category.slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),

    commercializationMethods: producer.commercializationMethods
      .filter((producerMethod) => producerMethod.method.active)
      .map((producerMethod) => ({
        id: producerMethod.method.id,
        name: producerMethod.method.name,
        slug: producerMethod.method.slug,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),

    socialLinks: producer.socialLinks
      .map((socialLink) => ({
        id: socialLink.id,
        network: socialLink.network,
        url: socialLink.url,
      }))
      .sort((a, b) => a.network.localeCompare(b.network, "pt-BR")),

    listings: producer.listings
      .filter((listing) => listing.category.active)
      .map((listing) => ({
        id: listing.id,

        name: listing.name,

        description: listing.description,

        type: listing.type,

        price: listing.price !== null ? Number(listing.price) : null,

        image:
          listing.imageUrl ??
          producer.imageUrl ??
          "/assets/logo-feira-original.png",

        categoryName: listing.category.name,

        categorySlug: listing.category.slug,
      })),

    // ==================================================
    // GALERIA
    // ==================================================

    galleryImages: producer.galleryImages.map((galleryImage) => ({
      id: galleryImage.id,

      image: galleryImage.imageUrl,

      caption: galleryImage.caption,

      position: galleryImage.position,
    })),
  };
}
