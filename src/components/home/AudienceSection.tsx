import Link from "next/link";

export default function AudienceSection() {
  return (
    <section className="grid border-t border-[#DCE4E9] lg:grid-cols-2">
      {/* PRODUTOR */}
      <div className="flex min-h-[280px] items-center bg-white">
        <div className="mx-auto w-full max-w-[525px] px-8 py-12 lg:px-12">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
            Para quem produz
          </p>

          <h2 className="max-w-[400px] text-[28px] font-extrabold leading-tight tracking-[-1px] text-[#052F58]">
            Seu trabalho merece ser encontrado.
          </h2>

          <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-[#5F7590]">
            Divulgue seus produtos ou serviços e aproxime seu negócio de pessoas
            que valorizam quem produz localmente.
          </p>

          <Link
            href="/cadastro"
            className="mt-6 inline-block text-sm font-extrabold text-[#07528A] transition hover:text-[#FF5A1F]"
          >
            Quero me cadastrar →
          </Link>
        </div>
      </div>

      {/* COMPRADOR */}
      <div className="flex min-h-[280px] items-center bg-[#E8F2F5]">
        <div className="mx-auto w-full max-w-[525px] px-8 py-12 lg:px-12">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
            Para quem compra
          </p>

          <h2 className="max-w-[400px] text-[28px] font-extrabold leading-tight tracking-[-1px] text-[#052F58]">
            Descubra o que existe perto de você.
          </h2>

          <p className="mt-5 max-w-[420px] text-[14px] leading-6 text-[#5F7590]">
            Encontre produtos, serviços e produtores locais de forma simples,
            rápida e organizada.
          </p>

          <Link
            href="/vitrine"
            className="mt-6 inline-block text-sm font-extrabold text-[#07528A] transition hover:text-[#FF5A1F]"
          >
            Explorar a vitrine →
          </Link>
        </div>
      </div>
    </section>
  );
}
