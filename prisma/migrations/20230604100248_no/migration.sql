/*
  Warnings:

  - You are about to drop the column `performedWorkoutId` on the `PerformedExercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerformedExercise" DROP CONSTRAINT "PerformedExercise_performedWorkoutId_fkey";

-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "performedWorkoutId";

-- CreateTable
CREATE TABLE "_PerformedExerciseToPerformedWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PerformedExerciseToPerformedWorkout_AB_unique" ON "_PerformedExerciseToPerformedWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_PerformedExerciseToPerformedWorkout_B_index" ON "_PerformedExerciseToPerformedWorkout"("B");

-- AddForeignKey
ALTER TABLE "_PerformedExerciseToPerformedWorkout" ADD CONSTRAINT "_PerformedExerciseToPerformedWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "PerformedExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerformedExerciseToPerformedWorkout" ADD CONSTRAINT "_PerformedExerciseToPerformedWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "PerformedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
