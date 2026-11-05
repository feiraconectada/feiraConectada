import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import AudienceSection from "@/components/home/AudienceSection";

import { getCategories } from "@/data/categories";
import { getProducerCount } from "@/data/producers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, producerCount] = await Promise.all([
    getCategories(),
    getProducerCount(),
  ]);

  return (
    <>
      <Hero producerCount={producerCount} />

      <Categories categories={categories} />

      <AudienceSection />
    </>
  );
}
