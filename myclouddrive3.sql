# Host: 46.183.113.60  (Version 5.5.5-10.3.38-MariaDB-0ubuntu0.20.04.1)
# Date: 2023-07-07 20:22:54
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "logs"
#

CREATE TABLE `logs` (
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

#
# Structure for table "users"
#

CREATE TABLE `users` (
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
  `last_name` varchar(50) DEFAULT NULL,
  `tel` decimal(15,0) DEFAULT NULL,
  `zipcode` varchar(8) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Structure for table "files"
#

CREATE TABLE `files` (
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
  `breadCrumb` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
