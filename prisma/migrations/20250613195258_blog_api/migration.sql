-- CreateTable
CREATE TABLE "users" (
    "User_id" TEXT NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("User_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "Post_id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Creation_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Recent_Update" TIMESTAMP(3) NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("Post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "users_Username_key" ON "users"("Username");
