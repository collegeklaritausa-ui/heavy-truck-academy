ALTER TABLE `user_course_progress` MODIFY COLUMN `completedMaterials` json;--> statement-breakpoint
ALTER TABLE `driving_schools` ADD `licenseTypesJson` text;--> statement-breakpoint
ALTER TABLE `driving_schools` ADD `servicesJson` text;--> statement-breakpoint
ALTER TABLE `knowledge_articles` ADD `tagsJson` text;--> statement-breakpoint
ALTER TABLE `license_requirements` ADD `testTypesJson` text;--> statement-breakpoint
ALTER TABLE `listings` ADD `imagesJson` text;--> statement-breakpoint
ALTER TABLE `scraping_sources` ADD `configJson` text;--> statement-breakpoint
ALTER TABLE `driving_schools` DROP COLUMN `licenseTypes`;--> statement-breakpoint
ALTER TABLE `driving_schools` DROP COLUMN `services`;--> statement-breakpoint
ALTER TABLE `knowledge_articles` DROP COLUMN `tags`;--> statement-breakpoint
ALTER TABLE `license_requirements` DROP COLUMN `testTypes`;--> statement-breakpoint
ALTER TABLE `listings` DROP COLUMN `images`;--> statement-breakpoint
ALTER TABLE `scraping_sources` DROP COLUMN `config`;