// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateGuestEmail() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `guest.${randomString}@gmail.com`;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    {
      id: "guest",
      name: "Guest",
      type: "credentials",
      credentials: {},
      async authorize() {
        try {
          const user = await prisma.user.create({
            data: {
              email: generateGuestEmail(),
              name: `Guest ${Math.random().toString(36).slice(2, 7)}`,
              isGuest: true,
            },
          });
          return user;
        } catch (error) {
          console.error("Error creating guest user:", error);
          return null;
        }
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isGuest = token.isGuest as boolean;
      }
      return session;
    },
    async jwt({ token, trigger, user }) {
      if (trigger === "signIn" && user) {
        token.isGuest = user.isGuest ?? false;
      }
      return token;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signOut: '/dashboard', // Add this line
  },
});