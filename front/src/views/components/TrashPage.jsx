import { useEffect } from "react";
import { useFilesActions } from "../../hooks/api";
import { FormattedMessage } from "react-intl";

function TrashPage() {
  const { getTrashFiles, trashFiles } = useFilesActions();

  useEffect(() => {
    // Obtener los archivos de la papelera al cargar la página
    async function trashFiles() {
      await getTrashFiles();
    }

    trashFiles();
  }, []);
  console.log(trashFiles);
  return (
    <div>
      <h1>
        <FormattedMessage id="directorioPapelera" />
      </h1>
      {/* Renderizar los archivos de la papelera */}
      {trashFiles?.map((file) => (
        <div key={file.id}>
          <p>{file.fileName}</p>
          {/* Mostrar más información del archivo si es necesario */}
        </div>
      ))}
    </div>
  );
}

export default TrashPage;
