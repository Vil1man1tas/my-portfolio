// 0 - 3 select (0-elementblocknumber), 4-6 option (tue-false)
let selectedAll = [0, 0, 0, 0, false, false, false];
let componentPrice = [[18000,20000,25000],
[0,100,0,300,0,200],
[0,2000,5000],
[0,200],
[200,300,250]];
let priceTotal = 0;
//convert number to price style
function priceNumtoText (num) {
    return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1 ') + ' €'; 
}
//load price to html
for (let i = 0; i < 5; i++) {
    let j = 0;
    componentPrice[i].forEach(priceN => {
        let selectElement = `.-js-pack${i}${j} p`;
        let addPlus = ''
        if (i > 0) {addPlus = '+'}
        document.querySelector(selectElement).innerHTML = addPlus + priceNumtoText(priceN);
        j++;
    });
}
//change and show mark selected block
function markOnOffShow (onOff) {
    for (let i = 0; i < 4; i++) {
        let selectElement = `.-js-pack${i}${selectedAll[i]}`;
        if (onOff) {
            document.querySelector(selectElement).classList.add('selected');
            priceTotal = priceTotal + componentPrice[i][selectedAll[i]];
        } else {
            document.querySelector(selectElement).classList.remove('selected');
            priceTotal = priceTotal - componentPrice[i][selectedAll[i]];
        }
    }
    for (let i = 4; i < 7; i++) {
        if (selectedAll[i]) {
            let selectElement = `.-js-pack4${i-4}`;
            if (onOff) {
                document.querySelector(selectElement).classList.add('selected');
                priceTotal = priceTotal + componentPrice[4][i-4];
            }
            else {
                document.querySelector(selectElement).classList.remove('selected');
                priceTotal = priceTotal - componentPrice[4][i-4];
            }
        }
    }
    document.querySelector('.total p').innerHTML = priceNumtoText(priceTotal);
}

//first tame load web with block price 
markOnOffShow(1);

// eventListener, order formation   
let packAll = document.querySelectorAll('.common-pack');
packAll.forEach(parkN => {
    parkN.addEventListener('click', () => {
        markOnOffShow(0);
        let num0 = parseInt(parkN.dataset.id[0]);
        let num1 = parseInt(parkN.dataset.id[1]);
        if (num0 < 4) {
            selectedAll[num0] = num1;
        } else if (num0 < 7) {
            selectedAll[num0+num1] = !(selectedAll[num0+num1]);
        } else {alert('Error, invalid date-id tag.')}
        markOnOffShow(1);
    })
});
