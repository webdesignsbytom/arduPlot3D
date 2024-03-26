/*
  Warnings:

  - You are about to drop the column `totalTime` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `Simulation` table. All the data in the column will be lost.
  - Added the required column `timeToComplete` to the `Loop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeToComplete` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loop" DROP COLUMN "totalTime",
ADD COLUMN     "timeToComplete" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Simulation" DROP COLUMN "totalTime",
ADD COLUMN     "timeToComplete" INTEGER NOT NULL;
