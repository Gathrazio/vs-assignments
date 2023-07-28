import { useState, createContext, useEffect } from 'react'
import axios from 'axios';

export const IssueContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function IssueProvider (props) {

    const [comments, setComments] = useState([]);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        retrieveComments()
        retrieveIssues()
    }, [])

    function retrieveComments () {
        userAxios.get(`/api/protected/comments`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }

    function retrieveIssues () {
        userAxios.get(`/api/protected/issues`)
            .then(res => setIssues(res.data))
            .catch(err => console.log(err))
    }

    return (
        <IssueContext.Provider value={{
            comments,
            issues
        }}>
            {props.children}
        </IssueContext.Provider>
    )
}