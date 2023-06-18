/*
  Warnings:

  - You are about to drop the column `sets` on the `PerformedExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `PerformedExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerformedExercise" DROP COLUMN "sets",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "PerformedSet" (
    "id" TEXT NOT NULL,
    "performedExerciseId" TEXT,
    "index" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "rtf" INTEGER,

    CONSTRAINT "PerformedSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PerformedSet" ADD CONSTRAINT "PerformedSet_performedExerciseId_fkey" FOREIGN KEY ("performedExerciseId") REFERENCES "PerformedExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
