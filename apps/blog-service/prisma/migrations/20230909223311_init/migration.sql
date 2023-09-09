-- CreateTable
CREATE TABLE `Blogpost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `authorUuid` VARCHAR(191) NOT NULL,
    `authorHandle` VARCHAR(191) NOT NULL,
    `postUuid` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Blogpost_uuid_key`(`uuid`),
    UNIQUE INDEX `Blogpost_postUuid_key`(`postUuid`),
    UNIQUE INDEX `Blogpost_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
