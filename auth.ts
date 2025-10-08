import bcrypt from "bcryptjs";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { getRoles, getUser } from "./app/[locale]/lib/actions/authActions";
import { authConfig } from "./auth.config";
import { db } from "./app/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  sessions,
  usersTable,
  verificationTokens,
} from "./app/db/schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          console.log("authorize parsing success");
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log("User", user);

          if (!user) return null;
          const passwordsMatch =
            user.password && (await bcrypt.compare(password, user.password));
          console.log("Pwd matching", passwordsMatch);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      const roles = await getRoles(token.id as string);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
        role: roles,
      };
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.AUTH_SECRET,
});
