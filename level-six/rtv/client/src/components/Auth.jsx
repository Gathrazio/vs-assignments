import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserProvider.jsx'

export default function Auth () {
    const navigate = useNavigate();
    const initialInfo = {
        username: '',
        password: ''
    }
    const [inputInfo, setInputInfo] = useState(initialInfo);
    const [formToggle, setFormToggle] = useState(true);

    const { signup, login, setUser, userState } = useContext(UserContext);

    function handleChange (e) {
        const {name, value} = e.target;
        setInputInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSignInSubmit (e) {
        e.preventDefault()
        // setInputInfo(initialInfo)
        login(inputInfo)
            .then(
                function (res) {
                    console.log(res.data)
                    setUser(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "You are logged in!",
                        confirmButtonText: "OK"
                    })
                },
                function (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Username or password is incorrect.",
                        confirmButtonText: "OK"
                    })
                    console.dir(err.response.data.errMsg)
                }
            )
    }

    function handleCreateAccountSubmit (e) {
        e.preventDefault()
        // setInputInfo(initialInfo)
        signup(inputInfo)
            .then(
                function (res) {
                    console.log(res.data)
                    setUser(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Your account has been successfully created and you are logged in!",
                        confirmButtonText: "OK"
                    })
                },
                function (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Username is already taken.",
                        confirmButtonText: "OK"
                    })
                    console.dir(err.response.data.errMsg)
                }
            )
        
    }
    
    return (
        <div className="auth-wrapper">
            { formToggle ? 
            <>
            <form name="auth-form" className="auth-form" onSubmit={handleSignInSubmit}>
                <input
                    className="auth-input"
                    type="text"
                    name="username"
                    value={inputInfo.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    name="password"
                    value={inputInfo.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button className="auth-button">Sign In</button>
        </form>
        <button className="member" onClick={() => setFormToggle(prev => !prev)}>Not a member?</button>
        </>
        :
        <>
        <form name="auth-form" className="auth-form" onSubmit={handleCreateAccountSubmit}>
            <input
                className="auth-input"
                type="text"
                name="username"
                value={inputInfo.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                className="auth-input"
                type="password"
                name="password"
                value={inputInfo.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button className="auth-button">Create Account</button>
        </form>
        <button className="member" onClick={() => setFormToggle(prev => !prev)}>Already a member?</button>
        </>
        }
        </div>
        
    )
}