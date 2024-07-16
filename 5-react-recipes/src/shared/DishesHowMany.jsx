import styles from './DishesHowMany.module.css';
import { useState } from 'react';

const DishesHowMany = (props) => {
    const [counter, setCounter] = useState(props.servings)

    const rangeHandler = (event) => {
        setCounter(event.target.valueAsNumber);
        props.onChangeServings(event.target.valueAsNumber);
    }

    return (
        <div className={styles.order}>
            <h1>Kiek porcijų gaminsite?</h1>
            <div className={styles.slider_counter} style={{ left: (counter - 1) * 22.8 + 23 + 'px' }}>
                <p>{counter}</p>
            </div>
            <input type="range" min="1" max="10" defaultValue={counter} className={styles.my_slider} onChange={rangeHandler} />
            <h2>Porcijų kiekis: {counter}</h2>
        </div>
    )
}

export default DishesHowMany