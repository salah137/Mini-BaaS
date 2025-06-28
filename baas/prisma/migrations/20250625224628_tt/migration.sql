/*
  Warnings:

  - A unique constraint covering the columns `[appName]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "App_ownrId_key";

-- CreateIndex
CREATE UNIQUE INDEX "App_appName_key" ON "App"("appName");
