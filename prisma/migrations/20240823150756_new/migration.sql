-- CreateTable
CREATE TABLE "CodingExcercise" (
    "id" SERIAL NOT NULL,
    "mockId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "sourcCode" TEXT NOT NULL,
    "correctness" TEXT NOT NULL,
    "deviations" TEXT NOT NULL,
    "edgeCases" TEXT NOT NULL,
    "spaceComplexity" TEXT NOT NULL,
    "timeComplexity" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodingExcercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodingExcercise" ADD CONSTRAINT "CodingExcercise_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockInterview"("mockId") ON DELETE RESTRICT ON UPDATE CASCADE;
