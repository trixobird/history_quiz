-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "translations" JSONB;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "translations" JSONB;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "translations" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';
