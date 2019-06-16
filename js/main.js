let balotoNumbers = new Array();
let revanchaNumbers = new Array();
let precios;

$(document).ready(function () {
    $("#balotas").load('https://www.baloto.com/index.php div.slider_sectoin div.numbers');
    $("#valores-acumulados").load('https://www.baloto.com/index.php .price');
});

$(document).ajaxStop(function () {
    let balaux = document.getElementsByClassName('numbers').item(0).getElementsByTagName('a');
    tiquetificar(balaux, balotoNumbers, 0);
    let revaux = document.getElementsByClassName('numbers').item(1).getElementsByTagName('a');
    tiquetificar(revaux, revanchaNumbers, 0);
    precios = document.getElementById('valores-acumulados').getElementsByTagName('h1');
    $('.acumulado-baloto h2').text(precios[0].textContent.split("millones")[0]);
    $('.acumulado-revancha h2').text(precios[1].textContent.split("millones")[0]);
});

function verificar() {
    removeBalotoDivs();
    let tiquete = new Array();
    let tiqaux = document.getElementsByTagName('input');
    tiquetificar(tiqaux, tiquete, 1);
    $("div").remove("#entrada");
    if (esAscendente(tiquete)) {
        comprobarBalotas(tiquete, balotoNumbers, '#resultado-baloto', '#coincidencias-baloto');
        comprobarBalotas(tiquete, revanchaNumbers, '#resultado-revancha', '#coincidencias-revancha');
    } else {
        $("#resultado").empty();
        $("#resultado").append('<h2 class="text-center">Debe introducir los valores en el mismo orden del tiquete.</h2>');
        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    $("#resultado").removeAttr("style");
}

function esAscendente(numerosjuego) {
    for (let i = 0; i < numerosjuego.length - 2; i++) {
        if (numerosjuego[i] > numerosjuego[i + 1]) {
            return false;
        }
    }
    return true;
}

function tiquetificar(aux, numerosjuego, op) {
    if (op == 0) {
        for (let i = 0; i < aux.length; i++) {
            numerosjuego.push(parseInt(aux[i].textContent, 10));
        }
    } else {
        for (let i = 0; i < aux.length; i++) {
            numerosjuego.push(parseInt(aux[i].value, 10));
        }
    }
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
            }else{
                $(sitio).append('<div class="col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center"><input type="text" readonly="" class="ball red" value="' + numerosjuego[indexNum] + '"></div>');
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
    var coincidencias = new Array();
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