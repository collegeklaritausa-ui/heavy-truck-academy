CREATE TABLE `certifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`courseId` int,
	`certificateNumber` varchar(100) NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	`status` enum('active','expired','revoked') DEFAULT 'active',
	CONSTRAINT `certifications_id` PRIMARY KEY(`id`),
	CONSTRAINT `certifications_certificateNumber_unique` UNIQUE(`certificateNumber`)
);
--> statement-breakpoint
CREATE TABLE `course_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameDe` varchar(255),
	`nameEs` varchar(255),
	`nameFr` varchar(255),
	`nameAr` varchar(255),
	`slug` varchar(255) NOT NULL,
	`icon` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`level` enum('beginner','intermediate','advanced','expert') DEFAULT 'beginner',
	`durationHours` int,
	`imageUrl` varchar(500),
	`isPublished` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `driving_schools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(500) NOT NULL,
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`address` text,
	`city` varchar(255),
	`state` varchar(255),
	`country` varchar(100),
	`countryCode` varchar(5),
	`region` enum('europe','north_america') NOT NULL,
	`phone` varchar(50),
	`email` varchar(320),
	`website` varchar(500),
	`licenseTypes` json DEFAULT ('[]'),
	`services` json DEFAULT ('[]'),
	`rating` decimal(3,2),
	`reviewCount` int DEFAULT 0,
	`priceRange` varchar(100),
	`imageUrl` varchar(500),
	`sourceUrl` varchar(1000),
	`sourceType` enum('manual','scraped') DEFAULT 'manual',
	`isVerified` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `driving_schools_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipment_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameDe` varchar(255),
	`nameEs` varchar(255),
	`nameFr` varchar(255),
	`nameAr` varchar(255),
	`slug` varchar(255) NOT NULL,
	`icon` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `equipment_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `equipment_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `job_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameDe` varchar(255),
	`nameEs` varchar(255),
	`nameFr` varchar(255),
	`nameAr` varchar(255),
	`slug` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `job_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `job_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`company` varchar(255),
	`location` varchar(255),
	`country` varchar(100),
	`region` enum('europe','north_america','other') DEFAULT 'europe',
	`salaryMin` decimal(12,2),
	`salaryMax` decimal(12,2),
	`salaryCurrency` varchar(10) DEFAULT 'EUR',
	`employmentType` enum('full_time','part_time','contract','temporary') DEFAULT 'full_time',
	`experienceLevel` enum('entry','mid','senior','executive') DEFAULT 'entry',
	`sourceUrl` varchar(1000),
	`sourceType` enum('manual','scraped') DEFAULT 'manual',
	`scrapedFrom` varchar(255),
	`isActive` boolean DEFAULT true,
	`postedAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`contentEn` text,
	`contentDe` text,
	`contentEs` text,
	`contentFr` text,
	`contentAr` text,
	`articleType` enum('repair_guide','fabrication','maintenance','troubleshooting','general') DEFAULT 'general',
	`manufacturer` varchar(255),
	`vehicleType` varchar(255),
	`sourceUrl` varchar(1000),
	`sourceType` enum('manual','scraped') DEFAULT 'manual',
	`scrapedFrom` varchar(255),
	`tags` json DEFAULT ('[]'),
	`viewCount` int DEFAULT 0,
	`isPublished` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `knowledge_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameDe` varchar(255),
	`nameEs` varchar(255),
	`nameFr` varchar(255),
	`nameAr` varchar(255),
	`slug` varchar(255) NOT NULL,
	`parentId` int,
	`icon` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knowledge_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `knowledge_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `license_requirements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`licenseTypeId` int,
	`country` varchar(100) NOT NULL,
	`countryCode` varchar(5) NOT NULL,
	`requirementsEn` text,
	`requirementsDe` text,
	`requirementsEs` text,
	`requirementsFr` text,
	`requirementsAr` text,
	`minimumAge` int,
	`medicalRequired` boolean DEFAULT true,
	`testTypes` json DEFAULT ('[]'),
	`validityYears` int,
	`renewalProcess` text,
	`sourceUrl` varchar(1000),
	`sourceType` enum('manual','scraped') DEFAULT 'manual',
	`lastVerified` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `license_requirements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `license_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameDe` varchar(255),
	`nameEs` varchar(255),
	`nameFr` varchar(255),
	`nameAr` varchar(255),
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`vehicleClass` enum('truck','bus','trailer','hazmat','passenger') DEFAULT 'truck',
	`region` enum('europe','north_america') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `license_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`categoryId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`price` decimal(12,2),
	`currency` varchar(10) DEFAULT 'EUR',
	`condition` enum('new','like_new','good','fair','parts') DEFAULT 'good',
	`year` int,
	`manufacturer` varchar(255),
	`model` varchar(255),
	`location` varchar(255),
	`country` varchar(100),
	`images` json DEFAULT ('[]'),
	`contactEmail` varchar(320),
	`contactPhone` varchar(50),
	`status` enum('active','sold','pending','expired') DEFAULT 'active',
	`viewCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `listings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scraping_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceId` int,
	`status` enum('success','failed','partial') NOT NULL,
	`itemsFound` int DEFAULT 0,
	`itemsAdded` int DEFAULT 0,
	`errorMessage` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `scraping_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scraping_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(1000) NOT NULL,
	`sourceType` enum('jobs','knowledge','licenses','schools') NOT NULL,
	`region` enum('europe','north_america','global') DEFAULT 'global',
	`isActive` boolean DEFAULT true,
	`lastScrapedAt` timestamp,
	`scrapeFrequency` enum('hourly','daily','weekly') DEFAULT 'daily',
	`config` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scraping_sources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `test_materials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`licenseTypeId` int,
	`country` varchar(100),
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`materialType` enum('study_guide','practice_test','regulations','handbook') DEFAULT 'study_guide',
	`contentUrl` varchar(1000),
	`sourceUrl` varchar(1000),
	`sourceType` enum('manual','scraped') DEFAULT 'manual',
	`isOfficial` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `test_materials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_materials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`contentType` enum('video','document','quiz','interactive') DEFAULT 'document',
	`contentUrl` varchar(500),
	`orderIndex` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_materials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_programs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolId` int,
	`titleEn` varchar(500) NOT NULL,
	`titleDe` varchar(500),
	`titleEs` varchar(500),
	`titleFr` varchar(500),
	`titleAr` varchar(500),
	`descriptionEn` text,
	`descriptionDe` text,
	`descriptionEs` text,
	`descriptionFr` text,
	`descriptionAr` text,
	`licenseType` varchar(100),
	`durationWeeks` int,
	`price` decimal(10,2),
	`currency` varchar(10) DEFAULT 'EUR',
	`includesTheory` boolean DEFAULT true,
	`includesPractical` boolean DEFAULT true,
	`includesExam` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_course_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`courseId` int,
	`progressPercent` int DEFAULT 0,
	`completedMaterials` json DEFAULT ('[]'),
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `user_course_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `preferredLanguage` varchar(5) DEFAULT 'en';--> statement-breakpoint
ALTER TABLE `certifications` ADD CONSTRAINT `certifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certifications` ADD CONSTRAINT `certifications_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_categoryId_course_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `course_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_categoryId_job_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `job_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `knowledge_articles` ADD CONSTRAINT `knowledge_articles_categoryId_knowledge_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `knowledge_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `license_requirements` ADD CONSTRAINT `license_requirements_licenseTypeId_license_types_id_fk` FOREIGN KEY (`licenseTypeId`) REFERENCES `license_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `listings` ADD CONSTRAINT `listings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `listings` ADD CONSTRAINT `listings_categoryId_equipment_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `equipment_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `scraping_logs` ADD CONSTRAINT `scraping_logs_sourceId_scraping_sources_id_fk` FOREIGN KEY (`sourceId`) REFERENCES `scraping_sources`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `test_materials` ADD CONSTRAINT `test_materials_licenseTypeId_license_types_id_fk` FOREIGN KEY (`licenseTypeId`) REFERENCES `license_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `training_materials` ADD CONSTRAINT `training_materials_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `training_programs` ADD CONSTRAINT `training_programs_schoolId_driving_schools_id_fk` FOREIGN KEY (`schoolId`) REFERENCES `driving_schools`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_progress` ADD CONSTRAINT `user_course_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_progress` ADD CONSTRAINT `user_course_progress_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;