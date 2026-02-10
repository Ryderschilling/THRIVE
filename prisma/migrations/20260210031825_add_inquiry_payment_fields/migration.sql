-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN "paymentAmountCents" INTEGER;
ALTER TABLE "Inquiry" ADD COLUMN "paymentCurrency" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "paymentIntentId" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "paymentStatus" TEXT;
