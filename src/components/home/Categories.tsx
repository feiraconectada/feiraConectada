import Link from "next/link";

const categories = [
  {
    name: "Comida",
    count: "24 opções",
    category: "Comida",
    icon: "spark",
  },
  {
    name: "Artesanato",
    count: "18 opções",
    category: "Artesanato",
    icon: "circle",
  },
  {
    name: "Serviços",
    count: "16 opções",
    category: "Serviços",
    icon: "bolt",
  },
  {
    name: "Roupas",
    count: "12 opções",
    category: "Roupas",
    icon: "diamond",
  },
  {
    name: "Utilidades",
    count: "16 opções",
    category: "Utilidades",
    icon: "square",
  },
];

function CategoryIcon({ type }: { type: string }) {
  if (type === "spark") {
    return <span className="text-2xl font-bold text-[#FF5A1F]">✦</span>;
  }

  if (type === "circle") {
    return (
      <span className="block h-5 w-5 rounded-full border-2 border-[#FF5A1F]" />
    );
  }

  if (type === "bolt") {
    return <span className="text-2xl font-bold text-[#FF5A1F]">ϟ</span>;
  }

  if (type === "diamond") {
    return (
      <span className="block h-4 w-4 rotate-45 border-2 border-[#FF5A1F]" />
    );
  }

  return <span className="block h-4 w-4 border-2 border-[#FF5A1F]" />;
}

export default function Categories() {
  return (
    <section className="bg-[#F7F3EA] py-16">
      <div className="mx-auto max-w-[1050px] px-6">
        {/* CABEÇALHO */}
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
              Explore
            </p>

            <h2 className="text-3xl font-extrabold tracking-[-1.5px] text-[#052F58] sm:text-4xl">
              O que você procura hoje?
            </h2>
          </div>

          <Link
            href="/vitrine"
            className="text-sm font-extrabold text-[#07528A] transition hover:text-[#FF5A1F]"
          >
            Ver tudo →
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={`/vitrine?categoria=${encodeURIComponent(item.category)}`}
              className="group flex min-h-[130px] flex-col rounded-xl border border-[#D5DEE7] bg-white p-5 transition hover:-translate-y-1 hover:border-[#07528A] hover:shadow-md"
            >
              <div className="mb-7 flex h-6 items-center">
                <CategoryIcon type={item.icon} />
              </div>

              <span className="text-[16px] font-extrabold text-[#052F58]">
                {item.name}
              </span>

              <span className="mt-2 text-[11px] text-[#8293AA]">
                {item.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
