import ProducersContent from "@/components/produtores/ProducersContent";

import { getProducers } from "@/data/producers";

export const dynamic = "force-dynamic";

export default async function ProducersPage() {
  const producers = await getProducers();

  return (
    <>
      <section className="hero-pattern bg-[#0A355F] py-16 text-white">
        <div className="mx-auto max-w-[1150px] px-6">
          <p className="mb-3 text-[11px] font-black uppercase tracking-[1.5px] text-[#FF7246]">
            Feira Conectada
          </p>

          <h1 className="mb-4 max-w-2xl text-4xl font-black tracking-[-1.8px] sm:text-5xl">
            Conheça quem faz acontecer por aqui.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white/75">
            Descubra produtores, comerciantes e prestadores de serviços locais e
            fortaleça a economia da nossa região.
          </p>
        </div>
      </section>

      <ProducersContent producers={producers} />
    </>
  );
}
