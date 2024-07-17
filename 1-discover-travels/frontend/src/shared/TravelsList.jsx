import styles from './TravelsList.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TravelsList = (props) => {
    const trList = props.data

    return (
        <div className={styles.container_travelslist}>
            {
                trList.length > 0 &&
                trList.map(k => (
                    <div key={k._id} className={styles.travel_box}>
                        <Link to={`/travels/${k._id}`}  style={{ whiteSpace: 'pre-line' }}>
                            {k.country+' - '+k.name}
                        </Link>
                        <p>{k.shortdescription}</p>
                        <p>Posted: {k.createdate.slice(0, 10)}</p>
                    </div>
                ))
            }
        </div>

    )
}

TravelsList.propTypes = {
    data: PropTypes.array.isRequired
}

export default TravelsList