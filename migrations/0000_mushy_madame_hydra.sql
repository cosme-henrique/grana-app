CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`purchaseDate` text,
	`dueDate` text NOT NULL,
	`status` text NOT NULL
);
