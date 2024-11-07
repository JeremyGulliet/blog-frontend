import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <Link href={('/article')}>Allez à la liste des article</Link>
    </div>
  );
}