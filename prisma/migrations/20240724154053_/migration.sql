/*
  Warnings:

  - The primary key for the `MockInterview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `createdAt` column on the `UserAnswer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_mockId_fkey";

-- AlterTable
ALTER TABLE "MockInterview" DROP CONSTRAINT "MockInterview_pkey",
ALTER COLUMN "mockId" DROP DEFAULT,
ALTER COLUMN "mockId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("mockId");
DROP SEQUENCE "MockInterview_mockId_seq";

-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "mockId" SET DATA TYPE TEXT,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockInterview"("mockId") ON DELETE RESTRICT ON UPDATE CASCADE;
