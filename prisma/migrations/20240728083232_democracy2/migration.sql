/*
  Warnings:

  - Added the required column `boxType` to the `GameSuggestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoxType" AS ENUM ('BoardGame', 'Expansion');

-- AlterTable
ALTER TABLE "GameSuggestion" ADD COLUMN     "boxType" "BoxType" NOT NULL;
