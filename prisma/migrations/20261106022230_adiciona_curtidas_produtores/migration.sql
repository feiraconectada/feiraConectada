-- CreateTable
CREATE TABLE "producer_like" (
    "producer_id" INTEGER NOT NULL,
    "visitor_id" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_like_pkey" PRIMARY KEY ("producer_id","visitor_id")
);

-- AddForeignKey
ALTER TABLE "producer_like" ADD CONSTRAINT "producer_like_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
