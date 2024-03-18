/*
  Warnings:

  - Added the required column `name` to the `BoardGameExpansionBggData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoardGameExpansionBggData" ADD COLUMN     "name" TEXT NOT NULL;
