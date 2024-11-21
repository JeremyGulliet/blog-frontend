
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { Logo } from "@/components//layout/logo";
import { HeaderProps } from "@/lib/types/zodTypes";


export async function Header({ data }: Readonly<HeaderProps>) {
  const { logoText, navBar, socialLink } = data;

  return (
    <header className="fixed z-50 flex w-full items-center justify-around gap-4 bg-gray-900 text-white py-4 shadow-sm md:flex-row md:gap-8">
      {/* Menu réactif visible seulement sur les écrans inférieurs à xl */}
      <div className="xl:hidden">
        <ResponsiveMenu
          navBar={navBar}
          socialLink={socialLink}
          logoText={logoText}
        />
      </div>
      <div>
        <Logo text={logoText.text} />
      </div>
      <div className="hidden items-center xl:flex">
        <nav className="flex">
          <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
            {navBar.map((link) => (
              <li key={link.id} className="text-xl hover:underline">
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <div className="flex items-center gap-4">
          {socialLink.map((link) => {
            let Icon;
            switch (link.text.toLowerCase()) {
              case "facebook":
                Icon = FaFacebook;
                break;
              case "instagram":
                Icon = FaInstagram;
                break;
              case "linkedin":
                Icon = FaLinkedin;
                break;
              default:
                return null;
            }
            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="text-xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
