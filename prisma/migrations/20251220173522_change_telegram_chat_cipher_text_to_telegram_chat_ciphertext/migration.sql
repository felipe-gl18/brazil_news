/*
  Warnings:

  - You are about to drop the column `telegramChatCipherText` on the `User` table. All the data in the column will be lost.
  - Added the required column `telegramChatCiphertext` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegramChatCipherText",
ADD COLUMN     "telegramChatCiphertext" TEXT NOT NULL;
