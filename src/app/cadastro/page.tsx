import SignupForm from "@/components/cadastro/SignupForm";

export default function CadastroPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-pattern relative overflow-hidden bg-[#0A355F] text-white">
        <div className="relative z-10 mx-auto max-w-[1050px] px-6 py-12">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#FF7246]">
            Faça parte
          </p>

          <h1 className="text-[42px] font-extrabold leading-none tracking-[-2px] sm:text-[54px]">
            Leve seu trabalho
            <br />
            <span className="text-[#FF7246]">mais longe.</span>
          </h1>

          <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-[#DCE7F0]">
            Divulgue seu negócio, seus produtos ou serviços e conecte-se com
            pessoas que valorizam quem faz acontecer localmente.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="bg-[#F7F3EA] py-14">
        <div className="mx-auto grid max-w-[1050px] gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* EXPLICAÇÃO */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[1.4px] text-[#07528A]">
              Como funciona
            </p>

            <h2 className="text-[30px] font-extrabold tracking-[-1px] text-[#052F58]">
              Anuncie na Feira Conectada
            </h2>

            <p className="mt-5 max-w-[520px] text-[14px] leading-7 text-[#5F7590]">
              Se você é produtor, comerciante, artesão ou prestador de serviços
              local, pode solicitar seu cadastro na plataforma.
            </p>

            <ol className="mt-8 space-y-6">
              <li className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A355F] text-sm font-bold text-white">
                  1
                </span>

                <div>
                  <strong className="text-sm text-[#052F58]">
                    Preencha seus dados
                  </strong>

                  <p className="mt-1 text-[12px] text-[#8293AA]">
                    Informe nome, telefone e e-mail.
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A355F] text-sm font-bold text-white">
                  2
                </span>

                <div>
                  <strong className="text-sm text-[#052F58]">
                    Nossa equipe entra em contato
                  </strong>

                  <p className="mt-1 text-[12px] text-[#8293AA]">
                    Vamos conhecer melhor seu negócio.
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A355F] text-sm font-bold text-white">
                  3
                </span>

                <div>
                  <strong className="text-sm text-[#052F58]">
                    Seu negócio entra na plataforma
                  </strong>

                  <p className="mt-1 text-[12px] text-[#8293AA]">
                    Após aprovação, produtos e serviços poderão ser divulgados.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* FORM */}
          <SignupForm />
        </div>
      </section>
    </>
  );
}
