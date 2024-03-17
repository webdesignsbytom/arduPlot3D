/*
  Warnings:

  - You are about to drop the column `simulationLoops` on the `Simulation` table. All the data in the column will be lost.
  - Added the required column `totalTime` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulation" DROP COLUMN "simulationLoops",
ADD COLUMN     "totalTime" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Loop" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "fullLoop" TEXT NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "simulationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Loop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Loop_simulationId_key" ON "Loop"("simulationId");

-- AddForeignKey
ALTER TABLE "Loop" ADD CONSTRAINT "Loop_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "Simulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
