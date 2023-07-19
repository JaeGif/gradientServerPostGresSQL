/*
  Warnings:

  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - Made the column `preferences` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "preferences" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL;
