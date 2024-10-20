/*
  Warnings:

  - You are about to drop the column `createdAt` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `registrations` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

/*

ALTER TABLE "registrations" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

*/

ALTER TABLE "registrations" RENAME COLUMN "createdAt" TO "created_at" ;
ALTER TABLE "registrations" RENAME COLUMN "updatedAt" TO "updated_at";
