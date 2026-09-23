CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actorId` int,
	`action` varchar(120) NOT NULL,
	`targetType` varchar(80),
	`targetId` int,
	`metadata` text,
	`success` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(240) NOT NULL,
	`message` text NOT NULL,
	`emailStatus` varchar(40) NOT NULL DEFAULT 'not_configured',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` enum('comic','game','video','animation','music','project','character','universe','artwork','release','update') NOT NULL,
	`slug` varchar(180) NOT NULL,
	`title` varchar(220) NOT NULL,
	`eyebrow` varchar(120),
	`description` text,
	`body` text,
	`imageUrl` text,
	`thumbnailUrl` text,
	`metadata` text,
	`department` varchar(120),
	`status` enum('draft','submitted','in_review','approved','rejected','scheduled','published','archived') NOT NULL DEFAULT 'draft',
	`featured` int NOT NULL DEFAULT 0,
	`authorId` int,
	`publishedAt` timestamp,
	`releaseDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_items_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `content_relations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromContentId` int NOT NULL,
	`toContentId` int NOT NULL,
	`relationType` varchar(80) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `content_relations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talent_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`specialty` varchar(180) NOT NULL,
	`department` varchar(120),
	`portfolio` text,
	`socialLinks` text,
	`biography` text,
	`experience` text,
	`message` text,
	`status` varchar(40) NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talent_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`photoUrl` text,
	`role` varchar(160),
	`department` varchar(120),
	`specialty` varchar(180),
	`biography` text,
	`socialLinks` text,
	`portfolioUrl` text,
	`displayOrder` int NOT NULL DEFAULT 0,
	`published` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','department_admin','super_admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `department` varchar(120);