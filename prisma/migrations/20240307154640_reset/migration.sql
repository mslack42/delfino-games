-- CreateEnum
CREATE TYPE "Ownership" AS ENUM ('Company', 'Personal');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Poole', 'Oxford', 'Manchester');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Holder', 'Verified', 'Unverified');

-- CreateTable
CREATE TABLE "BoardGame" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bggDataId" INTEGER NOT NULL,
    "dsDataId" INTEGER NOT NULL,

    CONSTRAINT "BoardGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameBggData" (
    "id" SERIAL NOT NULL,
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
    "tags" TEXT[],

    CONSTRAINT "BoardGameDataSpecs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameBggDataStats" (
    "id" SERIAL NOT NULL,
    "bggId" INTEGER NOT NULL,
    "bggRank" INTEGER,
    "bggAverageScore" DOUBLE PRECISION,

    CONSTRAINT "BoardGameBggDataStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardGameInternalData" (
    "id" SERIAL NOT NULL,
    "boardGameDataSpecsId" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "ownership" "Ownership" NOT NULL DEFAULT 'Personal',
    "holderId" INTEGER NOT NULL,
    "ownerId" INTEGER,
    "inCurrentRotation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BoardGameInternalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "location" "Location" NOT NULL DEFAULT 'Poole',

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameBggData_bggId_key" ON "BoardGameBggData"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardGameBggDataStats_bggId_key" ON "BoardGameBggDataStats"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "bgg" FOREIGN KEY ("bggDataId") REFERENCES "BoardGameBggData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "ds" FOREIGN KEY ("dsDataId") REFERENCES "BoardGameInternalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameBggData" ADD CONSTRAINT "BoardGameBggData_boardGameBggDataStatsId_fkey" FOREIGN KEY ("boardGameBggDataStatsId") REFERENCES "BoardGameBggDataStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_boardGameDataSpecsId_fkey" FOREIGN KEY ("boardGameDataSpecsId") REFERENCES "BoardGameDataSpecs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGameInternalData" ADD CONSTRAINT "BoardGameInternalData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomTag" ADD CONSTRAINT "CustomTag_boardGameInternalDataId_fkey" FOREIGN KEY ("boardGameInternalDataId") REFERENCES "BoardGameInternalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_boardGameId_fkey" FOREIGN KEY ("boardGameId") REFERENCES "BoardGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequest" ADD CONSTRAINT "GameRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
