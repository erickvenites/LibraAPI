-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
