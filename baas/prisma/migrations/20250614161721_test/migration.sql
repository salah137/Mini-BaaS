/*
  Warnings:

  - You are about to drop the column `name` on the `App` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apikey]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "App_apikey_key" ON "App"("apikey");
