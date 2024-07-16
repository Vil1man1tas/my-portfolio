import styles from './LoginRegisterPage.module.css'
import { EyeClosed, Eye } from "@phosphor-icons/react"
import { useState } from "react"
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn' 
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [showText, setShowText] = useState(false)
    const [error, setError] = useState('')
    const signIn = useSignIn() 
    const navigate = useNavigate()

    // user register handler to MongoDB
    const formHandler = (event) => {
        event.preventDefault()
        const userData = {
            nickname: event.target.usernickname.value,
            username: event.target.username.value,
            password: event.target.userpassword.value,
            email: event.target.useremail.value,
        }
        if (userData.nickname && userData.email && userData.password) {
            axios.post(import.meta.env.VITE_BACKEND + '/auth/register', userData)
                .then(response => {
                    if (response.status === 201) {
                        if (signIn({
                            auth: {
                                token: response.data.token,
                                type: 'Bearer'
                            },
                            userState: response.data.user
                        })) {
                            navigate('/homeuser')
                        } else {
                            setError('Login failed')
                        }
                    }
                }).catch(err => {
                    setError(err.response.data.message)
                })
        } else {
            alert('Incomplete data entered')
        }

    }

    return (
        <div className="container">
            <div className={styles.container}>
                <h4>User Registration</h4>
                <form onSubmit={formHandler}>
                    <div>
                        <label htmlFor="useremail">Email:</label>
                        <input type="email" id="usermail" name="useremail" placeholder="required" />
                    </div>
                    <div>
                        <label htmlFor="userpassword">Password:</label>
                        <input type={showText ? "text" : "password"} id="userpassword" name="userpassword" placeholder="required" />
                        <button className={styles.button_phosphor} type="button" onClick={() => setShowText(!showText)}>
                            {!showText && <EyeClosed size={20} />}
                            {showText && <Eye size={20} />}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="usernickname">Nickname:</label>
                        <input type="text" id="usernickname" name="usernickname" placeholder="required" />
                    </div>
                    <div>
                        <label htmlFor="username">Name:</label>
                        <input type="text" id="username" name="username" placeholder="optional" />
                    </div>
                    {
                        error && <div style={{ color: 'red' }}>
                            <p>{error}</p>
                        </div>
                    }
                    <div>
                        <button className={styles.button_all} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage