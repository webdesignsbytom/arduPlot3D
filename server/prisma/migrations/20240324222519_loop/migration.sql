/*
  Warnings:

  - Added the required column `dataGroup` to the `Loop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loop" ADD COLUMN     "dataGroup" TEXT NOT NULL;
