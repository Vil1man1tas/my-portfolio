import stylesnew from './ProfilePage.module.css'
import styles from './LoginRegisterPage.module.css'
import { Link } from 'react-router-dom'
import { EyeClosed, Eye } from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import TravelsList from '../shared/TravelsList'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader' 
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const ProfilePage = () => {
    const [showText, setShowText] = useState(false)
    const [orEditUser, setOrEditUser] = useState(false)
    const [error, setError] = useState('')
    const authHeader = useAuthHeader() 
    const [list, setList] = useState([])
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const signOut = useSignOut()

    // load user's all travels data from MongoDB
    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND + '/travels/my-all', {
            headers: { 'Authorization': authHeader }
        }).then(response => {
            if (response.status == 200) {
                let data = {
                    lastconnect: response.data.lastconnect,
                    password: '',
                    nickname: response.data.nickname,
                    username: response.data.username,
                    date: response.data.date,
                    email: response.data.email
                }
                setList(response.data.list.sort((a, b) => (a.createdate < b.createdate) ? 1 : (a.createdate > b.createdate) ? -1 : 0))
                setUserData(data)
            }

        }).catch((err) => console.log(err))
    }, [authHeader])

    // Delete user 
    const deleteUserHandler = () => {
        if (confirm('Are you sure you want to delete your account?')) {
            axios.delete(import.meta.env.VITE_BACKEND + '/auth/delete', {
                headers: { 'Authorization': authHeader }
            }).then(response => {
                signOut()
                navigate('/')
            }).catch((err) => console.log(err))
        }
    }

    // Edit user data
    const formHandler = (event) => {
        event.preventDefault()
        const userData = {
            nickname: event.target.usernickname.value,
            username: event.target.username.value,
            password: event.target.userpassword.value,
            email: event.target.useremail.value,
        }
        if (confirm('Keisti duomenis?')) {
            setError('')
            axios.put(import.meta.env.VITE_BACKEND + '/auth/edit', userData, {
                headers: { 'Authorization': authHeader }
            }).then(response => {
                if (response.status === 200) {
                    alert('Data Updated')
                }
            }).catch(err => {
                setError(err.response.data.message)
            })
        } else {
            alert('Incomplete Data')
        }
    }

    return (
        <div className="container">
            <Link to={`/travels/edit/www`}  className={'button-all ' + stylesnew.link} >Could you create a new trip description?</Link>
            <h1 className={stylesnew.h1}>Your Visited Places</h1>
            <div className={["container-all", stylesnew.header].join(' ')}>
                <div className={[stylesnew.container_profile].join(' ')}>
                    <TravelsList data={list} />
                </div>
                <div className={styles.container+' '+stylesnew.container}>
                    <p><b>Account Creation Date: </b></p>
                    <p>{userData?.date?.slice(0, 16).replace('T', ' ')}</p>
                    <p><b>Last Login Date: </b></p>
                    <p>{userData?.lastconnect?.slice(0, 16).replace('T', ' ')}</p>
                    <form onSubmit={formHandler}>
                        <div>
                            <label htmlFor="useremail">Email:</label>
                            <input type="email" id="usermail" name="useremail" placeholder="If Modifying" defaultValue={userData.email} readOnly={!orEditUser} />
                        </div>
                        <div>
                            <label htmlFor="userpassword">Password:</label>
                            <input type={showText ? "text" : "password"} id="userpassword" name="userpassword" placeholder="If Modifying" readOnly={!orEditUser} />
                            <button className={styles.button_phosphor} type="button" onClick={() => setShowText(!showText)}>
                                {!showText && <EyeClosed size={20} />}
                                {showText && <Eye size={20} />}
                            </button>
                        </div>
                        <div>
                            <label htmlFor="usernickname">Nickname:</label>
                            <input type="text" id="usernickname" name="usernickname" placeholder="If Modifying" defaultValue={userData.nickname} readOnly={!orEditUser} />
                        </div>
                        <div>
                            <label htmlFor="username">Name:</label>
                            <input type="text" id="username" name="username" placeholder="If Modifying" defaultValue={userData.username} readOnly={!orEditUser} />
                        </div>
                        {
                            error && <div style={{ color: 'red' }}>
                                <p>{error}</p>
                            </div>
                        }
                        {
                            !orEditUser &&
                            <div>
                                <button className={styles.button_all} onClick={() => setOrEditUser(true)}>
                                    Submit
                                </button>
                            </div>
                        }
                        {
                            orEditUser &&
                            <div>
                                <button className={styles.button_all} onClick={() => setOrEditUser(false)}>Grįžti</button>
                                <button className={styles.button_all} type="submit">Keisti</button>
                            </div>
                        }
                    </form>
                    {
                        orEditUser &&
                        <button className={styles.button_all} onClick={deleteUserHandler}>Trinti paskyrą</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage