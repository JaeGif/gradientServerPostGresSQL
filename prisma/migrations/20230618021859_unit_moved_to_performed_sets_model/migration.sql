/*
  Warnings:

  - You are about to drop the column `unit` on the `PerformedExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "unit";

-- AlterTable
ALTER TABLE "PerformedSet" ADD COLUMN     "unit" TEXT;
