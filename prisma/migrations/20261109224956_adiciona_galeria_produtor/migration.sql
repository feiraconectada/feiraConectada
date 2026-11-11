-- CreateTable
CREATE TABLE "producer_gallery_image" (
    "id" SERIAL NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "caption" VARCHAR(180),
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producer_gallery_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "producer_gallery_image_producer_id_idx" ON "producer_gallery_image"("producer_id");

-- AddForeignKey
ALTER TABLE "producer_gallery_image" ADD CONSTRAINT "producer_gallery_image_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
