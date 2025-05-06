import NextAuth, { type DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      email?: string | null;
      [key: string]: unknown;
    } & DefaultSession["user"];
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
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/admin-auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) return null;

          const user = await res.json();
          return user ? { ...user, id: user.id?.toString() } : null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: CustomJWT }) {
      session.user = {
        ...session.user,
        ...token.user,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };