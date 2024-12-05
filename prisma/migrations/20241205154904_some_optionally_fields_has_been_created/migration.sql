-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userVerifyToken" DROP NOT NULL,
ALTER COLUMN "userVerifyTokenExpiry" DROP NOT NULL;
