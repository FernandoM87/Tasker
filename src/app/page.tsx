"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Login  from "../components/login-btn";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      {!session ? (
        <>
        <div>
          <h1 className='text-6xl text-white' >Welcome to Tasker</h1>
          <p></p>
        </div>
          <p className="text-4xl text-white mb-10">You are not logged in</p>
          <button className="outline-2 outline-offset-2 outline-yellow-500 p-3 rounded-lg text-2xl text-yellow-600  cursor-pointer" onClick={() => signIn("google")}>Sign in with Google</button>

          <button className="outline-2 outline-offset-2 outline-cyan-500 p-3 rounded-lg text-2xl text-blue-500 my-9 cursor-pointer " onClick={() => signIn("github")}>Sign in with  GitHub</button>
        </>
      ) : (
        <>
          <p className="text-white">Hi {session.user?.name}</p>
          <button className="text-white" onClick={() => signOut()}>Log out</button>
        </>
      )}
    </main>
  );
}
