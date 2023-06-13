'use strict';

const { getConnection } = require('./getConnection');
require('dotenv').config();

async function main() {
    // console.log("main");
    let connection;

    try {
        connection = await getConnection();
        
        console.log("Eliminando tablas si existen...");

        await connection.query('DROP TABLE IF EXISTS probando3');
        await connection.query('DROP TABLE IF EXISTS probando2');
        await connection.query('DROP TABLE IF EXISTS probando');
        
        // setTimeout(() => {
            console.log("Creando tablas...");
        // }, 1000);
        
        await connection.query (`
        CREATE TABLE IF NOT EXISTS probando (
            id int unsigned NOT NULL AUTO_INCREMENT,
            date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            email varchar(100) NOT NULL,
            password varchar(512) NOT NULL,
            name varchar(100) DEFAULT NULL,
            last_name varchar (50) DEFAULT NULL,
            tel numeric(15,0) DEFAULT NULL,
            zipcode varchar(8) DEFAULT NULL,
            addres varchar(255) DEFAULT NULL,
            city varchar(100) DEFAULT NULL,
            province varchar(100) DEFAULT NULL,
            avatar varchar(100) DEFAULT NULL,
            active tinyint(1) DEFAULT '0',
            role enum('admin','normal') NOT NULL DEFAULT 'normal',
            regCode char(36) DEFAULT NULL,
            deleted tinyint(1) DEFAULT '0',
            lastAuthUpdate datetime DEFAULT NULL,
            recoverCode char(36) DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY email (email)
          ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
          `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS probando2 (
            id int unsigned NOT NULL AUTO_INCREMENT,
            id_probando int(11) unsigned NOT NULL DEFAULT(0),
            date_add datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            date_upd datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fileDescription varchar(125) NOT NULL,
            fileName varchar(125) DEFAULT NULL,
            filePath varchar(255) DEFAULT NULL,
            is_folder tinyint(1) DEFAULT '0',
            is_public tinyint(1) DEFAULT '0',
            in_recycle_bin tinyint(1) DEFAULT '0',
            PRIMARY KEY (id),
            FOREIGN KEY (id_probando) REFERENCES probando(id)
          ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS probando3 (
            id INT unsigned NOT NULL AUTO_INCREMENT,
            id_probando INT(11) UNSIGNED NOT NULL DEFAULT (0),
            id_probando2 INT(11) UNSIGNED NOT NULL DEFAULT (0),
            log_type ENUM('info','error','acceso','copiar','insertar','papelera','borrar') DEFAULT('info'),
            date_add DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            date_upd DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (id_probando) REFERENCES probando(id),
            FOREIGN KEY (id_probando2) REFERENCES probando2(id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // setTimeout(() => {
                console.log("Tablas creadas");
            // }, 2000);
            
    } catch (error) {
        console.error(error);
    }finally{
        if(connection){
            connection.release();
        }
        // 3 - Internal JavaScript Parse Error
        process.exit(3);
    }
}

main();

    
