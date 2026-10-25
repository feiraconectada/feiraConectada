"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Produtores",
    href: "/produtores",
  },
  {
    label: "Vitrine",
    href: "/vitrine",
  },
  {
    label: "Como se cadastrar",
    href: "/cadastro",
  },
  {
    label: "Quem somos",
    href: "/quem-somos",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#0A355F]/5 bg-[#F7F3EA]">
      <div className="mx-auto flex h-[68px] max-w-[1050px] items-center justify-between px-6">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
        >
          <Image
            src="/assets/logo-feira-header.png"
            alt="Feira Conectada"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[12px] font-bold transition-colors ${
                isActive(link.href)
                  ? "text-[#FF5A1F]"
                  : "text-[#052F58] hover:text-[#FF5A1F]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cadastro"
            className="rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#e94d16]"
          >
            Quero anunciar
          </Link>
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className="h-[2px] w-6 rounded bg-[#052F58]" />
          <span className="h-[2px] w-6 rounded bg-[#052F58]" />
          <span className="h-[2px] w-6 rounded bg-[#052F58]" />
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <nav className="border-t border-[#0A355F]/10 bg-[#F7F3EA] px-6 pb-5 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-[1050px] flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[#0A355F]/5 py-3 text-sm font-bold ${
                  isActive(link.href) ? "text-[#FF5A1F]" : "text-[#052F58]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/cadastro"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-lg bg-[#FF5A1F] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Quero anunciar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
