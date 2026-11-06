import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface LikeRequest {
  visitorId?: string;
}

function isValidVisitorId(visitorId: string) {
  return visitorId.length >= 10 && visitorId.length <= 64;
}

// ======================================================
// CONSULTAR CURTIDAS
// ======================================================

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const params = await context.params;

    const producerId = Number(params.id);

    if (!Number.isInteger(producerId) || producerId <= 0) {
      return NextResponse.json(
        {
          message: "Produtor inválido.",
        },
        {
          status: 400,
        },
      );
    }

    const producer = await prisma.producer.findUnique({
      where: {
        id: producerId,
      },

      select: {
        id: true,
        active: true,
      },
    });

    if (!producer || !producer.active) {
      return NextResponse.json(
        {
          message: "Produtor não encontrado.",
        },
        {
          status: 404,
        },
      );
    }

    const url = new URL(request.url);

    const visitorId = url.searchParams.get("visitorId");

    const count = await prisma.producerLike.count({
      where: {
        producerId,
      },
    });

    if (!visitorId || !isValidVisitorId(visitorId)) {
      return NextResponse.json({
        liked: false,
        count,
      });
    }

    const like = await prisma.producerLike.findUnique({
      where: {
        producerId_visitorId: {
          producerId,
          visitorId,
        },
      },
    });

    return NextResponse.json({
      liked: Boolean(like),
      count,
    });
  } catch (error) {
    console.error("Erro ao consultar curtidas do produtor:", error);

    return NextResponse.json(
      {
        message: "Não foi possível consultar as curtidas.",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================================================
// CURTIR / DESCURTIR
// ======================================================

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const params = await context.params;

    const producerId = Number(params.id);

    if (!Number.isInteger(producerId) || producerId <= 0) {
      return NextResponse.json(
        {
          message: "Produtor inválido.",
        },
        {
          status: 400,
        },
      );
    }

    const body = (await request.json()) as LikeRequest;

    const visitorId = body.visitorId?.trim();

    if (!visitorId || !isValidVisitorId(visitorId)) {
      return NextResponse.json(
        {
          message: "Identificação do visitante inválida.",
        },
        {
          status: 400,
        },
      );
    }

    const producer = await prisma.producer.findUnique({
      where: {
        id: producerId,
      },

      select: {
        id: true,
        active: true,
      },
    });

    if (!producer || !producer.active) {
      return NextResponse.json(
        {
          message: "Produtor não encontrado.",
        },
        {
          status: 404,
        },
      );
    }

    const result = await prisma.$transaction(async (transaction) => {
      const existingLike = await transaction.producerLike.findUnique({
        where: {
          producerId_visitorId: {
            producerId,
            visitorId,
          },
        },
      });

      let liked: boolean;

      // Se já curtiu, remove a curtida
      if (existingLike) {
        await transaction.producerLike.delete({
          where: {
            producerId_visitorId: {
              producerId,
              visitorId,
            },
          },
        });

        liked = false;
      }

      // Se ainda não curtiu, cria a curtida
      else {
        await transaction.producerLike.create({
          data: {
            producerId,
            visitorId,
          },
        });

        liked = true;
      }

      const count = await transaction.producerLike.count({
        where: {
          producerId,
        },
      });

      return {
        liked,
        count,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao registrar curtida do produtor:", error);

    return NextResponse.json(
      {
        message: "Não foi possível registrar a curtida.",
      },
      {
        status: 500,
      },
    );
  }
}
