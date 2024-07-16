let dishAmount = 1;
let dishSelectedNumber = 1;
let dish1Ingradients = [["Vištienos:",300,"g"],
["Sūrio:",30,"g"],
["Salotų:",1,"gūželė(s)"],
["Duonos:",4,"riekelė(s)"]];
let dish2Ingradients = [["Miltų:",500,"g"],
["Kiaušinių:",2,"vnt."],
["Mėlynių:",100,"g"],
["Cukraus:",2,"a.š"]];
let dish3Ingradients = [["Mėsos faršo:",400,"g"],
["Višninių pomidoriukų:",120,"g"],
["Juodų alyvuogių:",10,"vnt."],
["Knorr FIX ruošinio spagečiams 'Bolognese':",1,"vnt."],
["Alyvuogių aliejaus:",2,"v.š"]];

let dishAllIngradients = [dish1Ingradients, dish2Ingradients, dish3Ingradients];

function createCookingText () {
    let myText = ``;
    let myQuata = 0;
    for (i = 0 ; i < dishAllIngradients[dishSelectedNumber-1].length; i++) {
        myQuata = dishAllIngradients[dishSelectedNumber-1][i][1] * dishAmount;
        myText += `<p class="-js-create-text">${dishAllIngradients[dishSelectedNumber-1][i][0]} <strong>${dishAllIngradients[dishSelectedNumber-1][i][1] * dishAmount} ${dishAllIngradients[dishSelectedNumber-1][i][2]}</strong></p> `;
      }
    return myText;
}
document.querySelector('.ingredients .ingredients-text').innerHTML = createCookingText();

let dish1 = document.querySelector('.cookbook .produce1');
let dish2 = document.querySelector('.cookbook .produce2');
let dish3 = document.querySelector('.cookbook .produce3');
let dishDropdown = document.getElementById('header-dish-selector');
let dishSelectedImage = document.querySelector('.cookbook .dishes-marker');
let dishAll = [dish1, dish2, dish3];
let dishMarherLeft = ['114px','274px','434px'];
dishAll.forEach((dishN) => {
    dishN.addEventListener('click',  dishBoxMarkShow);
});
dishDropdown.addEventListener('change', dishBoxMarkShow);

function dishBoxMarkShow (event) {
    console.log(event.target.classList);
    dishAll[dishSelectedNumber-1].classList.remove('active');
    if (event.target.classList.contains(`-js-header-dishes`)) {
        dishSelectedNumber = parseInt(event.target.value);
    } else if (event.target.classList.contains('-js-box1')) {
        dishSelectedNumber = 1;
    } else if (event.target.classList.contains('-js-box2')) {
        dishSelectedNumber = 2;
    } else if (event.target.classList.contains('-js-box3')) {
        dishSelectedNumber = 3;
    } else {
        alert(`Error! unknown event, ${event.target.className}`);
    }
    dishAll[dishSelectedNumber-1].classList.add('active'); 
    dishSelectedImage.style.left = dishMarherLeft[dishSelectedNumber-1];   
    dishDropdown.value = dishSelectedNumber;
    document.querySelector('.ingredients .ingredients-text').innerHTML = createCookingText();
}    

document.querySelector('.order .my-slider').addEventListener('input', (event) => {
    dishAmount = event.target.valueAsNumber;
    document.querySelector('.order h2').innerHTML = `Porcijų kiekis: ${dishAmount}`;
    document.querySelector('.ingredients .ingredients-text').innerHTML = createCookingText();
    let posCounter = `${dishAmount*20.6+33}px`;
    document.querySelector('.order .slider-counter p').innerHTML = dishAmount;
    document.querySelector('.order .slider-counter').style.left = posCounter;
});    


