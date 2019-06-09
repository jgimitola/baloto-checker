let balotoNumbers = [];
let revanchaNumbers = [];
let precios;

$(document).ready(function () {
    $("#balotas").load('https://www.baloto.com/index.php .numbers');
    $("#valores-acumulados").load('https://www.baloto.com/index.php .price');
});

$(document).ajaxStop(function () {
    let balaux = document.getElementsByClassName('numbers').item(0).getElementsByTagName('a');
    for (let i = 0; i < balaux.length; i++) {
        balotoNumbers.push(balaux[i].textContent);
    }
    let revaux = document.getElementsByClassName('numbers').item(1).getElementsByTagName('a');
    for (let j = 0; j < balaux.length; j++) {
        revanchaNumbers.push(revaux[j].textContent);
    }
    precios = document.getElementById('valores-acumulados').getElementsByTagName('h1');
    $('.acumulado-baloto h2').text(precios[0].textContent.split("millones")[0]);
    $('.acumulado-revancha h2').text(precios[1].textContent.split("millones")[0]);
});

function verificar() {
    removeBalotoDivs();
    let tiquete = [];
    let tiqaux = document.getElementsByTagName('input');
    for (let p = 0; p < tiqaux.length; p++) {
        tiquete.push(tiqaux[p].value);
    }
    $("div").remove("#entrada");
    comprobarBalotas(tiquete, balotoNumbers, '#resultado-baloto', '#coincidencias-baloto');
    comprobarBalotas(tiquete, revanchaNumbers, '#resultado-revancha', '#coincidencias-revancha');
    $("#resultado").removeAttr("style");
}

function hasBALL(tiquete, resultado) {
    for (let k = 0; k < 5; k++) {
        if (tiquete == resultado[k]) {
            return true;
        }
    }
    return false;
}

function removeBalotoDivs() {
    $("div").remove("#balotas");
    $("div").remove("#valores-acumulados");
}

function mostrarCoincidencias(presentes, numerosjuego, sitio) {
    var indexPre = 0;
    var indexNum = 0;
    while (indexPre < presentes.length && indexNum < 6) {
        if (presentes[indexPre] > numerosjuego[indexNum] && indexNum != 5) {
            $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball red" value="' + numerosjuego[indexNum] + '"></div>');
            indexNum++;
        } else {
            if (presentes[indexPre] == numerosjuego[indexNum]) {
                if (indexNum == 5) {
                    $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="superballgreen" value="' + numerosjuego[indexNum] + '"></div>');
                } else {
                    $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball green" value="' + numerosjuego[indexNum] + '"></div>');
                }
                indexPre++;
                indexNum++;
            }
        }
    }
    while (indexNum < 6) {
        if (indexNum == 5) {
            $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="superballred" value="' + numerosjuego[indexNum] + '"></div>');
        } else {
            $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball red" value="' + numerosjuego[indexNum] + '"></div>');
        }
        indexNum++;
    }
}

function comprobarBalotas(numtiquete, numerosjuego, sitio, sitioresultado) {
    var aciertos = 0;
    var coincidencias = [];
    var sb = false;

    for (let i = 0; i < 5; i++) {
        if (hasBALL(numtiquete[i], numerosjuego)) {
            aciertos++;
            coincidencias.push(numtiquete[i]);
        }
    }
    if (numtiquete[5] == numerosjuego[5]) {
        sb = true;
        coincidencias.push(numtiquete[5]);
    }

    if (aciertos >= 0 && aciertos < 3) {
        if (sb) {
            $(sitio).append('<h2>Gan\u00F3 con ' + aciertos + ' balotas y superbalota.</h2>');
        } else {
            $(sitio).append('<h2>No tuvo premios, tuvo ' + aciertos + ' balotas.</h2>');
        }
    } else {
        if (aciertos > 2 && aciertos < 5) {
            if (sb) {
                $(sitio).append('<h2>Gan\u00F3 con ' + aciertos + ' balotas y superbalota.</h2>');
            } else {
                $(sitio).append('<h2>Gan\u00F3 con ' + aciertos + ' balotas.</h2>');
            }
        } else {
            if (sb) {
                $(sitio).append('<h2>Gan\u00F3 el premio mayor.</h2>');
            } else {
                $(sitio).append('<h2>Gan\u00F3 con ' + aciertos + ' balotas.</h2>');
            }
        }
    }
    mostrarCoincidencias(coincidencias, numerosjuego, sitioresultado);
}