-- CreateTable
CREATE TABLE "ServiceImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE INDEX "ServiceImage_slug_idx" ON "ServiceImage"("slug");
