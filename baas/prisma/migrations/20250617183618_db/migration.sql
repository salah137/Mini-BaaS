/*
  Warnings:

  - Added the required column `appId` to the `DatabaseElemant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DatabaseElemant" ADD COLUMN     "appId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("apikey") ON DELETE RESTRICT ON UPDATE CASCADE;
