import { prisma } from '../src/utils/prisma.service';
import { Prisma } from '@prisma/client';

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'Jacob Gifford',
    age: 25,
    level: 'intermediate',
    email: 'giffordjacob0@gmail.com',
    preferences: {
      stuff: 'stuff',
    },
  },
  {
    username: 'Guest',
    age: 25,
    level: 'intermediate',
    email: 'jaegif2@gmail.com',
    preferences: {
      stuff: 'stuff',
    },
  },
];
const muscleGroupsData: Prisma.MuscleGroupsCreateInput[] = [
  {
    name: 'back',
  },
  { name: 'abs' },
  { name: 'oblique abs' },
  { name: 'chest' },
  { name: 'legs' },
  { name: 'shoulders' },
  { name: 'biceps' },
  { name: 'triceps' },
];

const exerciseData: Prisma.ExerciseCreateInput[] = [
  {
    name: 'Bicep Curl',
    reps: 8,
    sets: 4,
    muscleGroups: {},
  },
];

const workoutData: Prisma.WorkoutCreateInput[] = [
  { name: 'Chest | Shoulders', user: {} },
  { name: 'Legs | Core', user: {} },
  { name: "Back | Bi's", user: {} },
  { name: "Chest | Tri's", user: {} },
  { name: 'Arms', user: {} },
  { name: 'Back | Shoulders', user: {} },
];
async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const m of muscleGroupsData) {
    const muscleGroup = await prisma.muscleGroups.create({
      data: m,
    });
    console.log(`Created m with id: ${muscleGroup.id}`);
  }
  console.log(`Seeding finished.`);
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
