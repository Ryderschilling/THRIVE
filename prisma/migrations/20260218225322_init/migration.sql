-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,
    "productSlug" TEXT,
    "donationCents" INTEGER,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" TEXT,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retreat" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retreat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetreatInquiry" (
    "id" TEXT NOT NULL,
    "inquiryId" TEXT NOT NULL,
    "retreatId" TEXT NOT NULL,

    CONSTRAINT "RetreatInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Retreat_slug_key" ON "Retreat"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RetreatInquiry_inquiryId_key" ON "RetreatInquiry"("inquiryId");

-- CreateIndex
CREATE UNIQUE INDEX "RetreatInquiry_inquiryId_retreatId_key" ON "RetreatInquiry"("inquiryId", "retreatId");

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetreatInquiry" ADD CONSTRAINT "RetreatInquiry_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetreatInquiry" ADD CONSTRAINT "RetreatInquiry_retreatId_fkey" FOREIGN KEY ("retreatId") REFERENCES "Retreat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
