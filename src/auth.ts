import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { passesPermissionsCheck } from "./security/passesPermissionsCheck";
import { ApiRoutes, ApplicationRoutes } from "./constants/routes";

export type CustomUser = User & { id: string; role: string };

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: ApplicationRoutes.LogIn,
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email).toLowerCase(),
          },
          include: {
            accounts: true,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.accounts.length ? user.accounts[0].role : "Unverified",
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const passesCheck = passesPermissionsCheck(
        nextUrl.pathname,
        (auth?.user as CustomUser)?.role
      );

      if (!passesCheck && !isLoggedIn) {
        const redirectUrl = new URL(ApiRoutes.SignIn, nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      if (!passesCheck && isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }
      return passesCheck;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role,
        },
      };
    },
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === "update") {
        token.email = session.user.email;
        token.name = session.user.name;
      }
      if (user) {
        const u = user as any;
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
  },
});
