/*
  Warnings:

  - You are about to drop the column `reps` on the `PerformedExercise` table. All the data in the column will be lost.
  - You are about to drop the column `rtf` on the `PerformedExercise` table. All the data in the column will be lost.
  - The `sets` column on the `PerformedExercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "reps",
DROP COLUMN "rtf",
DROP COLUMN "sets",
ADD COLUMN     "sets" JSONB;
