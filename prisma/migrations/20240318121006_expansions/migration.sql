-- CreateTable
CREATE TABLE "BoardGameExpansionBggData" (
    "id" SERIAL NOT NULL,
    "bggId" INTEGER NOT NULL,
    "thumb" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "boardGameInternalDataId" INTEGER,

    CONSTRAINT "BoardGameExpansionBggData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardGameExpansionBggData" ADD CONSTRAINT "BoardGameExpansionBggData_boardGameInternalDataId_fkey" FOREIGN KEY ("boardGameInternalDataId") REFERENCES "BoardGameInternalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
