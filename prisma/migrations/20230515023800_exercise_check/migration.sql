/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "workoutId";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exerciseId";

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkout_AB_unique" ON "_ExerciseToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
