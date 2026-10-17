import ProducersContent from "@/components/produtores/ProducersContent";

import { producers } from "@/data/producers";

export default function ProdutoresPage() {
  return (
    <>
      <section className="hero-pattern relative overflow-hidden bg-[#0A355F] text-white">
        <div className="relative z-10 mx-auto max-w-[1050px] px-6 pb-7 pt-10">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#FF7246]">
            Produtores locais
          </p>

          <h1 className="text-[42px] font-extrabold leading-none tracking-[-2px] sm:text-[54px]">
            Gente que faz.
            <br />
            <span className="text-[#FF7246]">Perto de você.</span>
          </h1>

          <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-[#DCE7F0]">
            Conheça produtores, artesãos, comerciantes e prestadores de serviços
            que movimentam nossa comunidade.
          </p>
        </div>
      </section>

      <ProducersContent producers={producers} />
    </>
  );
}
