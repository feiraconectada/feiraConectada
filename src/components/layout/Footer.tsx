import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A355F] text-white">
      <div className="mx-auto max-w-[1050px] px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          {/* FEIRA CONECTADA */}
          <div>
            <Image
              src="/assets/logo-feira-header.png"
              alt="Feira Conectada"
              width={155}
              height={55}
              className="brightness-0 invert"
            />

            <p className="mt-4 max-w-[250px] text-xs leading-relaxed text-white/70">
              Conectando produtores, comerciantes, prestadores de serviços e
              consumidores locais.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-3 text-sm text-white/80">
            <Link href="/" className="transition hover:text-[#FF7246]">
              Início
            </Link>

            <Link
              href="/produtores"
              className="transition hover:text-[#FF7246]"
            >
              Produtores
            </Link>

            <Link href="/vitrine" className="transition hover:text-[#FF7246]">
              Vitrine
            </Link>

            <Link href="/cadastro" className="transition hover:text-[#FF7246]">
              Quero anunciar
            </Link>
          </div>

          {/* IFSP */}
          <div className="md:text-right">
            <p className="mb-3 text-xs text-white/70">
              Projeto em parceria com
            </p>

            <div className="md:flex md:justify-end">
              <Image
                src="/assets/logo-ifsp-catanduva.png"
                alt="Instituto Federal de São Paulo - Câmpus Catanduva"
                width={90}
                height={80}
                className="h-auto max-w-[180px]"
              />
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-white/60">
              Instituto Federal de São Paulo
              <br />
              Câmpus Catanduva
            </p>
          </div>
        </div>

        {/* LINHA FINAL */}
        <div className="mt-9 border-t border-white/10 pt-5">
          <p className="text-center text-[11px] text-white/40">
            © {new Date().getFullYear()} Feira Conectada. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
