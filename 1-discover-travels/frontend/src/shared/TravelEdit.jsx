import styles from './TravelEdit.module.css'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader' 
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const TravelEdit = () => {
    const navigate = useNavigate()
    const authHeader = useAuthHeader() 
    const { id } = useParams()
    const sendhome = useNavigate()
    const [travel, setTravel] = useState({})

    // travel data + user data from MongoDB
    if (id != "www") {
        useEffect(() => {
            axios.get(`${import.meta.env.VITE_BACKEND}/travels/get/${id}`, {
                headers: { 'Authorization': authHeader }
            }).then(response => {
                if (response.status == 200) {
                    setTravel(response.data.travel)
                }
            }).catch(error => {
                sendhome('/')
            })
        }, [id, authHeader])
    }

    const formHandler = (event) => {
        event.preventDefault()
        const travelData = {
            name: event.target.namein.value,
            shortdescription: event.target.shortdin.value,
            country: event.target.countryin.value,
            description: event.target.decripin.value,
            travelagency: event.target.travelin.value,
            ratingagency: event.target.ratingin.value,
            date: event.target.datein.value,
            editmarker: id
        }
        axios.post(import.meta.env.VITE_BACKEND + '/travels/addedit', travelData, {
            headers: { 'Authorization': authHeader }
        }).then(response => {
            if (id == "www") {
                alert('Data Saved')
            } else { alert('Data Changed') }
            navigate('/profile')
        }).catch(err => {
            setError(err.response.data.message)
        })
    }

    const deleteHandler = () => {
        if (confirm('Are you sure you want to delete?')) {
            axios.post(import.meta.env.VITE_BACKEND + '/travels/delete', { id }, {
                headers: { 'Authorization': authHeader }
            }).then(response => {
                alert('Data deleted')
                navigate('/profile')
            }).catch(err => {
                setError(err.response.data.message)
            })
        }
    }

    return (
        <div className={"container"}>
            <div className={styles.container}>
                <div className={styles.groupAllIn}>
                    <form onSubmit={formHandler}>
                        <div className={styles.groupIn}>
                            <label htmlFor="nameIn">Title:</label>
                            <input type="text" id="nameIn" defaultValue={travel.name} name='namein' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="shortdIN">Short Comment:</label>
                            <input type="text" id="shortdIN" defaultValue={travel.shortdescription} name='shortdin' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="countryIn">Country:</label>
                            <input type="text" id="countryIn" defaultValue={travel.country} name='countryin' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="decripIn">Full Description:</label>
                            <textarea id="decripIn" rows={8} defaultValue={travel.description} name='decripin' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="travelIn">Travel Agency:</label>
                            <input type="text" id="travelIn" defaultValue={travel.travelagency} name='travelin' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="ratingIn">Travel Agency Rating:</label>
                            <input type="number" id="ratingIn" defaultValue={travel.ratingagency} name='ratingin' />
                        </div>
                        <div className={styles.groupIn}>
                            <label htmlFor="dateIn">Date:</label>
                            <input type="text" id="dateIn" defaultValue={travel.date} name='datein' />
                        </div>
                        <button type="submit" className='button-all'>{id == "www" ? "Create" : "Update"}</button>
                    </form>
                    {
                        id != "www" &&
                        <button onClick={deleteHandler} className={'button-all ' + styles.deleteButton}>Delete</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TravelEdit