-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'TELEGRAM', 'WHATSAPP');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationChannel" "NotificationChannel" NOT NULL DEFAULT 'EMAIL';
