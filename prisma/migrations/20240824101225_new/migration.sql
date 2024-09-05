/*
  Warnings:

  - A unique constraint covering the columns `[mockId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_mockId_key" ON "UserAnswer"("mockId");
