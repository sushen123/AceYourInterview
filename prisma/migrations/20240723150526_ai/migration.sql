-- CreateTable
CREATE TABLE "MockInterview" (
    "id" SERIAL NOT NULL,
    "jsonMockResponse" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "jobDescriptoin" TEXT NOT NULL,
    "jobExperience" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mockId" TEXT NOT NULL,

    CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("id")
);
