/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `PerformedExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PerformedExercise" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PerformedExercise_userId_key" ON "PerformedExercise"("userId");

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
