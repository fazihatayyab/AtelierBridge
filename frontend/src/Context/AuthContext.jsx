import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
                // import.meta.env is just like Process.env as we write in beckend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true); // true while checking existing session 

    
    useEffect(() => {
        async function tryRefresh() {
            try {
                const res = await axios.post(
                    `${API_URL}/api/auth/refreshToken`,
                    {},
                    { withCredentials: true } // sends the httpOnly refreshToken cookie
                );
                setAccessToken(res.data.accessToken);
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        }

        tryRefresh();
    }, []);
        // Calls the backend once to get a fresh accessToken, using the httpOnly  refreshToken cookie.
    
        async function refreshAccessToken() {
            const res = await axios.post(
                `${API_URL}/api/auth/refreshToken`,
                {},
                { withCredentials: true }
            );
            setAccessToken(res.data.accessToken);
            setUser(res.data.user);
            return res.data.accessToken;
        }
    
        // The one function every page should use instead of calling axios directly.
        //  try the request with whatever token we currently have.
    
        async function authFetch(method, path, data = null, extraConfig = {}) {

                const token = accessToken || (await refreshAccessToken());
            try {
                // axios doing some config here 
                return await axios({
                    method,
                    url: `${API_URL}${path}`,
                    data,
                    ...extraConfig,
                    headers: { Authorization: `Bearer ${token}`,
                        ...extraConfig.headers,

                     },
                
                });
            } catch (err) {
                console.log(err.message)
                const isExpiredToken = err.response?.status === 401;
                // Actually if the error is ExpiredToken then authFetch will handle If the error other than 401 then it will give Up
                if (!isExpiredToken) {
                    throw err; // some other error (403, 404, 500...) but  if condition false then it will not excecute and calls refreshAccessToken as below 
                }
            //    new Token which comes from  refreshAccessToken function  after calling }/api/auth/refreshToken then  retry the SAME request with the new token.
    
                const newToken = await refreshAccessToken();
    
                return axios({
                    method,
                    url: `${API_URL}${path}`,
                    data,
                    ...extraConfig,
                    headers: { Authorization: `Bearer ${newToken}`,
                        ...extraConfig.headers,
                     },
                    
                });
            }
        }

    async function register({ name, email, password, role }) {
        const res = await axios.post(
            `${API_URL}/api/auth/register`,
            { name, email, password, role },
            { withCredentials: true }
        );
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        return res.data;
    }

    async function login({ email, password }) {
        
        const res = await axios.post(
            `${API_URL}/api/auth/login`,
            { email, password },
            { withCredentials: true }
        );
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        return res.data;
    
    }

    async function logout() {
        try {
            await axios.post(
                `${API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (err) {
            // Even if the request fails, clear local state so the UI reflects logout
            console.error("Logout request failed:", err.message);
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    }
     function updateUser(updatedFields) {
        // if both objects have the same key, the LATER one wins — so ...updatedFields (written second) overwrites any matching keys from ...prev.
        setUser((prev) => ({ ...prev, ...updatedFields }));
    }

    const value = {
        user,
        accessToken,
        loading,
        // this is always exactly `true` or `false` not a whole string of accessToken
        isAuthenticated: !!accessToken,
        register,
        login,
        logout,
        updateUser,
        authFetch
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
