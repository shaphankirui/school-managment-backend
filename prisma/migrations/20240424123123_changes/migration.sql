-- AlterTable
ALTER TABLE "students" ALTER COLUMN "feeBalance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "teachers" ALTER COLUMN "salaryAmount" SET DEFAULT 0,
ALTER COLUMN "salaryBalance" SET DEFAULT 0,
ALTER COLUMN "RemidialBalance" SET DEFAULT 0,
ALTER COLUMN "TotalBance" SET DEFAULT 0;
