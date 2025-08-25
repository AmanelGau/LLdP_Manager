import "dotenv/config";
import { raceBonusTable, raceTable, skillTable, usersTable } from "./schema";
import { db } from "./index";
import bcrypt from "bcryptjs";
import { races, skills } from "./basicData";

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
  const actualSkills = (
    await db
      .select({
        name: skillTable.name,
      })
      .from(skillTable)
  ).map((skill) => skill.name);
  const toAddSkills = skills.filter(
    (skill) => !actualSkills.includes(skill.name)
  );
  await db.insert(skillTable).values(toAddSkills).onConflictDoNothing();
  console.log("Skills populate");
}

// async function populateRaces() {
//   console.log("Populating races");
//   const actualRaces = (
//     await db
//       .select({
//         name: raceTable.name,
//       })
//       .from(raceTable)
//   ).map((race) => race.name);
//   const toAddRaces = races.filter((race) => !actualRaces.includes(race.name));
//   toAddRaces.forEach(async (race) => {
//     const raceId = await db
//       .insert(raceTable)
//       .values({
//         name: race.name,
//         categorie: race.categorie,
//         physique: race.physique,
//         character: race.character,
//         // A ajouter
//       })
//       .onConflictDoNothing()
//       .returning({ raceId: raceTable.id });
//     await race.bonus.forEach(async (bonus) => {
//       await db.insert(raceBonusTable).values(
//         bonus!.stats.map((stats) => ({
//           race: raceId[0].raceId,
//           type: bonus!.type,
//           stat1: stats[0],
//           stat2: stats[1],
//         }))
//       );
//     });
//   });
//   console.log("Races populate");
// }

export async function GET() {
  try {
    await populateUsers();
    await populateSkills();
    // await populateRaces();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
