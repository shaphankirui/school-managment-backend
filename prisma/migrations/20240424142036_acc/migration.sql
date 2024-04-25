-- AlterTable
ALTER TABLE "academic_terms" ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "FeeBalanceRecord" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "feeBalance" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "academicTermId" INTEGER NOT NULL,

    CONSTRAINT "FeeBalanceRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeeBalanceRecord" ADD CONSTRAINT "FeeBalanceRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeeBalanceRecord" ADD CONSTRAINT "FeeBalanceRecord_academicTermId_fkey" FOREIGN KEY ("academicTermId") REFERENCES "academic_terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
