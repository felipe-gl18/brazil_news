/*
  Warnings:

  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('pt', 'en', 'es', 'fr', 'de');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL;
