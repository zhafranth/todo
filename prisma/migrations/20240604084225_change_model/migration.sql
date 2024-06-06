/*
  Warnings:

  - You are about to drop the `film` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `operator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `film`;

-- DropTable
DROP TABLE `operator`;

-- DropTable
DROP TABLE `product_info`;

-- DropTable
DROP TABLE `teater`;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
