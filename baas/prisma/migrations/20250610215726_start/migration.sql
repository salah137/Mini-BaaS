-- CreateEnum
CREATE TYPE "elementType" AS ENUM ('String', 'Int', 'Float', 'Bool', 'Query', 'Document');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apikey" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "ownrId" INTEGER NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppUser" (
    "id" SERIAL NOT NULL,
    "uuid" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "passwprd" TEXT NOT NULL,
    "appId" INTEGER NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseElemant" (
    "id" SERIAL NOT NULL,
    "type" "elementType" NOT NULL,
    "name" TEXT,
    "strId" INTEGER,
    "intId" INTEGER,
    "floatId" INTEGER,
    "boolId" INTEGER,
    "queryId" INTEGER,
    "documentId" INTEGER,
    "parentDocid" INTEGER,
    "parentQueriId" INTEGER,

    CONSTRAINT "DatabaseElemant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Str" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Str_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integer" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Integer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floate" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Floate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bool" (
    "id" SERIAL NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "Bool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Query" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "App_ownrId_key" ON "App"("ownrId");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_uuid_key" ON "AppUser"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_strId_key" ON "DatabaseElemant"("strId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_intId_key" ON "DatabaseElemant"("intId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_floatId_key" ON "DatabaseElemant"("floatId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_boolId_key" ON "DatabaseElemant"("boolId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_queryId_key" ON "DatabaseElemant"("queryId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseElemant_documentId_key" ON "DatabaseElemant"("documentId");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_ownrId_fkey" FOREIGN KEY ("ownrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_strId_fkey" FOREIGN KEY ("strId") REFERENCES "Str"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_intId_fkey" FOREIGN KEY ("intId") REFERENCES "Integer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_floatId_fkey" FOREIGN KEY ("floatId") REFERENCES "Floate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_boolId_fkey" FOREIGN KEY ("boolId") REFERENCES "Bool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_queryId_fkey" FOREIGN KEY ("queryId") REFERENCES "Query"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_parentDocid_fkey" FOREIGN KEY ("parentDocid") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseElemant" ADD CONSTRAINT "DatabaseElemant_parentQueriId_fkey" FOREIGN KEY ("parentQueriId") REFERENCES "Query"("id") ON DELETE SET NULL ON UPDATE CASCADE;
