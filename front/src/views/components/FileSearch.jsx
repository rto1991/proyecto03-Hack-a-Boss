import { TextField } from '@mui/material'
import './FileSearch.css'
import { useUser } from '../../UserContext'
function FileSearch () 
{
    const [user] = useUser()

    return (
    <>
        <div className="searchForm">
            <TextField
            margin="normal"
            required
            fullWidth
            name="fileSearch"
            label="Buscar un archivo"
            type="text"
            >
            </TextField>
            <img
          src="/lupa.png"
          alt="Salir"
          title="Salir"
        />
        </div>
        <div className="breadCrumb">
            <p>Estás en: {user.info.breadCrumb}</p>
        </div>
    </>
    )
}
export default FileSearch