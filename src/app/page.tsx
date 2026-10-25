import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import AudienceSection from "@/components/home/AudienceSection";

import { getCategories } from "@/data/categories";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Hero />

      <Categories categories={categories} />

      <AudienceSection />
    </>
  );
}
