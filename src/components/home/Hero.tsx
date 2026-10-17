import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-pattern relative overflow-hidden bg-[#0A355F] text-white">
      <div className="relative z-10 mx-auto grid min-h-[474px] max-w-[1050px] items-center gap-12 px-6 py-12 lg:grid-cols-[53%_47%] lg:py-0">
        {/* TEXTO */}
        <div>
          <p className="mb-3 text-[11px] font-black uppercase tracking-[1.5px] text-[#FF7246]">
            Feira Conectada
          </p>

          <h1 className="max-w-[570px] text-[48px] font-extrabold leading-[0.95] tracking-[-2.5px] sm:text-[58px] lg:text-[72px] lg:tracking-[-4px]">
            Perto de você.
            <span className="block text-[#FF7246]">Feito por aqui.</span>
          </h1>

          <p className="mt-7 max-w-[470px] text-[14px] leading-6 text-[#E2E9F0]">
            Descubra produtores, produtos e serviços de quem movimenta nossa
            cidade. Tudo em um só lugar, simples e perto de você.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/vitrine"
              className="inline-flex h-[42px] items-center justify-center rounded-lg bg-[#FF5A1F] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#EF4E12]"
            >
              Explorar vitrine
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/produtores"
              className="inline-flex h-[42px] items-center justify-center rounded-lg border border-white/40 px-5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ver produtores
            </Link>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="relative min-h-[390px] w-full lg:min-h-[474px]">
          <div className="absolute right-0 top-6 h-[355px] w-[94%] overflow-hidden rounded-xl shadow-2xl sm:h-[385px] lg:w-[402px]">
            <Image
              src="/assets/feira-hero.jpg"
              alt="Feira com frutas, verduras e produtos locais"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* CARD FLUTUANTE */}
          <div className="absolute bottom-4 left-0 w-[165px] rounded-lg bg-[#F7F3EA] p-4 text-[#052F58] shadow-xl lg:bottom-[45px]">
            <strong className="block text-3xl font-extrabold leading-none">
              86
            </strong>

            <span className="mt-2 block text-[11px] font-extrabold leading-tight">
              negócios locais
              <br />
              conectados
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
