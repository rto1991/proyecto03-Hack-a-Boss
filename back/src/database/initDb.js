"use strict";
require("dotenv").config();

const mysql = require("mysql2/promise");

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

async function createTables() {
  try {
    await connection.query(
      `CREATE TABLE IF NOT EXISTS users (
        id int unsigned NOT NULL AUTO_INCREMENT,
        date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        email varchar(100) NOT NULL,
        password varchar(512) NOT NULL,
        name varchar(100) DEFAULT NULL,
        avatar varchar(100) DEFAULT NULL,
        active tinyint(1) DEFAULT '0',
        role enum('admin','normal') NOT NULL DEFAULT 'normal',
        regCode char(36) DEFAULT NULL,
        deleted tinyint(1) DEFAULT '0',
        lastAuthUpdate datetime DEFAULT NULL,
        recoverCode char(36) DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`
    );
    console.log("Tabla Users creada");

    await connection.query(
      `CREATE TABLE IF NOT EXISTS files (
        id int unsigned NOT NULL AUTO_INCREMENT,
        id_user int(11) unsigned NOT NULL DEFAULT(0),
        date_add datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        date_upd datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        fileDescription varchar(125) NOT NULL,
        fileName varchar(125) DEFAULT NULL,
        filePath varchar(255) DEFAULT NULL,
        is_folder tinyint(1) DEFAULT '0',
        is_public tinyint(1) DEFAULT '0',
        in_recycle_bin tinyint(1) DEFAULT '0',
        size INT (11) DEFAULT '0',
        breadCrumb varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (id_user) REFERENCES users(id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`
    );
    console.log("Tabla files creada");

    await connection.query(
      `CREATE TABLE IF NOT EXISTS logs (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        id_user INT(11) UNSIGNED NOT NULL DEFAULT (0),
        id_file INT(11) UNSIGNED NOT NULL DEFAULT (0),
        log_type ENUM('info','error','acceso','copiar','insertar','papelera','borrar') DEFAULT('info'),
        date_add DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        date_upd DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (id_user) REFERENCES users(id),
        FOREIGN KEY (id_file) REFERENCES files(id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`
    );
    console.log("Tabla Logs creada");
  } catch (error) {
    console.error("Error al crear las tablas: ", error);
  } finally {
    connection.end();
  }
}

createTables();
