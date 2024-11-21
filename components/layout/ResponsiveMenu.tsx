
import { MdMenuBook } from "react-icons/md";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MenuButton } from "./MenuButton";
import { Logo } from "@/components/layout/logo";
import { ResponsiveMenuProps } from "@/lib/types/zodTypes";

export default function ResponsiveMenu({
  navBar,
  socialLink,
  logoText,
}: Readonly<ResponsiveMenuProps>) {
  const menuContent = (
    <div className="flex h-full flex-col justify-between ">
      <div>
        <div className="mb-8 mt-4 text-white">
          <Logo text={logoText.text} />
        </div>
        <ul className="flex flex-col gap-4">
          {navBar.map((link) => (
            <li key={link.id} className="border-b border-white pb-3 text-white">
              <Link href={link.url}>
                <div className="flex items-center justify-start gap-3">
                  <p>{link.text}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-8">
        <div className="flex items-center justify-center gap-6">
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
                <Icon className="text-2xl text-white" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <MenuButton content={menuContent}>
      <MdMenuBook className="h-8 w-6" color="white" aria-label="Menu" />
    </MenuButton>
  );
}
