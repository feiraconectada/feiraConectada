import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-[#F7F3EA] py-16">
      <div className="mx-auto max-w-[1050px] px-6">
        <div className="mb-9">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
            Explore
          </p>

          <h2 className="text-3xl font-extrabold tracking-[-1.5px] text-[#052F58] sm:text-4xl">
            O que você procura hoje?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/vitrine?categoria=${category.slug}`}
              className="rounded-xl border border-[#D5DEE7] bg-white p-5 transition hover:-translate-y-1 hover:border-[#07528A] hover:shadow-md"
            >
              <span className="text-[16px] font-extrabold text-[#052F58]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
