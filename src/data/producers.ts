import type { Producer } from "@/types/producer";

export const producers: Producer[] = [
  {
    id: 1,
    name: "Horta da Nena",
    category: "Comida",
    description:
      "Hortaliças colhidas pela manhã, temperos e cestas da estação.",
    image: "/assets/produtores/horta-nena.png",
  },
  {
    id: 2,
    name: "Dona Cida Quitutes",
    category: "Comida",
    description: "Bolos, pães caseiros e receitas que atravessam gerações.",
    image: "/assets/produtores/dona-cida.png",
  },
  {
    id: 3,
    name: "Barro do Horizonte",
    category: "Artesanato",
    description: "Cerâmicas autorais feitas à mão em pequenas tiragens.",
    image: "/assets/produtores/barro-horizonte.png",
  },
  {
    id: 4,
    name: "Ateliê Canto Azul",
    category: "Roupas",
    description: "Peças em algodão, ajustes e bordados personalizados.",
    image: "/assets/produtores/atelie-canto-azul.png",
  },
  {
    id: 5,
    name: "Marcenaria do Zé",
    category: "Utilidades",
    description: "Tábuas, bancos e pequenos reparos em madeira maciça.",
    image: "/assets/produtores/marcenaria-ze.png",
  },
  {
    id: 6,
    name: "Conserta Aqui",
    category: "Serviços",
    description: "Manutenção de eletrodomésticos com atendimento em domicílio.",
    image: "/assets/produtores/conserta-aqui.png",
  },
];
