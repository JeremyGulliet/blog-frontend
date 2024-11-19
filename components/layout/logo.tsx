import Link from "next/link";

interface LogoProps {
  text?: string;
  dark?: boolean;
}

export function Logo({
  text = "Logo Text",
}: Readonly<LogoProps>) {
  return (
    <Link className="flex items-center gap-2" href="/">

      <span
        className="text-2xl font-bold"
      >
        {text}
      </span>
    </Link>
  );
}
