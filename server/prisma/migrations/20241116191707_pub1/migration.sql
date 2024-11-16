/*
  Warnings:

  - You are about to drop the column `voteScore` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `authorName` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "voteScore",
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
