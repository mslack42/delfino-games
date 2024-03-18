/*
  Warnings:

  - A unique constraint covering the columns `[boardGameId,userId]` on the table `GameRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameRequest_boardGameId_userId_key" ON "GameRequest"("boardGameId", "userId");
