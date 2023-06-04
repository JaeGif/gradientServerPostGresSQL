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

/* const exerciseData: Prisma.ExerciseCreateInput[] = [
  {
    name: 'Decline Press',
    reps: 8,
    sets: 4,
    muscleGroups: {},
  },
  {
    name: 'Bench Press',
    reps: 8,
    sets: 4,
    muscleGroups: {},
  },
  {
    name: 'Incline Press',
    reps: 8,
    sets: 4,
    muscleGroups: {},
  },
  {
    name: 'Chest Flye',
    reps: 8,
    sets: 4,
    muscleGroups: {},
  },
]; */

const workoutData: Prisma.WorkoutCreateInput[] = [
  { name: 'Chest | Shoulders', user: {} },
  { name: 'Legs | Core', user: {} },
  { name: "Back | Bi's", user: {} },
  { name: "Chest | Tri's", user: {} },
  { name: 'Arms', user: {} },
  { name: 'Back | Shoulders', user: {} },
];

/* const performedExerciseData: Prisma.PerformedExerciseCreateInput[] = [
  { reps: 8, sets: 4, rtf: 1, performedWorkout: {} },
]; */

/* const performedWorkoutData: Prisma.PerformedWorkoutCreateInput[] = [
  { user: {} },
]; */

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
  /*   for (const e of exerciseData) {
    const exercise = await prisma.exercise.create({
      data: e,
    });
    console.log(`Created e with id: ${exercise.id}`);
  } */
  for (const w of workoutData) {
    const workout = await prisma.workout.create({
      data: w,
    });
    console.log(`Created w with id: ${workout.id}`);
  }
  /*   for (const pe of performedExerciseData) {
    const performedExercise = await prisma.performedExercise.create({
      data: pe,
    });
    console.log(`Created pe with id: ${performedExercise.id}`);
  } */
  /*   for (const pw of performedWorkoutData) {
    const performedWorkout = await prisma.performedWorkout.create({
      data: pw,
    });
    console.log(`Created pw with id: ${performedWorkout.id}`);
  } */
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
