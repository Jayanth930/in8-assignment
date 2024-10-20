-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "email" VARCHAR(325) NOT NULL,
    "password" TEXT NOT NULL,
    "phone_no" VARCHAR(20),
    "date_of_birth" DATE NOT NULL,
    "linkedin_url" TEXT,
    "github_link" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registrations_email_idx" ON "registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_email_key" ON "registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_phone_no_key" ON "registrations"("phone_no");
