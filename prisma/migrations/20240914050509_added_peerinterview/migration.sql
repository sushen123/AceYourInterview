/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GUEST', 'USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "PunishmentStatus" AS ENUM ('NO_PUNISHMENT', 'INTERVIEWER_PENALIZED', 'INTERVIEWEE_PENALIZED', 'BOTH_PENALIZED', 'MUTUALLY_CLOSED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "guestExpiry" TIMESTAMP(3),
ADD COLUMN     "isGuest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PeerInterview" (
    "id" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "intervieweeId" TEXT NOT NULL,
    "status" "InterviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedByMutualConsent" BOOLEAN NOT NULL DEFAULT false,
    "interviewEndTime" TIMESTAMP(3),
    "interviewerRatingId" TEXT,
    "intervieweeRatingId" TEXT,
    "punishmentStatus" "PunishmentStatus" NOT NULL DEFAULT 'NO_PUNISHMENT',
    "interviewerPenaltyId" TEXT,
    "intervieweePenaltyId" TEXT,

    CONSTRAINT "PeerInterview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interviewerPenalized" BOOLEAN NOT NULL DEFAULT false,
    "intervieweePenalized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_interviewerRatingId_fkey" FOREIGN KEY ("interviewerRatingId") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_intervieweeRatingId_fkey" FOREIGN KEY ("intervieweeRatingId") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_interviewerPenaltyId_fkey" FOREIGN KEY ("interviewerPenaltyId") REFERENCES "Penalty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerInterview" ADD CONSTRAINT "PeerInterview_intervieweePenaltyId_fkey" FOREIGN KEY ("intervieweePenaltyId") REFERENCES "Penalty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
