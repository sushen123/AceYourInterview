/*
  Warnings:

  - The values [ENTERPRISE] on the enum `UserLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [GUEST] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `applicationLimit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalJobsApplied` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `JobActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('EMAIL', 'GOOGLE', 'GUEST');

-- AlterEnum
BEGIN;
CREATE TYPE "UserLevel_new" AS ENUM ('FREE', 'PREMIUM');
ALTER TABLE "User" ALTER COLUMN "level" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "level" TYPE "UserLevel_new" USING ("level"::text::"UserLevel_new");
ALTER TYPE "UserLevel" RENAME TO "UserLevel_old";
ALTER TYPE "UserLevel_new" RENAME TO "UserLevel";
DROP TYPE "UserLevel_old";
ALTER TABLE "User" ALTER COLUMN "level" SET DEFAULT 'FREE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "JobActivity" DROP CONSTRAINT "JobActivity_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobProfile" DROP CONSTRAINT "JobProfile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "applicationLimit",
DROP COLUMN "password",
DROP COLUMN "totalJobsApplied",
ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'EMAIL',
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isGuest" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "JobActivity";

-- DropTable
DROP TABLE "JobProfile";

-- DropEnum
DROP TYPE "ActivityType";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
