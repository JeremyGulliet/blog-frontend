"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

export function MenuButton({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="left" className="bg-gray-900">
        {content}
      </SheetContent>
    </Sheet>
  );
}
