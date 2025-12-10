-- DropForeignKey
ALTER TABLE "DeliveredNews" DROP CONSTRAINT "DeliveredNews_userId_fkey";

-- AddForeignKey
ALTER TABLE "DeliveredNews" ADD CONSTRAINT "DeliveredNews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
