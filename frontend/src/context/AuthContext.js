import { createContext, useEffect, useState } from 'react';
import { getUserData } from '../services';

export const AuthContext = createContext();

const AuthProviderContext = ({ children }) => {

    // aquí pasamos todo el token por el árbol de componentes para poder utilizarlo en cualquier otro componente.
    // también validamos que si hay token se mantenga login, si no se desconecte.

    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {

        const getMyUserData = async () => {
            try {
                const info = await getUserData({token});
                setUser(info);
            } catch (error) {
                logOut()
            }
        }

        if(token) getMyUserData()
    }, [token]);

    const login = (token) => {
        setToken(token);
    }

    const logOut = () => {
        setToken('');
        setUser(null);
    }

    return (
    <AuthContext.Provider value={{token, user, login, logOut}} >{children}
        </AuthContext.Provider>
    );
}

export default AuthProviderContext;
