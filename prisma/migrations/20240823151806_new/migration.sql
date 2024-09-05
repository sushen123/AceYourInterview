/*
  Warnings:

  - Added the required column `rate` to the `CodingExcercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodingExcercise" ADD COLUMN     "rate" INTEGER NOT NULL;
