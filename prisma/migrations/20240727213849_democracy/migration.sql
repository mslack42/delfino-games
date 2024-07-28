-- CreateTable
CREATE TABLE "GameSuggestion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bggId" INTEGER NOT NULL,
    "thumb" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "suggestedByUserId" TEXT NOT NULL,

    CONSTRAINT "GameSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSuggestionVote" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "suggestionId" INTEGER NOT NULL,

    CONSTRAINT "GameSuggestionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSuggestion_bggId_key" ON "GameSuggestion"("bggId");

-- AddForeignKey
ALTER TABLE "GameSuggestion" ADD CONSTRAINT "GameSuggestion_suggestedByUserId_fkey" FOREIGN KEY ("suggestedByUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSuggestionVote" ADD CONSTRAINT "GameSuggestionVote_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "GameSuggestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSuggestionVote" ADD CONSTRAINT "GameSuggestionVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
