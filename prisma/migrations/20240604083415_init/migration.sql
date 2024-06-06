-- CreateTable
CREATE TABLE `product_info` (
    `product` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `film` (
    `id` VARCHAR(20) NOT NULL,
    `judul` VARCHAR(50) NOT NULL,
    `deskripsi` TEXT NULL,
    `rating` VARCHAR(50) NOT NULL,
    `produksi` VARCHAR(100) NOT NULL,
    `distributor` VARCHAR(100) NOT NULL,
    `durasi` INTEGER NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operator` (
    `id` VARCHAR(20) NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teater` (
    `id` VARCHAR(20) NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
