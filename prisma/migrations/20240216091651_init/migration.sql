-- CreateEnum
CREATE TYPE "Ownership" AS ENUM ('Company', 'Personal');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Poole', 'Oxford');

-- CreateTable
CREATE TABLE "BoardGame" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BoardGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameBggData" (
    "id" SERIAL NOT NULL,
    "boardGameId" INTEGER NOT NULL,
    "bggId" INTEGER NOT NULL,
    "thumb" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boardGameDataSpecsId" INTEGER NOT NULL,
    "boardGameBggDataStatsId" INTEGER NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardGameBggData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameDataSpecs" (
    "id" SERIAL NOT NULL,
    "externalDataId" INTEGER NOT NULL,
    "minplayers" INTEGER NOT NULL DEFAULT 1,
    "maxplayers" INTEGER NOT NULL DEFAULT 99,
    "minplaytime_minutes" INTEGER NOT NULL,
    "maxplaytime_minutes" INTEGER NOT NULL,

    CONSTRAINT "BoardGameDataSpecs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameBggDataStats" (
    "id" SERIAL NOT NULL,
    "bggId" INTEGER NOT NULL,
    "bggRank" INTEGER NOT NULL,
    "bggAverageScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BoardGameBggDataStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameInternalData" (
    "id" SERIAL NOT NULL,
    "boardGameId" INTEGER NOT NULL,
    "boardGameDataSpecsId" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "ownership" "Ownership" NOT NULL DEFAULT 'Personal',
    "location" "Location" NOT NULL DEFAULT 'Poole',
    "personId" INTEGER NOT NULL,
    "inCurrentRotation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BoardGameInternalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameBggData_boardGameId_key" ON "BoardGameBggData"("boardGameId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameBggData_bggId_key" ON "BoardGameBggData"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameBggDataStats_bggId_key" ON "BoardGameBggDataStats"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameInternalData_boardGameId_key" ON "BoardGameInternalData"("boardGameId");

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "bgg" FOREIGN KEY ("id") REFERENCES "BoardGameBggData"("boardGameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "ds" FOREIGN KEY ("id") REFERENCES "BoardGameInternalData"("boardGameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameBggDataStatsId_fkey" FOREIGN KEY ("boardGameBggDataStatsId") REFERENCES "BoardGameBggDataStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
