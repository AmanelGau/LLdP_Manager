import "dotenv/config";
import { usersTable } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "Admin",
    email: "admin@example.com",
    password: await bcrypt.hash("123456", 10),
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
}

main();
