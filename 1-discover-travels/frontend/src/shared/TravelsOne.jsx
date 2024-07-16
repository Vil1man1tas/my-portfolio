import styles from './TravelsOne.module.css'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader' 
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const TravelsOne = () => {
	const authHeader = useAuthHeader() 
	const { id } = useParams()
	const sendhome = useNavigate()
	const [travel, setTravel] = useState({})
	const [userData, setUserData] = useState({})
	const [commentsList, setCommentsList] = useState([])
	const [lookInput, setLookInput] = useState("www")
	const [lookCB, setLookCB] = useState("www")

	// travel data + user data from MongoDB
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_BACKEND}/travels/get/${id}`, {
			headers: { 'Authorization': authHeader }
		}).then(response => {
			if (response.status == 200) {
				setTravel(response.data.travel)
				let user = { id: response.data.userid, nickname: response.data.usernickname }
				setUserData(user)
			}
		}).catch(error => {
			sendhome('/')
		})
	}, [id, authHeader])

	// comments list from Mongo
	useEffect(() => {
		let sendId = { id };
		axios.post(import.meta.env.VITE_BACKEND + '/comments/alllist', sendId, {
			headers: { 'Authorization': authHeader }
		}).then(response => {
			setCommentsList(response.data)
		}).catch(err => {
			setError(err.response.data.message)
		})
	}, [authHeader])

	// Add - edit comment to MongoDB
	const commentHolder = (event) => {
		event.preventDefault()
		let commentData = {
			_idtravel: travel._id,
			_idrescomment: event.target.commentfield.name,
			_iduser: userData.id,
			nickname: userData.nickname,
			comment: event.target.commentfield.value,
			editmarker: lookCB
		}
		setLookInput("www")
		if (!commentData.comment) {
			return alert('No comment entered')
		}
		axios.post(import.meta.env.VITE_BACKEND + '/comments/add', commentData, {
			headers: { 'Authorization': authHeader }
		}).then(response => {
			if (lookCB == "www") {
				let newList = [response.data, ...commentsList]
				setCommentsList(newList)
			} else {
				let editList = [...commentsList]
				editList[commentsList.findIndex(k => k._id == commentData.editmarker)].comment = commentData.comment
				setCommentsList(editList)
			}
		}).catch(err => {
			setError(err.response.data.message)
		})
	}

	// Create comment list html code
	const commentReply = (nnnid) => {
		if (commentsList.filter(k => k._idrescomment == nnnid).length > 0) {
			return (
				commentsList.slice().filter(k => k._idrescomment == nnnid)
					.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0)
					.map((k, i) => (
						<div key={i}>
							<div className={styles.comment_field}>
								<p><b>{k.nickname}</b> is writing at: {k.date.slice(0, 19).replace('T', ' ')}</p>
								<p className={[styles.comment_text].join(' ')} style={{ whiteSpace: 'pre-line' }}>{k.comment}</p>
								<div className={styles.comment_buttons_field}>
									<button onClick={() => {
										setLookCB("www");
										k._id == lookInput ? setLookInput("www") : setLookInput(k._id)
									}}>{k._id != lookInput ? "Add comment" : "Back"}</button>
									{
										k._iduser == userData.id && k._id != lookInput &&
										<button onClick={() => {
											setLookCB(k._id);
											k._id == lookInput ? setLookInput("www") : setLookInput(k._id)
										}}>Edit</button>
									}
								</div>
								{
									k._id == lookInput &&
									<form onSubmit={commentHolder}>
										<label htmlFor="commentfield"></label>
										<textarea id="commentfield"
											rows={3} cols={45} name={k._id} placeholder=""
											defaultValue={k._id != lookCB ? "" : k.comment}
										/>
										<button type="submit">Add</button>
									</form>
								}
								<div>
									{commentReply(k._id)}
								</div>
							</div>
						</div>
					))
			)
		}
	}

	return (
		<div className="container">
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.travel_box}>
						<h3>{travel?.country + ' - ' + travel?.name}</h3>
						<p>{travel?.shortdescription}</p>
						<p></p>
						<p>{travel?.description}</p>
						<p>Travel Agency: {travel?.travelagency}</p>
						<p>Travel Agency rating: {travel?.ratingagency}</p>
						<p>Travel date: {travel?.date?.slice(0, 10)}</p>
						{
							userData?.id == travel?._iduser &&
							<Link to={`/travels/edit/${id}`}  className='button-all'>Edit Trip Description</Link>
						}
					</div>
					<div>
						<form onSubmit={commentHolder}>
							<label htmlFor="commentfield"></label>
							<textarea id="commentfield" name={id} rows={8} cols={40} placeholder="You Can Ask a Question or Leave a Comment:" />
							<button className='button-all' type="submit">Add comment</button>
						</form>
					</div>
				</div>
				{
					commentsList?.length > 0 &&
					<div className={styles.comments_area}>
						<div>
							{commentReply(id)}
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default TravelsOne