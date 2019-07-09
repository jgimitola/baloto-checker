var balotoNums = [];
var revanchaNums = [];
var priceBaloto = [
    ["5 + 1", "$"],
    ["5 + 0", "$"],
    ["4 + 1", "$"],
    ["4 + 0", "$"],
    ["3 + 1", "$"],
    ["3 + 0", "$"],
    ["2 + 1", "$"],
    ["1 + 1 Y 0 + 1", "$"]
];
var priceRevancha = [
    ["5 + 1", "$"],
    ["5 + 0", "$"],
    ["4 + 1", "$"],
    ["4 + 0", "$"],
    ["3 + 1", "$"],
    ["3 + 0", "$"],
    ["2 + 1", "$"],
    ["1 + 1 Y 0 + 1", "$"]
];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const url = 'https://www.baloto.com/historicomes/' + year + '/' + month;

//Cargamos a la página los datos de BALOTO.
$("#balotas").load('https://www.baloto.com/index.php div.slider_sectoin div.numbers');
$("#valores-acumulados").load('https://www.baloto.com/index.php .price');
$("#valores-obtenidos").load(url + ' div.panle-table-body div.row');


//Cuando todos los datos hayan sido cargados, se actualizan en la página y se guardan en vectores las balotas.
$(document).ajaxStop(function () {
    filterndSetPrices();
    let auxBalNums = document.getElementsByClassName('numbers').item(0).getElementsByTagName('a');
    ticketify(auxBalNums, balotoNums, 0);
    let auxRevNums = document.getElementsByClassName('numbers').item(1).getElementsByTagName('a');
    ticketify(auxRevNums, revanchaNums, 0);
    let prices = document.getElementById('valores-acumulados').getElementsByTagName('h1');
    $('.acumulado-baloto h2').text(prices[0].textContent.split("millones")[0]);
    $('.acumulado-revancha h2').text(prices[1].textContent.split("millones")[0]);
    $("#balotas").remove();
    $("#valores-acumulados").remove();
});

function changeValue(opt, val) {
    if (opt == 0) {
        let index = getLastValIndex(priceBaloto);
        priceBaloto[index][1] = val;
    } else {
        let index = getLastValIndex(priceRevancha);
        priceRevancha[index][1] = val;
    }
}

function getLastValIndex(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] == "$") {
            return i;
        }
    }
}

function filterndSetPrices() {
    filterValues();
    setValues();
    $("#valores-obtenidos").remove();
}

function setValues() {
    let rows = $("div#valores-obtenidos > div");
    for (let i = 0; i < rows.length; i++) {
        let spans = rows[i].getElementsByTagName("span");
        if (i < 8) {
            changeValue(0, spans[2].textContent);
        } else {
            changeValue(1, spans[2].textContent.trim());
        }
    }
}

function filterValues() {
    let rows = $("div#valores-obtenidos > div");
    for (let i = 0; i < rows.length; i++) {
        if (i >= 8 && i <= 15 || i >= 24 && i <= 31 || i > 31) {
            rows[i].remove();
        }
    }
}

//Se convierten los números en formato String a arrays de enteros.
function ticketify(auxArray, gameNums, opt) {
    if (opt == 0) { //Tags diferentes a input.
        for (let i = 0; i < auxArray.length; i++) {
            gameNums.push(parseInt(auxArray[i].textContent, 10));
        }
    } else {
        for (let i = 0; i < auxArray.length; i++) {
            gameNums.push(parseInt(auxArray[i].value, 10));
        }
    }
}

//Ya cargado todos los datos de Baloto, eliminamos los divs donde se almacenaron temporalmente.
function removeBalotoDivs() {
    $("div").remove("#balotas");
    $("div").remove("#valores-acumulados");
}

//Verficia que los números hasta la quinta balota, estén de forma ascendente.
function isAscendant(gameNums) {
    for (let i = 0; i < gameNums.length - 2; i++) { //"i" llega hasta el valor 4 porque se comparan parejas de números.
        if (gameNums[i] > gameNums[i + 1]) {
            return false;
        }
    }
    return true;
}

//Busca que un determinado número se encuentre en el array de resultado del sorteo.
function hasBall(ticket, resultTicket) {
    for (let k = 0; k < 5; k++) { //La superbalota se verifica aparte.
        if (ticket == resultTicket[k]) {
            return true;
        }
    }
    return false;
}

