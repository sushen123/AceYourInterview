/*
  Warnings:

  - You are about to drop the column `feedback` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `UserAnswer` table. All the data in the column will be lost.
  - Added the required column `communicationFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communicationRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningPath` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likelyAnswer` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemSolvingFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemSolvingRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswer" DROP COLUMN "feedback",
DROP COLUMN "rating",
ADD COLUMN     "communicationFeedback" TEXT NOT NULL,
ADD COLUMN     "communicationRating" INTEGER NOT NULL,
ADD COLUMN     "learningPath" TEXT NOT NULL,
ADD COLUMN     "likelyAnswer" TEXT NOT NULL,
ADD COLUMN     "overallRating" INTEGER NOT NULL,
ADD COLUMN     "problemSolvingFeedback" TEXT NOT NULL,
ADD COLUMN     "problemSolvingRating" INTEGER NOT NULL,
ADD COLUMN     "technicalFeedback" TEXT NOT NULL,
ADD COLUMN     "technicalRating" INTEGER NOT NULL;
