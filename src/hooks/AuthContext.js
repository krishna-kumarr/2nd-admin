import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loginType, setLoginType] = useState("")


    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
  
    };
    return (
        <AuthContext.Provider value={{ auth, setAuth,setLoginType,loginType ,clearCacheData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;