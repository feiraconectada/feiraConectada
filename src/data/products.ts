import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Cesta da semana",
    category: "Comida",
    producer: "Horta da Nena",
    price: 42,
    image: "/assets/vitrine/cesta-semana.png",
  },
  {
    id: 2,
    name: "Bolo de milho cremoso",
    category: "Comida",
    producer: "Dona Cida Quitutes",
    price: 28,
    image: "/assets/vitrine/bolo-milho.png",
  },
  {
    id: 3,
    name: "Vaso linha terra",
    category: "Artesanato",
    producer: "Barro do Horizonte",
    price: 68,
    image: "/assets/vitrine/vaso-linha-terra.png",
  },
  {
    id: 4,
    name: "Camisa bordada",
    category: "Roupas",
    producer: "Ateliê Canto Azul",
    price: 95,
    image: "/assets/vitrine/camisa-bordada.png",
  },
  {
    id: 5,
    name: "Tábua de servir",
    category: "Utilidades",
    producer: "Marcenaria do Zé",
    price: 74,
    image: "/assets/vitrine/tabua-servir.png",
  },
  {
    id: 6,
    name: "Reparo em casa",
    category: "Serviços",
    producer: "Conserta Aqui",
    price: null,
    image: "/assets/vitrine/reparo-casa.png",
  },
];
