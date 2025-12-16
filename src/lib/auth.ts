import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any, // El 'as any' evita problemas de tipos entre versiones
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login', // Redirige a tu página de login personalizada
  },
  session: {
    strategy: 'jwt', // Usa JWT en lugar de database sessions (más rápido)
  },
  callbacks: {
    // Agrega el ID del usuario a la sesión
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}