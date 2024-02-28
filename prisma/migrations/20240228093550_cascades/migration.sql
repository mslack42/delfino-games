-- DropForeignKey
ALTER TABLE "BoardGame" DROP CONSTRAINT "ds";

-- DropForeignKey
ALTER TABLE "BoardGameInternalData" DROP CONSTRAINT "BoardGameInternalData_personId_fkey";

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "ds" FOREIGN KEY ("id") REFERENCES "BoardGameInternalData"("boardGameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
