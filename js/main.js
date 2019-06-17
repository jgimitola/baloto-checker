var balotoNums = [];
var revanchaNums = [];

//Cargamos a la página los datos de BALOTO.
$("#balotas").load('https://www.baloto.com/index.php div.slider_sectoin div.numbers');
$("#valores-acumulados").load('https://www.baloto.com/index.php .price');

//Cuando todos los datos hayan sido cargados, se actualizan en la página y se guardan en vectores las balotas.
$(document).ajaxStop(function () {
    let auxBalNums = document.getElementsByClassName('numbers').item(0).getElementsByTagName('a');
    ticketify(auxBalNums, balotoNums, 0);
    let auxRevNums = document.getElementsByClassName('numbers').item(1).getElementsByTagName('a');
    ticketify(auxRevNums, revanchaNums, 0);
    let prices = document.getElementById('valores-acumulados').getElementsByTagName('h1');
    $('.acumulado-baloto h2').text(prices[0].textContent.split("millones")[0]);
    $('.acumulado-revancha h2').text(prices[1].textContent.split("millones")[0]);
});

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

//Verifica los aciertos, los muestra y llama a la funcion que muestra las balotas graficamente.
function checkBalls(ticket, gameNums, displayTextoTo, displayBallsTo) {
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
    if (matchsAmount >= 0 && matchsAmount < 3) {
        if (sbMatch) {
            $(displayTextoTo).append('<h2>Gan\u00F3 con ' + matchsAmount + ' balotas y superbalota.</h2>');
        } else {
            $(displayTextoTo).append('<h2>No tuvo premios, tuvo ' + matchsAmount + ' balotas.</h2>');
        }
    } else {
        if (matchsAmount > 2 && matchsAmount < 5) {
            if (sbMatch) {
                $(displayTextoTo).append('<h2>Gan\u00F3 con ' + matchsAmount + ' balotas y superbalota.</h2>');
            } else {
                $(displayTextoTo).append('<h2>Gan\u00F3 con ' + matchsAmount + ' balotas.</h2>');
            }
        } else {
            if (sbMatch) {
                $(displayTextoTo).append('<h2>Gan\u00F3 el premio mayor.</h2>');
            } else {
                $(displayTextoTo).append('<h2>Gan\u00F3 con ' + matchsAmount + ' balotas.</h2>');
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
        checkBalls(ticket, balotoNums, '#resultado-baloto', '#coincidencias-baloto');
        checkBalls(ticket, revanchaNums, '#resultado-revancha', '#coincidencias-revancha');
    } else {
        $("#resultado").empty();
        $("#resultado").append('<h2 class="text-center">Debe introducir los valores en el mismo orden del tiquete.</h2>');
        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    $("#resultado").removeAttr("style");
}