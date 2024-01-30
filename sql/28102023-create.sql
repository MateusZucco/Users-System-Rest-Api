DROP SCHEMA IF EXISTS `users_schema`;
CREATE SCHEMA `users_schema` ;

USE `users_schema`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT(11) UNIQUE AUTO_INCREMENT NOT NULL,
  `email` TEXT NOT NULL UNIQUE,
  `password` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `age` INT(3) NOT NULL,
  `status` ENUM ('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  `profile_id` INT(11),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`user_id`)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `profile_permission`;
CREATE TABLE `profile_permission` (
  `profile_permission_id` INT(11) UNIQUE AUTO_INCREMENT NOT NULL,
  `profile_id` INT(11) NOT NULL,
  `permission_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`profile_permission_id`)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `profile_id` INT(11) UNIQUE AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `status` ENUM ('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`profile_id`)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `permission_id` INT(11) AUTO_INCREMENT UNIQUE NOT NULL ,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(`permission_id`)
)ENGINE=InnoDB;

ALTER TABLE `users` ADD `fk_user_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `profile_permission` ADD CONSTRAINT `fk_profile_permission_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`);

ALTER TABLE `profile_permission` ADD CONSTRAINT `fk_profile_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`);

