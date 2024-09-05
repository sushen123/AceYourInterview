/*
  Warnings:

  - You are about to drop the column `communicationFeedback` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `communicationRating` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `learningPath` on the `UserAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `likelyAnswer` on the `UserAnswer` table. All the data in the column will be lost.
  - Added the required column `clarityFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clarityRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidenceFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidenceRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relevanceFeedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relevanceRating` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswer" DROP COLUMN "communicationFeedback",
DROP COLUMN "communicationRating",
DROP COLUMN "learningPath",
DROP COLUMN "likelyAnswer",
ADD COLUMN     "behavioralInsightFeedback" TEXT,
ADD COLUMN     "behavioralInsightRating" INTEGER,
ADD COLUMN     "clarityFeedback" TEXT NOT NULL,
ADD COLUMN     "clarityRating" INTEGER NOT NULL,
ADD COLUMN     "confidenceFeedback" TEXT NOT NULL,
ADD COLUMN     "confidenceRating" INTEGER NOT NULL,
ADD COLUMN     "contentFeedback" TEXT NOT NULL,
ADD COLUMN     "contentRating" INTEGER NOT NULL,
ADD COLUMN     "relevanceFeedback" TEXT NOT NULL,
ADD COLUMN     "relevanceRating" INTEGER NOT NULL,
ADD COLUMN     "situationalJudgmentFeedback" TEXT,
ADD COLUMN     "situationalJudgmentRating" INTEGER,
ALTER COLUMN "problemSolvingFeedback" DROP NOT NULL,
ALTER COLUMN "problemSolvingRating" DROP NOT NULL,
ALTER COLUMN "technicalFeedback" DROP NOT NULL,
ALTER COLUMN "technicalRating" DROP NOT NULL;
