/*
  Warnings:

  - Added the required column `name` to the `ResumeDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeDetails" ADD COLUMN     "name" TEXT NOT NULL;
