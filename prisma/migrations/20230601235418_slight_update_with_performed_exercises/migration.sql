/*
  Warnings:

  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `Muscles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MuscleGroupsToMuscles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MuscleGroupsToMuscles" DROP CONSTRAINT "_MuscleGroupsToMuscles_A_fkey";

-- DropForeignKey
ALTER TABLE "_MuscleGroupsToMuscles" DROP CONSTRAINT "_MuscleGroupsToMuscles_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "rtf" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date";

-- DropTable
DROP TABLE "Muscles";

-- DropTable
DROP TABLE "_MuscleGroupsToMuscles";

-- CreateTable
CREATE TABLE "PerformedExercise" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "performedWorkoutId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "rtf" INTEGER,

    CONSTRAINT "PerformedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformedWorkout" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PerformedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerformedExercise_exerciseId_key" ON "PerformedExercise"("exerciseId");

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_performedWorkoutId_fkey" FOREIGN KEY ("performedWorkoutId") REFERENCES "PerformedWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformedWorkout" ADD CONSTRAINT "PerformedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
