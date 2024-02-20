-- DropForeignKey
ALTER TABLE "BoardGameInternalData" DROP CONSTRAINT "BoardGameInternalData_boardGameDataSpecsId_fkey";

-- AlterTable
ALTER TABLE "BoardGameInternalData" ALTER COLUMN "boardGameDataSpecsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
