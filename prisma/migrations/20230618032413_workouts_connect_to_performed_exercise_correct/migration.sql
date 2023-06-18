/*
  Warnings:

  - You are about to drop the `_PerformedExerciseToPerformedWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PerformedExerciseToPerformedWorkout" DROP CONSTRAINT "_PerformedExerciseToPerformedWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_PerformedExerciseToPerformedWorkout" DROP CONSTRAINT "_PerformedExerciseToPerformedWorkout_B_fkey";

-- AlterTable
ALTER TABLE "PerformedExercise" ADD COLUMN     "performedWorkoutId" TEXT;

-- DropTable
DROP TABLE "_PerformedExerciseToPerformedWorkout";

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_performedWorkoutId_fkey" FOREIGN KEY ("performedWorkoutId") REFERENCES "PerformedWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
