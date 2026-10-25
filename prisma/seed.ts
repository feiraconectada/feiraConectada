import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL não está configurada.");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  {
    name: "Hortifruti",
    slug: "hortifruti",
  },
  {
    name: "Refeições e lanches",
    slug: "refeicoes-e-lanches",
  },
  {
    name: "Acessórios",
    slug: "acessorios",
  },
  {
    name: "Perfumaria",
    slug: "perfumaria",
  },
  {
    name: "Cosméticos",
    slug: "cosmeticos",
  },
  {
    name: "Serviços de beleza",
    slug: "servicos-de-beleza",
  },
  {
    name: "Serviços mecânicos",
    slug: "servicos-mecanicos",
  },
  {
    name: "Serviços residenciais",
    slug: "servicos-residenciais",
  },
];

const commercializationMethods = [
  {
    name: "Ponto em feira",
    slug: "ponto-em-feira",
  },
  {
    name: "Consumo no local",
    slug: "consumo-no-local",
  },
  {
    name: "Retirada no local",
    slug: "retirada-no-local",
  },
  {
    name: "Entrega à domicílio",
    slug: "entrega-a-domicilio",
  },
  {
    name: "Envio por correios",
    slug: "envio-por-correios",
  },
  {
    name: "Atendimento no local",
    slug: "atendimento-no-local",
  },
  {
    name: "Atendimento à domicílio",
    slug: "atendimento-a-domicilio",
  },
];

async function main() {
  console.log("Iniciando seed da Feira Conectada...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        active: true,
      },
      create: category,
    });
  }

  console.log("Categorias cadastradas.");

  for (const method of commercializationMethods) {
    await prisma.commercializationMethod.upsert({
      where: {
        slug: method.slug,
      },
      update: {
        name: method.name,
        active: true,
      },
      create: method,
    });
  }

  console.log("Formas de comercialização cadastradas.");
  console.log("Seed concluído com sucesso.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error("Erro ao executar seed:", error);

    await prisma.$disconnect();
    await pool.end();

    process.exit(1);
  });
