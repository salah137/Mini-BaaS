/*
  Warnings:

  - You are about to drop the column `passwprd` on the `AppUser` table. All the data in the column will be lost.
  - Added the required column `password` to the `AppUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppUser" DROP COLUMN "passwprd",
ADD COLUMN     "password" TEXT NOT NULL;
