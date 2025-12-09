"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub,FaGoogle } from "react-icons/fa";
import { LandingPage } from "./(platform)/dashboard/components/LandingPage";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="">
      {!session ? (
        <>{/* 
        <div>
          <h1 className='text-6xl text-white' >Welcome to Tasker</h1>
        </div>
          <p className="text-4xl text-white my-10">Please Log In to start:</p>
          <button className="flex flex-none outline-2 outline-offset-2 outline-orange-300 p-3 rounded-lg text-2xl text-orange-500  cursor-pointer" onClick={() => signIn("google")}>Sign in with Google <FaGoogle className='text-orange-800 text-3xl ml-4'/></button>

          <button className="flex flex-none outline-2 outline-offset-2 outline-cyan-500 p-3 rounded-lg text-2xl text-blue-500 my-9 cursor-pointer " onClick={() => signIn("github")}>Sign in with  GitHub <FaGithub className='text-white text-3xl ml-4' /></button> */}
          <LandingPage />
        </>
      ) : (
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <p className="text-white">Hi {session.user?.name}</p>
          <button className="text-white" onClick={() => signOut()}>Log out</button>
        </div>
        </>
      )}
    </main>
  );
}
