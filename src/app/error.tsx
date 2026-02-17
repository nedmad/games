"use client";

import Link from "next/link";

export default function ErrorUsuarios({ error }: { error: Error }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
        <h1 className="text-2xl font-bold text-blue-950">
          Página nao encontrada
        </h1>

        <Link
          href={"/"}
          className="bg-blue-600 px-4 py-2 rounded mt-4 hover:bg-blue-700 hover:font-bold transition duration-300 block text-white underline"
        >
          Clique aqui para acessar a página inicial
        </Link>
      </div>
    </main>
  );
}
