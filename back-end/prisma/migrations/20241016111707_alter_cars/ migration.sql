/*
  Warnings:

  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_user_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_user_id" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Seller";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_updated_user_id_fkey" FOREIGN KEY ("updated_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modified_user_id_fkey" FOREIGN KEY ("modified_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;