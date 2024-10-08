/*
  Warnings:

  - You are about to drop the column `guestExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isGuest` on the `User` table. All the data in the column will be lost.
  - The required column `extensionKey` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('VIEW', 'APPLICATION');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('FREE', 'PREMIUM', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "guestExpiry",
DROP COLUMN "isGuest",
ADD COLUMN     "applicationLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "extensionKey" TEXT NOT NULL,
ADD COLUMN     "level" "UserLevel" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "mockInterviewLimit" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "totalJobsApplied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalMockInterviews" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "JobProfile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "linkedIn" TEXT,
    "desiredJobTitle" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "workLocation" TEXT NOT NULL,
    "willingToRelocate" BOOLEAN NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "currentEmploymentStatus" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "highestEducation" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "primarySkills" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "resume" TEXT,
    "coverLetter" TEXT,
    "personalStatement" TEXT,
    "heardAboutUs" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobActivity" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "type" "ActivityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobProfile_email_key" ON "JobProfile"("email");

-- AddForeignKey
ALTER TABLE "JobProfile" ADD CONSTRAINT "JobProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobActivity" ADD CONSTRAINT "JobActivity_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
