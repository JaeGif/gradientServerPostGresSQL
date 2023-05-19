-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_username_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
