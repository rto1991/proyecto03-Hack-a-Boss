

#                                    ***********************⌬⎨☁️ MI DISCO DURO - ONLINE ☁️⎬⌬***********************

El siguiente proyecto está siendo desarrollado por los alumnos del grupo A 📝 del Bootcamp de
Desarrolladores web Full Stack 👾 ; en esta segunda fase del proyecto estaremos desarrollando
el back-end de nuestra API, la cual se ejecuta mediante NodeJs, con lenguaje JavaScript y
conexión a la base de datos con SQL.

Desarrollaremos distintos Endpoints que iremos explicando en adelante con detalle, se indicará
así mismo los accesos a la BBDD y distintos datos necesarios en el .env para la configuración y
funcionamiento del proyecto.

#  ---- *******Alcance requerido******* ----

    1️⃣ Se permitirá registrarse y loguearse a usuarios anónimos.

    2️⃣ Se desarrrolla un servidor capaz de crear carpetas y almacenar archivos.

    3️⃣ Se autoriza a las modificaciones de los perfiles registrados en algunos campos.

    4️⃣ Se permite la descarga de ficheros.

    5️⃣ Se agregan / borran archivos solo para perfiles registrados.

# ---- *******Desarrollos******* ----

## Middlewares
        🤷🏼 Verificación de rutas desconocidas.

        🔒 Validación segura de usuarios.

        👍🏼 Confirmación de usuario.

## Endpoints:

        🧑🏻‍💻 Users:
            - GET ** /user/:id ➡️ Ver datos del usuario logueado.

            - POST ** /newUser ➡️ Registro de nuevo usuario. ** Acceso para usuarios anónimos.
                ⚫️ Datos requeridos en el body:
                    { "mail": "", "pwd": "" }

            - PATCH ** /updateUser/:id ➡️ Actualizar datos del usuario según su perfil.
                ⚫️ Datos requeridos en el body:
                    { "name": "Nombre" }

            - DELETE ** /deleteUser/:id ➡️ Soft delete de usuarios con permisos.
            
            - POST ** /users/login ➡️ Login de usuarios registrados ** Acceso para usuarios anónimos.
                ⚫️ Datos requeridos en el body:
                    { "mail": "", "pwd": "" }
            
            - PATCH ** /users/changePassword/:id ➡️ Modificación de password.
                ⚫️ Datos requeridos en el body:
                    { "mail": "", "oldPwd": "", "newPwd": "" }
            
            - GET ** /users/validate/:regCode ➡️ Validación de usuarios registrados.
            
            - POST ** /users/recoverPassword ➡️ Recuperación de password con validación token.
                ⚫️ Datos requeridos en el body:
                    { "mail": "" }
            
            - POST ** /users/resetPassword ➡️ Modificación de token registrado para modificación de password.
                ⚫️ Datos requeridos en el body:
                    { "recoverCode" : "", "newPassword" : "" }

        🗂️ Files:
            - GET ** /download/:fileId ➡️ Descarga del fichero seleccionado.

            - GET ** /dir ➡️ Listar todos los archivos contenidos para usuario validado.
            
            - GET ** /rd/:directoryToDelete ➡️ Borrado de directorios vacíos.
            
            - DELETE ** /file/:fileName ➡️ Borrado de ficheros contenidos en los directorios.
            
            - POST ** /uploadFile ➡️ Subida de ficheros a usuarios registrados.
                ⚫️ Datos requeridos en el body:
                    form.data campo: uploadedFile

            - GET ** /makeFolder/:folderName ➡️ Creación de carpetas a usuarios validados.

            - GET ** /getCurrentFolder ➡️ Nos indica el directorio en el cual nos encontramos ubicados.
            
            - GET ** /cd/:destinationDirectory ➡️ Valida y permite moverse por los directorios del usuario.
                ⚫️ Permite el uso de .. para moverse atrás en los directorios.
            
            - GET ** /renameDirectory/:oldName/:newName ➡️ Modificación del nombre del directorio.
            
            - POST ** /moveFile ➡️  Mover el archivo dentro de las carpetas de nuestro directorio.
                ⚫️ Datos requeridos en el body:
                    { "fileId":"(id del fichero a mover)", "destinationFolderName": "(carpeta de destino)" }

            - GET ** /emptyTrash ➡️ Vaciado de la papelera.

            - POST ** /renameFile ➡️ Modificación del nombre del fichero.
                ⚫️ Datos requeridos en el body:
                    { "fileName":"factura_4660.pdf", "newFileName": "factura_4660_renamed.pdf" }

            - GET ** /moveToTrash/:fileName ➡️ Mover a la papelera el fichero indicado.

            - GET ** /recoverFile/:fileName ➡️ Recuperar un fichero de la papelera.

