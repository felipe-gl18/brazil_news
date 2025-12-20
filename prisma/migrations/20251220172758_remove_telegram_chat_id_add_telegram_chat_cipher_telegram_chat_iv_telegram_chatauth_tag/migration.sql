/*
  Warnings:

  - You are about to drop the column `telegramChatId` on the `User` table. All the data in the column will be lost.
  - Added the required column `telegramChatAuthTag` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramChatCipherText` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramChatIv` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_telegramChatId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegramChatId",
ADD COLUMN     "telegramChatAuthTag" TEXT NOT NULL,
ADD COLUMN     "telegramChatCipherText" TEXT NOT NULL,
ADD COLUMN     "telegramChatIv" TEXT NOT NULL;
