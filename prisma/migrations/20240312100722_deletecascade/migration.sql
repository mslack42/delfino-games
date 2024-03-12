-- DropForeignKey
ALTER TABLE "BoardGame" DROP CONSTRAINT "bgg";

-- DropForeignKey
ALTER TABLE "BoardGameBggData" DROP CONSTRAINT "BoardGameBggData_boardGameBggDataStatsId_fkey";

-- DropForeignKey
ALTER TABLE "BoardGameBggData" DROP CONSTRAINT "BoardGameBggData_boardGameDataSpecsId_fkey";

-- DropForeignKey
ALTER TABLE "CustomTag" DROP CONSTRAINT "CustomTag_boardGameInternalDataId_fkey";

-- DropForeignKey
ALTER TABLE "GameRequest" DROP CONSTRAINT "GameRequest_boardGameId_fkey";

-- DropForeignKey
ALTER TABLE "GameRequest" DROP CONSTRAINT "GameRequest_userId_fkey";

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "bgg" FOREIGN KEY ("bggDataId") REFERENCES "BoardGameBggData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameBggDataStatsId_fkey" FOREIGN KEY ("boardGameBggDataStatsId") REFERENCES "BoardGameBggDataStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomTag" ADD CONSTRAINT "CustomTag_boardGameInternalDataId_fkey" FOREIGN KEY ("boardGameInternalDataId") REFERENCES "BoardGameInternalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_boardGameId_fkey" FOREIGN KEY ("boardGameId") REFERENCES "BoardGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
