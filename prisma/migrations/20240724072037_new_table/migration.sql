/*
  Warnings:

  - The primary key for the `MockInterview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MockInterview` table. All the data in the column will be lost.
  - The `mockId` column on the `MockInterview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MockInterview" DROP CONSTRAINT "MockInterview_pkey",
DROP COLUMN "id",
DROP COLUMN "mockId",
ADD COLUMN     "mockId" SERIAL NOT NULL,
ADD CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("mockId");

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" SERIAL NOT NULL,
    "mockId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "userAnswer" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockInterview"("mockId") ON DELETE RESTRICT ON UPDATE CASCADE;
