-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONTACTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "responsible_name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(160) NOT NULL,
    "has_fixed_location" BOOLEAN NOT NULL DEFAULT false,
    "address" VARCHAR(255),
    "offerings_summary" TEXT NOT NULL,
    "image_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_private_data" (
    "producer_id" INTEGER NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "document_number" VARCHAR(14) NOT NULL,

    CONSTRAINT "producer_private_data_pkey" PRIMARY KEY ("producer_id")
);

-- CreateTable
CREATE TABLE "producer_category" (
    "producer_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "producer_category_pkey" PRIMARY KEY ("producer_id","category_id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" SERIAL NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "type" "ListingType" NOT NULL,
    "price" DECIMAL(10,2),
    "image_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commercialization_method" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "commercialization_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_commercialization_method" (
    "producer_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,

    CONSTRAINT "producer_commercialization_method_pkey" PRIMARY KEY ("producer_id","method_id")
);

-- CreateTable
CREATE TABLE "producer_social_link" (
    "id" SERIAL NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "network" VARCHAR(40) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "producer_social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_daily_metric" (
    "producer_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "profile_views" INTEGER NOT NULL DEFAULT 0,
    "whatsapp_clicks" INTEGER NOT NULL DEFAULT 0,
    "social_clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "producer_daily_metric_pkey" PRIMARY KEY ("producer_id","date")
);

-- CreateTable
CREATE TABLE "registration_request" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(160) NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "contacted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "producer_slug_key" ON "producer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "producer_private_data_document_number_key" ON "producer_private_data"("document_number");

-- CreateIndex
CREATE INDEX "producer_category_category_id_idx" ON "producer_category"("category_id");

-- CreateIndex
CREATE INDEX "listing_producer_id_idx" ON "listing"("producer_id");

-- CreateIndex
CREATE INDEX "listing_category_id_idx" ON "listing"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "commercialization_method_name_key" ON "commercialization_method"("name");

-- CreateIndex
CREATE UNIQUE INDEX "commercialization_method_slug_key" ON "commercialization_method"("slug");

-- CreateIndex
CREATE INDEX "producer_commercialization_method_method_id_idx" ON "producer_commercialization_method"("method_id");

-- CreateIndex
CREATE UNIQUE INDEX "producer_social_link_producer_id_network_key" ON "producer_social_link"("producer_id", "network");

-- CreateIndex
CREATE INDEX "producer_daily_metric_date_idx" ON "producer_daily_metric"("date");

-- CreateIndex
CREATE INDEX "registration_request_status_created_at_idx" ON "registration_request"("status", "created_at");

-- AddForeignKey
ALTER TABLE "producer_private_data" ADD CONSTRAINT "producer_private_data_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_category" ADD CONSTRAINT "producer_category_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_category" ADD CONSTRAINT "producer_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_commercialization_method" ADD CONSTRAINT "producer_commercialization_method_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_commercialization_method" ADD CONSTRAINT "producer_commercialization_method_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "commercialization_method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_social_link" ADD CONSTRAINT "producer_social_link_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_daily_metric" ADD CONSTRAINT "producer_daily_metric_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
