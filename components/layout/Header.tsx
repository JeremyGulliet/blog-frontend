"use client"

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";

export default function Header() {
  const navBar = [
    { href: "/", label: "Accueil" },
    { href: "/article", label: "Tous les articles" },
    { href: "/about", label: "A propos" },
    { href: "/catégories", label: "Catégories" },
  ];

  return (
    <header className="flex items-center justify-around gap-4 border-b-2 py-4 shadow-sm md:flex-row md:gap-8 fixed z-50 w-full bg-white">
      {/* Menu réactif visible seulement sur les écrans inférieurs à xl */}
      <div className="xl:hidden">
        <ResponsiveMenu />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Mon blog</h1>
      </div>
      <div className="hidden items-center xl:flex">
        <nav className="flex">
          <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
            {navBar.map(({ href, label }) => (
              <li key={href} className="text-xl hover:underline">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={20} />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
