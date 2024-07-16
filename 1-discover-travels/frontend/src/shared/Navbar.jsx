import styles from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useState, useEffect } from 'react';
import axios from 'axios';


const Navbar = () => {
    const [nickname, setNickname] = useState()
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    const navigate = useNavigate()
    const authHeader = useAuthHeader() 

    useEffect(() => {
        if (isAuthenticated) {
            axios.get(import.meta.env.VITE_BACKEND + '/auth/nickname', {
                headers: { 'Authorization': authHeader }
            }).then(response => {
                if (response.status == 200) {
                    setNickname(response.data)
                }
            }).catch((err) => console.log(err))
        }
    }, [authHeader])

    const onSignOutHandler = () => {
        signOut()
        navigate('/')
    }

    return (
        <dir className={styles.nav}>
            <dir className={styles.container}>
                <div className={styles.brand}>
                    <NavLink to="/">Discover Travels</NavLink>
                </div>
                <ul className={styles.links}>
                    {
                        isAuthenticated &&
                        <>
                            <li><NavLink to="/homeuser" className={(navData) => navData.isActive ? styles.active_link : ''}>Travels</NavLink></li>
                            <li><NavLink to="/profile" className={(navData) => navData.isActive ? styles.active_link : ''}>Hi, {nickname}</NavLink></li>
                        </>
                    }
                    <li><NavLink to="/about-us" className={(navData) => navData.isActive ? styles.active_link : ''}>About This Project</NavLink></li>
                    {
                        isAuthenticated &&
                        <>
                            <li>
                                <button className='button-all' onClick={onSignOutHandler}>Sign Out</button>
                            </li>
                        </>
                    }
                    {
                        !isAuthenticated &&
                        <>
                            <li><NavLink to="/register" className={(navData) => navData.isActive ? styles.active_link : ''}>Sign Up</NavLink></li>
                            <li><NavLink to="/login" className={(navData) => navData.isActive ? styles.active_link : ''}>Log In</NavLink></li>
                        </>
                    }
                </ul>
            </dir>
        </dir>
    )
}

export default Navbar