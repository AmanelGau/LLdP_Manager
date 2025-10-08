"use server";

import { db } from "@/app/db";
import { usersRoleLinkTable, usersTable } from "@/app/db/schema";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { signIn, signOut } from "@/auth";

const UserFormSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  name: z.string({
    message: "Veuillez entrer un nom.",
  }),
  password: z
    .string({
      message: "Veuillez entrer un mot de passe",
    })
    .min(5, {
      message: "Le mot de passe doit être long de 5 caratères minimum",
    }),
});

const CreateUser = UserFormSchema.omit({ id: true });

export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const loginCredential = async (email: string, password: string) => {
  await signIn("credentials", {
    redirectTo: "/",
    email,
    password,
  });
};

export async function getUser(
  email: string,
  connexionMethod: string = "Credentials"
): Promise<typeof usersTable.$inferInsert | undefined> {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.email, email),
          eq(usersTable.connexionMethod, connexionMethod)
        )
      );
    return user.length > 0 ? user[0] : undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function signup(email: string, name: string, password: string) {
  const existingUser = await getUser(email);

  if (existingUser !== undefined) {
    return "error";
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user: typeof usersTable.$inferInsert = {
    email: email,
    name: name,
    password: hashedPassword,
    connexionMethod: "Credentials",
  };

  await db.insert(usersTable).values(user);

  await loginCredential(email, password);

  return "success";
}

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};

export const getRoles = async (id: string) => {
  return (
    await db
      .select({ role: usersRoleLinkTable.role })
      .from(usersRoleLinkTable)
      .where(eq(usersRoleLinkTable.user, id))
  ).map((row) => row.role);
};
