/*
  Warnings:

  - You are about to drop the column `parentDocid` on the `DatabaseElemant` table. All the data in the column will be lost.
  - You are about to drop the column `parentQueriId` on the `DatabaseElemant` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `DatabaseElemant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DatabaseElemant" DROP CONSTRAINT "DatabaseElemant_parentDocid_fkey";

-- DropForeignKey
ALTER TABLE "DatabaseElemant" DROP CONSTRAINT "DatabaseElemant_parentQueriId_fkey";

-- AlterTable
ALTER TABLE "DatabaseElemant" DROP COLUMN "parentDocid",
DROP COLUMN "parentQueriId",
ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DatabaseElemant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
