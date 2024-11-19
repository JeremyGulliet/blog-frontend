"use client";
import { useEffect } from "react";
import { FaBug } from "react-icons/fa";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <FaBug className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Quelque chose s&apos;est mal passé.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
        Veuillez réessayer plus tard ou contacter le support si le problème persiste.
        </p>
        <p className="italic text-pink-800">{error.message}</p>
      </div>
    </div>
  );
}
