import "dotenv/config";
import { SkillTable, usersTable } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";
import { skills } from "./basicData";

async function main() {
  await populateUsers();
  await populateSkills();
}

async function populateUsers() {
  const user: typeof usersTable.$inferInsert = {
    name: "Admin",
    email: "admin@example.com",
    password: await bcrypt.hash("123456", 10),
  };

  await db.insert(usersTable).values(user).onConflictDoNothing();
  console.log("New user created!");
}

async function populateSkills() {
  await db.insert(SkillTable).values(skills).onConflictDoNothing();
  console.log("Skills populate");
}

main();
