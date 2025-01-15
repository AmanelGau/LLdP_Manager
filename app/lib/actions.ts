"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";
import { db } from "app/db";
import { z } from "zod";
import { usersTable } from "../db/schema";
import bcrypt from "bcrypt";

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signup(prevState: State | undefined, formData: FormData) {
  try {
    const validatedFields = CreateUser.safeParse({
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de la création de compte : Champs invalides.",
      };
    }

    const user: typeof usersTable.$inferInsert = {
      email: validatedFields.data.email,
      name: validatedFields.data.name,
      password: await bcrypt.hash(validatedFields.data.password, 10),
    };

    await db.insert(usersTable).values(user);
    await signIn("credentials", formData);
    return {
      message: "Succès",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
