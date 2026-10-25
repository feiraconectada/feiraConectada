-- AlterTable
ALTER TABLE "producer" ADD COLUMN     "location_description" VARCHAR(255),
ALTER COLUMN "responsible_name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "offerings_summary" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false;
