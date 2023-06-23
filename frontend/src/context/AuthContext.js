import { createContext, useEffect, useState } from 'react';
import { getUserData } from '../services';

export const AuthContext = createContext();

const AuthProviderContext = ({ children }) => {

    // aquí pasamos todo el token por el árbol de componentes para poder utilizarlo en cualquier otro componente.
    // también validamos que si hay token se mantenga login, si no se desconecte.

    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const [ id, setId ] = useState(localStorage.getItem('id'));
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem('id', id);
    }, [id]);

    // console.log(user);

    useEffect(() => {

        const getMyUserData = async () => {
            try {
                const info = await getUserData({ token, id });
                setUser(info);
                // console.log(info.id, info.token);
                // console.log(info);
            } catch (error) {
                logOut()
            }
        }

        if(token && id) getMyUserData()

    }, [token, id]);

    

    const login = (token) => {
        setToken(token);
        // setId(id);
    }

    const logOut = () => {
        setToken('');
        setUser(null);
        setId('');
    }

    return (
    <AuthContext.Provider value={{token, user, id, login, logOut}} >{children}
        </AuthContext.Provider>
    );
}

export default AuthProviderContext;
