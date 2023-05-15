import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start deleting users ...`);
  await prisma.user.deleteMany({});
  console.log(`Users deleted`);

  console.log(`Start deleting exercises ...`);
  await prisma.exercise.deleteMany({});
  console.log(`Exercises deleted`);

  console.log(`Start deleting workouts ...`);
  await prisma.workout.deleteMany({});
  console.log(`Workouts deleted`);

  console.log(`Start deleting muscles ...`);
  await prisma.muscles.deleteMany({});
  console.log(`Muscles deleted`);

  console.log(`Start deleting muscleGroups ...`);
  await prisma.muscleGroups.deleteMany({});
  console.log(`muscleGroups deleted`);

  console.log(`DB clear finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
