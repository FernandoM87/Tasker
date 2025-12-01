"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {!session ? (
        <>
          <p className="text-4xl">No has iniciado sesión</p>
          <button className="text-3xl text-yellow-600 my-6" onClick={() => signIn("google")}>Iniciar con Google</button>

          <button className="text-3xl text-blue-600" onClick={() => signIn("github")}>Iniciar con GitHub</button>
        </>
      ) : (
        <>
          <p>Hola {session.user?.name}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </>
      )}
    </main>
  );
}
