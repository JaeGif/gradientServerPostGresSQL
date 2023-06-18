/*
  Warnings:

  - Made the column `performedWorkoutId` on table `PerformedExercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PerformedExercise" DROP CONSTRAINT "PerformedExercise_performedWorkoutId_fkey";

-- AlterTable
ALTER TABLE "PerformedExercise" ALTER COLUMN "performedWorkoutId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" TEXT;

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_performedWorkoutId_fkey" FOREIGN KEY ("performedWorkoutId") REFERENCES "PerformedWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
