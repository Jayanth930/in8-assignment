/*
  Warnings:

  - You are about to drop the column `firstName` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `registrations` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
/*
ALTER TABLE "registrations" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(255);

*/

-- RenameTable (I modified this to be efficient cause we need not to drop column in Postgresql to Rename)

ALTER TABLE "registrations" RENAME COLUMN "firstName" TO "first_name" ;
ALTER TABLE "registrations" RENAME COLUMN "lastName" TO "last_name";
