/*
  Warnings:

  - A unique constraint covering the columns `[boardGameInternalDataId,bggId]` on the table `BoardGameExpansionBggData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoardGameExpansionBggData_boardGameInternalDataId_bggId_key" ON "BoardGameExpansionBggData"("boardGameInternalDataId", "bggId");
