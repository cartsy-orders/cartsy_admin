import NextAuth, { type DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      email?: string | null;
      [key: string]: unknown;
    };
  }

  interface User {
    id?: string;
    email?: string | null;
    [key: string]: unknown;
  }
}

interface CustomJWT extends JWT {
  user?: {
    id?: string;
    email?: string | null;
    [key: string]: unknown;
  };
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/admin-auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        
        if (res.ok && user) return user as { id?: string; email?: string | null };
        return null; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          ...user
        };
      }
      return token as CustomJWT;
    },
    async session({ session, token }: { session: any; token: CustomJWT }) {
      if (token.user) {
        session.user = {
          ...session.user,
          id: token.user.id,
          email: token.user.email,
          ...token.user
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin", 
  },
};

export const { GET, POST } = NextAuth(authOptions);