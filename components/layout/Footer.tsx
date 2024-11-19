import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FooterProps } from "@/lib/types/zodTypes";


export function Footer({ data }: Readonly<FooterProps>) {
  const { logoText, socialLink, text } = data;
  return (
    <div className="dark bg-gray-900 py-8 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
        <Logo dark text={logoText.text} />
        <p className="mt-4 text-sm text-gray-300 md:mt-0">{text}</p>
        <div className="flex items-center space-x-4">
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
    </div>
  );
}
