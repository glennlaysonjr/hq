/*
  Warnings:

  - You are about to drop the `WriteUp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WriteUp";

-- CreateTable
CREATE TABLE "WriteUps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WriteUps_pkey" PRIMARY KEY ("id")
);
