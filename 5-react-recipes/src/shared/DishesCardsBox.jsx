import PropTypes from 'prop-types';
import styles from './DishesCardsBox.module.css';

const DishesCardsBox = (props) => {

    const selectedCardRef = props.selectedCardRefConst;
    const dish = props.oneCardData;
    const activeDish = props.orSelected;
    let imgName = `images/${dish.image}`;

    const dishSelectedHandler = () => {
        props.onChangedBoxID(dish.id);
    }


    return (
        <div className={styles.dishes_card_box} onClick={dishSelectedHandler} ref={selectedCardRef}>
            {
                activeDish &&
                <div className={styles.dishes_marker}>
                    <img src={'images/Group5.svg'} alt="" />
                </div>
            }
            <div className={styles.produce}>
                <div className={styles.produce_image}>
                    <img src={imgName} alt="" />
                </div>
                <h2>{dish.name}</h2>
                <p>{dish.description}</p>
            </div>
        </div>
    )
}

DishesCardsBox.propTypes = {
    oneCardData: PropTypes.object.isRequired,
    orSelected: PropTypes.bool.isRequired
}

export default DishesCardsBox