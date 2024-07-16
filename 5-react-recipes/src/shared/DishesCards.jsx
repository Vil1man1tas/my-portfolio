import PropTypes from 'prop-types';
import styles from './DishesCards.module.css'
import DishesCardsBox from './DishesCardsBox';
import { useState } from 'react';

const DishesCards = (props) => {
    const recipes = props.recipesData;
    const [selectedID,setSelectedID] = useState(props.selectedCard);
    const changedIDHandler = (newID) => {
        setSelectedID(newID);
        props.onChangedBoxID(newID);
    }

    return (
        <div className={styles.cardsplace}>
            {
                recipes.map((k,i) => (
                    <DishesCardsBox oneCardData={k} orSelected={selectedID == k.id} onChangedBoxID={changedIDHandler} selectedCardRefConst={selectedID == k.id ? props.selectedCardRefConst : null} key={i} />
                ))
            }
        </div>
    )
}

DishesCards.propTypes = {
    recipesData: PropTypes.array.isRequired,
    selectedCard: PropTypes.number.isRequired
}
export default DishesCards