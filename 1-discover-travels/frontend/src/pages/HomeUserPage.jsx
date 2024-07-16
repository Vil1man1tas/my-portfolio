import styles from './HomeUserPage.module.css'
import { MagnifyingGlass, Binoculars, X } from "@phosphor-icons/react"
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader' 
import TravelsList from '../shared/TravelsList'
import { useState, useEffect } from "react"
import axios from 'axios'


const HomeUserPage = () => {
    const authHeader = useAuthHeader() 
    const [list, setList] = useState([])
    const [lastconnect, setLastconnect] = useState('')
    const [showType, setShowType] = useState(0)
    const [whatIwant, setWhatIwant] = useState('')
    const [howMany, setHowMany] = useState(0)

    // load all travels
    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND + '/travels/all', {
            headers: { 'Authorization': authHeader }
        }).then(response => {
            if (response.status == 200) {
                setList(response.data.list.sort((a, b) => (a.createdate < b.createdate) ? 1 : (a.createdate > b.createdate) ? -1 : 0))
                setLastconnect(response.data.lastconnect)
                setHowMany(response.data.list.length)
            }

        }).catch((er) => console.log(er))
    }, [authHeader])

    // search handler
    const formHandler = (event) => {
        event.preventDefault()
        if (event.target.searchfield.value) {
            setWhatIwant(event.target.searchfield.value);
            setShowType(2)
        } else { setShowType(0) }
    }

    // change list by search
    const showList = () => {
        switch (showType) {
            case 0: { return list; }
            case 1: return list.slice()
                .filter(k => k.createdate > lastconnect)
                .sort((a, b) => (a.createdate < b.createdate) ? 1 : (a.createdate > b.createdate) ? -1 : 0);
            case 2: {
                let whatA = whatIwant.replace(' ', '').toLowerCase();
                const searchText = (k) => {
                    return (k.name + k.shortdescription + k.country + k.description + k.travelagency).replace(' ', '').toLowerCase()
                }
                return list.slice().filter(k => searchText(k).indexOf(whatA) > 0);
            }
            default: return list;
        }
    }

    return (
        <div className="container">
            <div className={["container-all", styles.container].join(' ')}>
                <div className={styles.left_side}>
                    <div className={styles.button_field}>
                        <button className={'button-all ' + styles.button} onClick={() => { setShowType(0) }}>All</button>
                        <button className={'button-all ' + styles.button} onClick={() => { setShowType(1) }}>New</button>
                        <form onSubmit={formHandler}>
                            <label htmlFor="searchfield"></label>
                            <input type="text" id="searchfield" name="searchfield" placeholder="search" />
                        </form>
                    </div>
                    {
                        showType == 1 &&
                        <p>
                            New Trips Shared Since Your Last Login {lastconnect?.slice(0, 10)} :
                        </p>
                    }
                </div>
                <TravelsList data={showList()} />
            </div>
        </div>
    )
}


export default HomeUserPage