## Módulos instalados para el funcionamiento del servidor
        
        - Mysql.
        
        - Sharp.
        
        - Express.
        
        - Json webToken.
        
        - Morgan.
        
        - Nodemon.
        
        - Uuid.
        
        - @sendgrid/mail.
        
        - Cors.



# ---- *******Mejoras propuestas******* ----

        ⬇️ Gestión de descarga de archivos.

        📂 Modificación de los directorios y archivos creados por el usuario.

        ⚠ Validación del tipo de perfil de los usuarios registrados, permitiendo así las
            modificaciones acorde al perfil dado.

        📨 Confirmación mediante correo de las modificaciones realizadas al perfil, así como
            el envío de códigos mediante correo electrónico validado del cliente.

# ---- *******Conexión con la BBDD******* ----

    Dentro de los archivos contenidos en el repositorio debéis utilizar el fichero myclouddrive.sql
    para crear la base de datos; también podéis econtrar el .env_example, en el cual podéis confirmar
    los datos necesarios para la conexión a la BBDD. 

        - HOST.
        - USER.
        - PASSWORD.
        - DATABASSE.
        
En este caso se desarrolló mediante conexión local para pruebas y VPS para el código
colaborativo en la BBDD.




# ---- Instrucciones ----

Para el funcionamiento de todo el servidor, hará falta también otros datos indicados dentro del .env_example.

Dentro de dicho archivo tenéis el contenido necesario a aplicar para cada campo:

        - SENDGRID_API_KEY.
        
        - SENDGRID_FROM.
        
        - PUBLIC_HOST.
        
        - ROOT_DIR.
        
        - SECRET_TOKEN.

*Pasos sugeridos a seguir para el correcto funcionamiento del servidor:*

    1️⃣ Instalar módulos.

    2️⃣ Conectar a la BBDD con los datos indicados.

    3️⃣ Crear rutas con los endpoints en Postman.

    4️⃣ A empezar con los testings! 👍🏼

PD: Al momento de registrar un usuario debéis realizarlo con un mail válido,
debido a que mediante este se enviarán claves y datos sencibles ⚠️.


# ---- Enlaces ----

- Morgan: https://www.npmjs.com/package/morgan

- Sendgrid: https://www.npmjs.com/package/@sendgrid/mail

- Uuid: https://www.npmjs.com/package/uuid

- Joi: https://www.npmjs.com/package/joi?activeTab=readme

- Query: https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query

- Express-fileupload: https://www.npmjs.com/package/express-fileupload

- Express: https://www.npmjs.com/package/express


#                                                     ---- *******Tecnologías empleadas******* ----


# <img width="166" alt="IMG_NodeJs_" src="https://user-images.githubusercontent.com/123706095/236196535-2783aca6-aaee-4675-8501-f35ee35d1a5b.png">


# <img width="139" alt="IMG_MySql_" src="https://user-images.githubusercontent.com/123706095/236196551-452673a1-6f0e-4693-8c37-8fbbb3067788.png">

# [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()

# <img width="114" alt="img_123_" src="https://github.com/rto1991/proyecto02-Hack-a-Boss/assets/123706095/cca98819-db13-4f4d-ab25-918de9d27064">
