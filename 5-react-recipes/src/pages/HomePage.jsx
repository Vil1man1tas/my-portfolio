import { useState, useRef } from "react"
import styles from './HomePage.module.css'
import DishesCards from "../shared/DishesCards";
import DishesHowMany from "../shared/DishesHowMany";


const HomePage = () => {
    const servingsRef = useRef();
    const dishesCardsRef = useRef();
    const selectedCardRef = useRef();
    const recipes = [
        {
            id: 1,
            name: 'Makaronai su mėsa',
            description: 'Gardūs makaronai su sodriu mėsos padažu, pagardinti aromatiniais prieskoniais.',
            ingrediens: [
                ["Mėsos faršo:", 400, "g"],
                ["Višninių pomidoriukų:", 120, "g"],
                ["Juodų alyvuogių:", 10, "vnt."],
                ["Knorr FIX ruošinio spagečiams 'Bolognese':", 1, "vnt."],
                ["Alyvuogių aliejaus:", 2, "v.š"]
            ],
            image: 'image1.jpg'
        },
        {
            id: 2,
            name: 'Vištiena su salotom',
            description: 'Sultinga kepta vištiena, patiekiama su šviežiomis daržovėmis ir lengvu padažu.',
            ingrediens: [
                ["Vištienos krūtinėlės:", 2, "vnt."],
                ["Salotų lapų:", 100, "g"],
                ["Agurkų:", 1, "vnt."],
                ["Pomidorų:", 2, "vnt."],
                ["Citrinų sulčių:", 1, "v.š"],
                ["Alyvuogių aliejaus:", 2, "v.š"]
            ],
            image: 'image2.jpg'
        },
        {
            id: 3,
            name: 'Tortas su mėlynėm',
            description: 'Drėgnas tortas, sluoksniuotas su šviežiomis mėlynėmis ir kremine glazūra.',
            ingrediens: [
                ["Miltų:", 200, "g"],
                ["Cukraus:", 150, "g"],
                ["Kiaušinių:", 3, "vnt."],
                ["Sviesto:", 100, "g"],
                ["Šviežių mėlynių:", 200, "g"],
                ["Kremo sūrio:", 250, "g"]
            ],
            image: 'image3.jpg'
        },
        {
            id: 4,
            name: 'Kepta žuvis su citrina',
            description: 'Lengvai kepta žuvis, patiekiama su citrinos skiltelėmis ir šviežiomis žolelėmis.',
            ingrediens: [
                ["Baltos žuvies filė:", 2, "vnt."],
                ["Citrinų:", 1, "vnt."],
                ["Česnako skiltelių:", 2, "vnt."],
                ["Alyvuogių aliejaus:", 2, "v.š"],
                ["Šviežių petražolių:", 1, "sauja"]
            ],
            image: 'image4.jpg'
        },
        {
            id: 5,
            name: 'Daržovių sriuba',
            description: 'Šilta ir maistinga daržovių sriuba su šviežiomis daržovėmis ir prieskoniais.',
            ingrediens: [
                ["Morkų:", 2, "vnt."],
                ["Bulvių:", 3, "vnt."],
                ["Salierų stiebų:", 2, "vnt."],
                ["Svogūnų:", 1, "vnt."],
                ["Vištienos sultinio:", 1, "l"],
                ["Alyvuogių aliejaus:", 2, "v.š"]
            ],
            image: 'image5.jpg'
        },
        {
            id: 6,
            name: 'Šokoladinis pyragas',
            description: 'Sodrus ir drėgnas šokoladinis pyragas su kakavos kremu.',
            ingrediens: [
                ["Miltų:", 200, "g"],
                ["Cukraus:", 150, "g"],
                ["Kiaušinių:", 3, "vnt."],
                ["Sviesto:", 100, "g"],
                ["Kakavos miltelių:", 50, "g"],
                ["Tamsaus šokolado:", 100, "g"]
            ],
            image: 'image6.jpg'
        },
        {
            id: 7,
            name: 'Kreminė daržovių košė',
            description: 'Švelni daržovių košė su grietinėle ir prieskoniais.',
            ingrediens: [
                ["Bulvių:", 300, "g"],
                ["Morkų:", 200, "g"],
                ["Grietinėlės:", 100, "ml"],
                ["Sviesto:", 50, "g"],
                ["Druskos:", 1, "a.š"],
                ["Juodųjų pipirų:", 1, "a.š"]
            ],
            image: 'image7.jpg'
        },
        {
            id: 8,
            name: 'Kepti baklažanai su parmezanu',
            description: 'Gardūs kepti baklažanai su parmezano sūriu ir pomidorų padažu.',
            ingrediens: [
                ["Baklažanų:", 2, "vnt."],
                ["Parmezano sūrio:", 100, "g"],
                ["Pomidorų padažo:", 200, "ml"],
                ["Alyvuogių aliejaus:", 2, "v.š"],
                ["Česnako skiltelių:", 2, "vnt."],
                ["Bazilikų lapų:", 1, "sauja"]
            ],
            image: 'image8.jpg'
        },
        {
            id: 9,
            name: 'Kumpio ir sūrio apkepas',
            description: 'Sultingas apkepas su kumpio ir sūrio įdaru, keptas orkaitėje.',
            ingrediens: [
                ["Kumpio:", 200, "g"],
                ["Sūrio:", 150, "g"],
                ["Kiaušinių:", 2, "vnt."],
                ["Pieno:", 100, "ml"],
                ["Sviesto:", 50, "g"],
                ["Druskos:", 1, "a.š"]
            ],
            image: 'image9.jpg'
        },
        {
            id: 10,
            name: 'Avienos troškinys',
            description: 'Avienos gabalėliai troškinami su daržovėmis ir raudonu vynu.',
            ingrediens: [
                ["Avienos:", 500, "g"],
                ["Morkų:", 2, "vnt."],
                ["Bulvių:", 3, "vnt."],
                ["Svogūnų:", 1, "vnt."],
                ["Raudono vyno:", 200, "ml"],
                ["Alyvuogių aliejaus:", 2, "v.š"]
            ],
            image: 'image10.jpg'
        },
        {
            id: 11,
            name: 'Krevetės su česnaku',
            description: 'Krevetės keptos su česnaku ir prieskoniais, patiektos su citrinų skiltelėmis.',
            ingrediens: [
                ["Krevetės:", 300, "g"],
                ["Česnako:", 4, "skiltelės"],
                ["Citrinų:", 1, "vnt."],
                ["Alyvuogių aliejaus:", 2, "v.š"],
                ["Šviežių petražolių:", 1, "sauja"]
            ],
            image: 'image11.jpg'
        },
        {
            id: 12,
            name: 'Mėsainis su daržovėmis',
            description: 'Įvairių mėsos rūšių mėsainis keptas su šviežiomis daržovėmis.',
            ingrediens: [
                ["Kiaulienos faršo:", 300, "g"],
                ["Jautienos faršo:", 300, "g"],
                ["Morkų:", 2, "vnt."],
                ["Bulvių:", 3, "vnt."],
                ["Svogūnų:", 1, "vnt."],
                ["Kiaušinių:", 2, "vnt."]
            ],
            image: 'image12.jpg'
        },
        {
            id: 13,
            name: 'Ryžių su daržovėmis garnyras',
            description: 'Sotus ryžių garnyras su įvairiomis šviežiomis daržovėmis.',
            ingrediens: [
                ["Ryžių:", 300, "g"],
                ["Morkų:", 2, "vnt."],
                ["Žiedinių kopūstų:", 1, "vnt."],
                ["Žaliųjų pupelių:", 100, "g"],
                ["Svogūnų:", 1, "vnt."],
                ["Druskos:", 1, "a.š"]
            ],
            image: 'image13.jpg'
        },
        {
            id: 14,
            name: 'Obuolių pyragas',
            description: 'Švelnus obuolių pyragas su cinamonu ir kepta tešla.',
            ingrediens: [
                ["Miltų:", 200, "g"],
                ["Cukraus:", 150, "g"],
                ["Sviesto:", 100, "g"],
                ["Obuolių:", 4, "vnt."],
                ["Cinamono:", 1, "a.š"],
                ["Kiaušinių:", 3, "vnt."]
            ],
            image: 'image14.jpg'
        },
        {
            id: 15,
            name: 'Vištienos kepsniai su bulvėmis',
            description: 'Kepsniai iš vištienos mėsos su keptomis bulvėmis ir garstyčių padažu.',
            ingrediens: [
                ["Vištienos krūtinėlės:", 4, "vnt."],
                ["Bulvių:", 500, "g"],
                ["Alyvuogių aliejaus:", 3, "v.š"],
                ["Garstyčių:", 2, "v.š"],
                ["Druskos:", 1, "a.š"],
                ["Juodųjų pipirų:", 1, "a.š"]
            ],
            image: 'image15.jpg'
        },
        {
            id: 16,
            name: 'Grybų sriuba',
            description: 'Šiltas ir sotus grybų sriubos garnyras su šviežiomis daržovėmis.',
            ingrediens: [
                ["Šampinjonų:", 300, "g"],
                ["Vėsosios mielės:", 200, "g"],
                ["Svogūnų:", 1, "vnt."],
                ["Morkų:", 2, "vnt."],
                ["Svogūnų:", 1, "vnt."],
                ["Vištienos sultinio:", 1, "l"]
            ],
            image: 'image16.jpg'
        }
    ];
    
    let [servings, setServings] = useState(1);
    let [selectedID, setSelectedID] = useState(recipes[0].id);
    let selectedArrayNum = recipes.findIndex(k => k.id == selectedID);
    let imgName = `images/${recipes[selectedArrayNum].image}`;

    const backHandler = () => {
        selectedCardRef.current.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
    }
    const topHandler = () => {
        dishesCardsRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
    const changedIDHandler = (newID) => {
        setSelectedID(newID);
        servingsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const changeServingsHandler = (quantity) => {
        setServings(quantity);
    }

    // 
    return (
        <header ref={dishesCardsRef} className="container">
            <div className="container-home">
                <DishesCards recipesData={recipes} selectedCard={selectedID} selectedCardRefConst={selectedCardRef} onChangedBoxID={changedIDHandler} />
            </div>

            <div className="container-home" ref={servingsRef}>
                <DishesHowMany servings={servings} onChangeServings={changeServingsHandler} />
            </div>

            <div className="container-home">
                <div className={styles.ingredients}>
                    <div className={styles.dish_image}>
                        <img src={imgName} alt="" />
                    </div>
                    <h1>Jums reikės šių ingredientų, tokiais kiekiais:</h1>
                    <div>
                        {
                            recipes[selectedArrayNum].ingrediens.map((k, i) => (
                                <p key={i}>{k[0]} <b>{k[1] * servings} {k[2]}</b></p>
                            ))
                        }
                        <p><b>Aprašymas.</b> {recipes[selectedArrayNum].description}</p>
                        <p><b>Kaip gaminti.</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi dolorem reiciendis modi harum, officia est quas nostrum accusantium id sit asperiores ad, ipsum minus rem beatae laborum pariatur perspiciatis iure.</p>
                        <div onClick={backHandler} className={styles.link_return}>...grįžti į atgal</div>
                        <div onClick={topHandler} className={styles.link_return}>...grįžti į pradžią</div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default HomePage