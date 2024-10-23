-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "customer_id" INTEGER;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "district" TEXT NOT NULL DEFAULT 'Centro';

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;