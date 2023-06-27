// import { useEffect, useState } from "react";
// import { useFilesActions } from "../hooks/api";

// function TrashPage() {
//   const { getTrashFiles } = useFilesActions();
//   const [trashFiles, setTrashFiles] = useState([]);

//   useEffect(() => {
//     // Obtener los archivos de la papelera al cargar la página
//     getTrashFiles()
//       .then((data) => setTrashFiles(data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div>
//       <h1>Papelera</h1>
//       {/* Renderizar los archivos de la papelera */}
//       {trashFiles.map((file) => (
//         <div key={file.id}>
//           <p>{file.fileName}</p>
//           {/* Mostrar más información del archivo si es necesario */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TrashPage;
