import styles from './LoginRegisterPage.module.css'
import { EyeClosed, Eye } from "@phosphor-icons/react"
import { useState } from "react"
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn' 
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const signIn = useSignIn() 
    const navigate = useNavigate()

    const submitFormHandler = (event) => {
        event.preventDefault()
        const userData = {
            email: event.target.useremail.value,
            password: event.target.password.value
        }
        axios.post(import.meta.env.VITE_BACKEND + '/auth/login', userData)
            .then(response => {
                if (response.status === 200) {
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
    }

    return (
        <div className="container">
            <div className={styles.container}>
                <h4>User login</h4>
                <form onSubmit={submitFormHandler} onChange={() => setError('')}>
                    <div>
                        <label htmlFor="useremail">Email:</label>
                        <input type="email" id="useremail" name="useremail" placeholder="email" />
                    </div>
                    <div>
                        <label htmlFor="passwordInput">Password:</label>
                        <input type={showPassword ? "text" : "password"} id="passwordInput" name="password" placeholder="password" />
                        <button className={styles.button_phosphor} type="button" onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword && <EyeClosed size={20} />}
                            {showPassword && <Eye size={20} />}
                        </button>
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

export default LoginPage