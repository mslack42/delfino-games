-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'Holder';

-- CreateTable
CREATE TABLE "CustomTag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "boardGameInternalDataId" INTEGER,

    CONSTRAINT "CustomTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRequest" (
    "id" SERIAL NOT NULL,
    "boardGameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomTag" ADD CONSTRAINT "CustomTag_boardGameInternalDataId_fkey" FOREIGN KEY ("boardGameInternalDataId") REFERENCES "BoardGameInternalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_boardGameId_fkey" FOREIGN KEY ("boardGameId") REFERENCES "BoardGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
