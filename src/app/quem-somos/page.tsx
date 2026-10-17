import Image from "next/image";

export default function QuemSomosPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-pattern relative overflow-hidden bg-[#0A355F] text-white">
        <div className="relative z-10 mx-auto max-w-[1050px] px-6 py-12">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#FF7246]">
            Quem somos
          </p>

          <h1 className="text-[42px] font-extrabold leading-none tracking-[-2px] sm:text-[54px]">
            Conexões que
            <br />
            <span className="text-[#FF7246]">fortalecem o local.</span>
          </h1>

          <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-[#DCE7F0]">
            Um projeto criado para aproximar pessoas, produtores e negócios da
            nossa comunidade.
          </p>
        </div>
      </section>

      {/* SOBRE */}
      <section className="bg-[#F7F3EA] py-14">
        <div className="mx-auto grid max-w-[1050px] gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
              Feira Conectada
            </p>

            <h2 className="text-[30px] font-extrabold tracking-[-1px] text-[#052F58]">
              Tecnologia aproximando pessoas e negócios.
            </h2>
          </div>

          <div className="space-y-5 text-[14px] leading-7 text-[#5F7590]">
            <p>
              O Feira Conectada nasceu com a proposta de criar uma vitrine
              digital para produtores, comerciantes, artesãos e prestadores de
              serviços locais.
            </p>

            <p>
              A plataforma busca facilitar a descoberta de produtos e serviços
              disponíveis na própria cidade, aproximando consumidores de quem
              produz e trabalha localmente.
            </p>

            <p>
              Além de facilitar essa conexão, o projeto busca contribuir para a
              valorização do comércio local, ampliar a visibilidade dos pequenos
              negócios e incentivar a circulação da economia dentro da
              comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* PARCERIA */}
      <section className="border-t border-[#D5DEE7] bg-white py-12">
        <div className="mx-auto flex max-w-[1050px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
              Parceria
            </p>

            <h2 className="text-[25px] font-extrabold tracking-[-1px] text-[#052F58]">
              Instituto Federal de São Paulo
            </h2>

            <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-[#5F7590]">
              Projeto desenvolvido em parceria com o Instituto Federal de
              Educação, Ciência e Tecnologia de São Paulo – Câmpus Catanduva.
            </p>
          </div>

          <Image
            src="/assets/logo-ifsp-catanduva.png"
            alt="Instituto Federal de São Paulo - Câmpus Catanduva"
            width={220}
            height={100}
            className="h-auto w-[200px]"
          />
        </div>
      </section>
    </>
  );
}
