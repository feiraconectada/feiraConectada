import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProducerViewTracker from "@/components/produtores/ProducerViewTracker";
import TrackedExternalLink from "@/components/produtores/TrackedExternalLink";

import { getProducerBySlug } from "@/data/producers";

export const dynamic = "force-dynamic";

interface ProducerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function createWhatsappUrl(phone: string) {
  const onlyNumbers = phone.replace(/\D/g, "");

  const number = onlyNumbers.startsWith("55")
    ? onlyNumbers
    : `55${onlyNumbers}`;

  return `https://wa.me/${number}`;
}

function formatPrice(price: number | null) {
  if (price === null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default async function ProducerPage({ params }: ProducerPageProps) {
  const { slug } = await params;

  const producer = await getProducerBySlug(slug);

  if (!producer) {
    notFound();
  }

  const whatsappUrl = producer.phone ? createWhatsappUrl(producer.phone) : null;

  return (
    <>
      <ProducerViewTracker producerId={producer.id} />

      <section className="bg-[#F7F3EA] py-6">
        <div className="mx-auto max-w-[1150px] px-6">
          <Link
            href="/produtores"
            className="text-sm font-bold text-[#0A355F] transition hover:text-[#FF5A1F]"
          >
            ← Voltar para produtores
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1150px] gap-10 px-6 py-12 lg:grid-cols-[420px_1fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#E8F2F5] shadow-sm">
              <Image
                src={producer.image}
                alt={producer.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap gap-2">
              {producer.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full bg-[#FFF0E9] px-3 py-1.5 text-xs font-black uppercase tracking-[0.6px] text-[#FF5A1F]"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-[-1.5px] text-[#052F58] sm:text-5xl">
              {producer.name}
            </h1>

            <p className="mb-6 max-w-2xl text-base leading-7 text-[#5F7590]">
              {producer.description}
            </p>

            {producer.location && (
              <div className="mb-6 flex items-start gap-3 rounded-xl bg-[#F7F3EA] p-4">
                <span className="text-lg" aria-hidden="true">
                  📍
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.7px] text-[#8293AA]">
                    Onde encontrar
                  </p>

                  <p className="mt-1 font-bold text-[#052F58]">
                    {producer.location}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {whatsappUrl && (
                <TrackedExternalLink
                  producerId={producer.id}
                  href={whatsappUrl}
                  metric="whatsapp_click"
                  ariaLabel={`Falar com ${producer.name} pelo WhatsApp`}
                  className="inline-flex items-center justify-center rounded-xl bg-[#FF5A1F] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#e94c15]"
                >
                  Falar pelo WhatsApp
                </TrackedExternalLink>
              )}

              {producer.email && (
                <a
                  href={`mailto:${producer.email}`}
                  className="inline-flex items-center justify-center rounded-xl border border-[#0A355F] px-6 py-3.5 text-sm font-black text-[#0A355F] transition hover:bg-[#0A355F] hover:text-white"
                >
                  Enviar e-mail
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {producer.commercializationMethods.length > 0 && (
        <section className="border-y border-[#D5DEE7] bg-[#E8F2F5]">
          <div className="mx-auto max-w-[1150px] px-6 py-10">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[1.3px] text-[#FF5A1F]">
              Como comprar ou contratar
            </p>

            <h2 className="mb-6 text-2xl font-black text-[#052F58]">
              Formas de comercialização
            </h2>

            <div className="flex flex-wrap gap-3">
              {producer.commercializationMethods.map((method) => (
                <span
                  key={method.id}
                  className="rounded-xl border border-[#D5DEE7] bg-white px-4 py-3 text-sm font-bold text-[#052F58]"
                >
                  {method.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#F7F3EA] py-14">
        <div className="mx-auto max-w-[1150px] px-6">
          <div className="mb-8">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[1.3px] text-[#FF5A1F]">
              Vitrine
            </p>

            <h2 className="text-3xl font-black tracking-[-1px] text-[#052F58]">
              Produtos e serviços
            </h2>
          </div>

          {producer.listings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {producer.listings.map((listing) => (
                <article
                  key={listing.id}
                  className="overflow-hidden rounded-2xl border border-[#D5DEE7] bg-white"
                >
                  <div className="relative aspect-[4/3] bg-[#E8F2F5]">
                    <Image
                      src={listing.image}
                      alt={listing.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-black uppercase text-[#FF5A1F]">
                        {listing.categoryName}
                      </span>

                      <span className="rounded-full bg-[#E8F2F5] px-2.5 py-1 text-[10px] font-black uppercase text-[#0A355F]">
                        {listing.type === "SERVICE" ? "Serviço" : "Produto"}
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-extrabold text-[#052F58]">
                      {listing.name}
                    </h3>

                    {listing.description && (
                      <p className="mb-4 text-sm leading-6 text-[#5F7590]">
                        {listing.description}
                      </p>
                    )}

                    <p className="text-lg font-black text-[#052F58]">
                      {formatPrice(listing.price)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D5DEE7] bg-white p-8">
              <p className="text-[#5F7590]">
                Os produtos e serviços deste produtor serão adicionados em
                breve.
              </p>
            </div>
          )}
        </div>
      </section>

      {producer.socialLinks.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-[1150px] px-6">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[1.3px] text-[#FF5A1F]">
              Acompanhe
            </p>

            <h2 className="mb-6 text-3xl font-black text-[#052F58]">
              Redes sociais
            </h2>

            <div className="flex flex-wrap gap-3">
              {producer.socialLinks.map((socialLink) => {
                const isWhatsapp = socialLink.network
                  .toLowerCase()
                  .includes("whatsapp");

                return (
                  <TrackedExternalLink
                    key={socialLink.id}
                    producerId={producer.id}
                    href={socialLink.url}
                    metric={isWhatsapp ? "whatsapp_click" : "social_click"}
                    className="rounded-xl border border-[#D5DEE7] bg-[#F7F3EA] px-5 py-3 text-sm font-extrabold text-[#052F58] transition hover:border-[#0A355F] hover:bg-white"
                  >
                    {socialLink.network}
                  </TrackedExternalLink>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