function getPrice(cont, bool, opt) {
    let id;
    if (cont == 1 && bool == true || cont == 0 && bool == true) {
        id = "1 + 1 Y 0 + 1";
    } else {
        if (bool) {
            id = cont + " + 1";
        } else {
            id = cont + " + 0";
        }
    }

    if (opt == 0) {
        for (let i = 0; i < priceBaloto.length; i++) {
            if (priceBaloto[i].includes(id)) {
                return priceBaloto[i][1];
            }
        }
    } else {
        for (let i = 0; i < priceRevancha.length; i++) {
            if (priceRevancha[i].includes(id)) {
                return priceRevancha[i][1];
            }
        }
    }
}

//Verifica los aciertos, los muestra y llama a la funcion que muestra las balotas graficamente.
function checkBalls(ticket, gameNums, displayTextoTo, displayBallsTo, opt) {
    let matchsAmount = 0;
    let matchNums = [];
    let sbMatch = false;
    for (let i = 0; i < 5; i++) {
        if (hasBall(ticket[i], gameNums)) {
            matchsAmount++;
            matchNums.push(ticket[i]);
        }
    }
    if (ticket[5] == gameNums[5]) {
        sbMatch = true;
    }
    let price = getPrice(matchsAmount, sbMatch, opt);
    if (matchsAmount >= 0 && matchsAmount < 3) {
        if (sbMatch) {
            $(displayTextoTo).append('<h2>Gan\u00F3 <span style="color: yellow">' + price + '</span> con ' + matchsAmount + ' balotas y superbalota.</h2>');
        } else {
            $(displayTextoTo).append('<h2>No tuvo premios, tuvo ' + matchsAmount + ' balotas.</h2>');
        }
    } else {
        if (matchsAmount > 2 && matchsAmount < 5) {
            if (sbMatch) {
                $(displayTextoTo).append('<h2>Gan\u00F3 <span style="color: yellow">' + price + '</span> con ' + matchsAmount + ' balotas y superbalota.</h2>');
            } else {
                $(displayTextoTo).append('<h2>Gan\u00F3 <span style="color: yellow">' + price + '</span> con ' + matchsAmount + ' balotas.</h2>');
            }
        } else {
            if (sbMatch) {
                $(displayTextoTo).append('<h2>Gan\u00F3 <span style="color: yellow">' + price + '</span> el premio mayor.</h2>');
            } else {
                $(displayTextoTo).append('<h2>Gan\u00F3 <span style="color: yellow">' + price + '</span> con ' + matchsAmount + ' balotas.</h2>');
            }
        }
    }
    showMatchBalls(matchNums, sbMatch, gameNums, displayBallsTo);
}

//Muestra las coincidencias.
function showMatchBalls(matchNums, sbMatch, gameNums, displayBallsTo) {
    let iMatchNums = 0;
    let iGameNums = 0;
    while (iMatchNums < matchNums.length && iGameNums < 5) {
        if (matchNums[iMatchNums] > gameNums[iGameNums]) {
            $(displayBallsTo).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball red" value="' + gameNums[iGameNums] + '"></div>');
            iGameNums++;
        } else {
            $(displayBallsTo).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball green" value="' + gameNums[iGameNums] + '"></div>');
            iMatchNums++;
            iGameNums++;
        }
    }
    //Si el usuario no llena todas las balotas.
    while (iGameNums < 5) {
        $(displayBallsTo).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball red" value="' + gameNums[iGameNums] + '"></div>');
        iGameNums++;
    }
    if (sbMatch) {
        $(displayBallsTo).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="superballgreen" value="' + gameNums[iGameNums] + '"></div>');
    } else {
        $(displayBallsTo).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="superballred" value="' + gameNums[iGameNums] + '"></div>');
    }
}

function verificar() {
    removeBalotoDivs();
    let ticket = [];
    let auxTicket = document.getElementsByTagName('input');
    ticketify(auxTicket, ticket, 1);
    $("div").remove("#entrada");
    if (isAscendant(ticket)) {
        checkBalls(ticket, balotoNums, '#resultado-baloto', '#coincidencias-baloto', 0);
        checkBalls(ticket, revanchaNums, '#resultado-revancha', '#coincidencias-revancha', 1);
    } else {
        $("#resultado").empty();
        $("#resultado").append('<h2 class="text-center">Debe introducir los valores en el mismo orden del tiquete.</h2>');
        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    $("#resultado").removeAttr("style");
}