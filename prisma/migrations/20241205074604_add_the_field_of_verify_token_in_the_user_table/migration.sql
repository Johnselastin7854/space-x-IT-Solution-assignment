/*
  Warnings:

  - Added the required column `userVerifyToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userVerifyTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerfied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userVerifyToken" TEXT NOT NULL,
ADD COLUMN     "userVerifyTokenExpiry" TIMESTAMP(3) NOT NULL;
