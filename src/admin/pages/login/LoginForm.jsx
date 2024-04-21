import React from 'react'
import "./login.scss"

const LoginForm = () => {
    return (
        <div className='loginForm'>
            <div className="heading">
                <div className="options">
                    <div className="first">Admin</div>
                    <div className="second">User</div>
                </div>
                Welcome To the Trendy Junction
            </div>
            <div className="form">
                <input type="text" className="username" />
                <input type="text" className="password" />
                <button type="submit">Login</button>
            </div>
        </div>
    )
}

export default LoginForm