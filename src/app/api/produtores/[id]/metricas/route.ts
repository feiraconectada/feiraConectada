import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type MetricType = "profile_view" | "whatsapp_click" | "social_click";

interface MetricRequest {
  type?: MetricType;
}

function getCurrentSaoPauloDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;

  const month = parts.find((part) => part.type === "month")?.value;

  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Não foi possível determinar a data atual.");
  }

  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
}

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

    const body = (await request.json()) as MetricRequest;

    const type = body.type;

    if (
      type !== "profile_view" &&
      type !== "whatsapp_click" &&
      type !== "social_click"
    ) {
      return NextResponse.json(
        {
          message: "Tipo de métrica inválido.",
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

    const date = getCurrentSaoPauloDate();

    if (type === "profile_view") {
      await prisma.producerDailyMetric.upsert({
        where: {
          producerId_date: {
            producerId,
            date,
          },
        },

        create: {
          producerId,
          date,
          profileViews: 1,
        },

        update: {
          profileViews: {
            increment: 1,
          },
        },
      });
    }

    if (type === "whatsapp_click") {
      await prisma.producerDailyMetric.upsert({
        where: {
          producerId_date: {
            producerId,
            date,
          },
        },

        create: {
          producerId,
          date,
          whatsappClicks: 1,
        },

        update: {
          whatsappClicks: {
            increment: 1,
          },
        },
      });
    }

    if (type === "social_click") {
      await prisma.producerDailyMetric.upsert({
        where: {
          producerId_date: {
            producerId,
            date,
          },
        },

        create: {
          producerId,
          date,
          socialClicks: 1,
        },

        update: {
          socialClicks: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Erro ao registrar métrica do produtor:", error);

    return NextResponse.json(
      {
        message: "Não foi possível registrar a métrica.",
      },
      {
        status: 500,
      },
    );
  }
}
