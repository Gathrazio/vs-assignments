import { useState, createContext } from 'react'
import axios from 'axios';

export const UserContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function UserProvider (props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || '',
        issues: []
    };
    const [userState, setUserState] = useState(initState);

    async function signup (credentials) {
        const res = await axios.post('/api/auth/signup', credentials);
        return res;
    }

    async function login (credentials) {
        const res = await axios.post('/api/auth/login', credentials);
        return res;
    }

    function logout () {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: '',
            issues: []
        })
    }

    function setUser ({user, token}) {
        setUserState(prev => ({
            ...prev,
            user: user,
            token: token
        }))
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
    }

    async function postIssue (newIssue) {
        const res = await userAxios.post('/api/protected/issues', newIssue);
        return res;
    }

    function addIssue (postedIssue) {
        setUserState(prev => ({
            ...prev,
            issues: [...prev.issues, postedIssue]
        }))
    }


    return (
        <UserContext.Provider
            value={{
                userInfo: userState,
                signup,
                login,
                logout,
                setUser,
                postIssue,
                addIssue
            }}>
            { props.children }
        </UserContext.Provider>
    )
}