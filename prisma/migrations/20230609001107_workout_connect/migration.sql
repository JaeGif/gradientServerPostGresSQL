/*
  Warnings:

  - A unique constraint covering the columns `[workoutId]` on the table `PerformedWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PerformedWorkout" ADD COLUMN     "workoutId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PerformedWorkout_workoutId_key" ON "PerformedWorkout"("workoutId");

-- AddForeignKey
ALTER TABLE "PerformedWorkout" ADD CONSTRAINT "PerformedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
