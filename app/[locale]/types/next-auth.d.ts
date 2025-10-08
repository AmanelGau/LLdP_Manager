import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    role: string[] & DefaultSession["user"];
  }
}
