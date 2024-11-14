import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import {
  FaHome,
  FaFeatherAlt,
  FaRegGrinStars,
  FaComment,
} from "react-icons/fa";
import { useState } from "react";
import { MdMenuBook } from "react-icons/md";



export default function ResponsiveMenu() {
  // État pour gérer la visibilité du menu
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour fermer le menu
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { href: "/", icon: FaHome, label: "Accueil" },
    { href: "/article", icon: FaFeatherAlt, label: "Tous les articles" },
    { href: "/about", icon: FaComment, label: "A propos" },
    { href: "/catégories", icon: FaRegGrinStars, label: "Catégories" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <MdMenuBook
          className="h-8 w-6"
          color="black"
          onClick={() => setIsOpen(true)}
          aria-label="Menu"
        />
      </SheetTrigger>
      <SheetContent side="left" className="bg-black">
        <ul className="mt-4 flex flex-col gap-4">
          {menuItems.map(({ href, icon: Icon, label }) => (
            <li
              key={href}
              className="border-white text-white border-b pb-3"
            >
              <Link href={href} onClick={closeMenu}>
                <div className="flex items-center justify-start gap-3">
                  <Icon />
                  <p>{label}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}