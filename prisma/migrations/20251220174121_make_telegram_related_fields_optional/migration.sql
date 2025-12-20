-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telegramChatAuthTag" DROP NOT NULL,
ALTER COLUMN "telegramChatIv" DROP NOT NULL,
ALTER COLUMN "telegramChatCiphertext" DROP NOT NULL;
