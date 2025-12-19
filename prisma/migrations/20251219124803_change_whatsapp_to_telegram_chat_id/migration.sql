/*
  Warnings:

  - You are about to drop the column `whatsapp` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramChatId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_whatsapp_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "whatsapp",
ADD COLUMN     "telegramChatId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramChatId_key" ON "User"("telegramChatId");
