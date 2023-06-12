
CREATE DATABASE IF NOT EXISTS `myclouddrive`;
USE `myclouddrive`;


CREATE TABLE IF NOT EXISTS `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned NOT NULL DEFAULT 0,
  `date_add` datetime NOT NULL DEFAULT current_timestamp(),
  `date_upd` datetime NOT NULL DEFAULT current_timestamp(),
  `fileDescription` varchar(125) NOT NULL,
  `fileName` varchar(125) DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `is_folder` tinyint(1) DEFAULT 0,
  `is_public` tinyint(1) DEFAULT 0,
  `in_recycle_bin` tinyint(1) DEFAULT 0,
  `parent_dir_id` int(11) DEFAULT 0,
  `size` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned NOT NULL DEFAULT 0,
  `id_file` int(11) unsigned NOT NULL DEFAULT 0,
  `log_type` enum('info','error','acceso','copiar','insertar','papelera','borrar') DEFAULT 'info',
  `date_add` datetime NOT NULL DEFAULT current_timestamp(),
  `date_upd` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_file` (`id_file`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`id_file`) REFERENCES `files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL,
  `password` varchar(512) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `role` enum('admin','normal') NOT NULL DEFAULT 'normal',
  `regCode` char(36) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `lastAuthUpdate` datetime DEFAULT NULL,
  `recoverCode` char(36) DEFAULT NULL,
  `currentFolder_id` int(11) DEFAULT 0 COMMENT 'Determina el directorio donde se encuentra el usuario, persiste en la BD por lo que al loguearse seguirá en ese directorio, 0 = usuarios admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
