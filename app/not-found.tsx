import Link from "next/link";
import { FaBug } from "react-icons/fa";

export default function NotFoundRoot() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <FaBug className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          La page demandée n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Retourner à la page d&apos;accueil !
        </Link>
      </div>
    </div>
  );
}
