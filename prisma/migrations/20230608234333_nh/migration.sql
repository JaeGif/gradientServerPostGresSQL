-- DropForeignKey
ALTER TABLE "PerformedExercise" DROP CONSTRAINT "PerformedExercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "PerformedExercise" ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PerformedExercise" ADD CONSTRAINT "PerformedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
