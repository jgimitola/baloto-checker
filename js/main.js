let balotoNumbers = [];
let revanchaNumbers = [];
let precios;

$(document).ready(function () {
    $("#balotas").load('https://www.baloto.com/index.php .numbers');
    $("#valores-acumulados").load('https://www.baloto.com/index.php .price');
});

$(document).ajaxComplete(function () {
    console.log(1);
    let balaux = document.getElementsByClassName('numbers').item(0).getElementsByTagName('a');
    for (let i = 0; i < balaux.length; i++) {
        balotoNumbers.push(balaux[i].textContent);
    }
    let revaux = document.getElementsByClassName('numbers').item(1).getElementsByTagName('a');
    for (let j = 0; j < balaux.length; j++) {
        revanchaNumbers.push(revaux[j].textContent);
    }
    try {
        precios = document.getElementById('valores-acumulados').getElementsByTagName('h1');
        $('.acumulado-baloto h2').text(precios[0].textContent.split("millones")[0]);
        $('.acumulado-revancha h2').text(precios[1].textContent.split("millones")[0]);
    } catch (error) {

    }
});

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

function verificar() {
    removeBalotoDivs();
    let tiquete = [];
    let tiqaux = document.getElementsByTagName('input');
    for (let p = 0; p < tiqaux.length; p++) {
        tiquete.push(tiqaux[p].value);
    }
    var aciertos = 0;
    var sb = false;
    for (let i = 0; i < 6; i++) {
        if (i == 5) {
            if (tiquete[i] == balotoNumbers[i]) {
                sb = true;
                aciertos++;
            }
        } else {
            if (hasBALL(tiquete[i], balotoNumbers)) {
                aciertos++;
            }
        }
    }
    $("div").remove("#entrada");
    $("#resultado").append('<h1>Baloto</h1>');
    if (aciertos > 1) {
        if (aciertos == 6) {
            $("#resultado").append('<h2>Ganaste el premio mayor.</h2>');
        } else {
            if (sb) {
                aciertos--;
                $("#resultado").append('<h2>Ganaste con ' + aciertos + ' balotas y superbalota. </h2>');
            } else {
                if (aciertos != 2) {
                    $("#resultado").append('<h2>Ganaste con ' + aciertos + ' balotas. </h2>');
                } else {
                    $("#resultado").append('<h2>No acerto ningun premio, solo tuvo dos balotas.</h2>');
                }
            }
        }

    } else {
        if (aciertos == 1) {
            if (sb) {
                $("#resultado").append('<h2>Ganaste con una balota y super balota.</h2>');
            } else {
                $("#resultado").append('<h2>No acerto ningun premio, solo tuvo una balota.</h2>');
            }
        } else {
            if (sb) {
                $("#resultado").append('<h2>Ganaste con la super balota.</h2>');
            } else {
                $("#resultado").append('<h2>No tuvo aciertos.</h2>');
            }
        }
    }

    var aciertosRevancha = 0;
    var sbr = false;
    for (let i = 0; i < 6; i++) {
        if (i == 5) {
            if (tiquete[i] == revanchaNumbers[i]) {
                sbr = true;
                aciertosRevancha++;
            }
        } else {
            if (hasBALL(tiquete[i], revanchaNumbers)) {
                aciertosRevancha++;
            }
        }
    }
    $("#resultado").append('<h1>Revancha</h1>');
    if (aciertosRevancha > 1) {
        if (aciertosRevancha == 6) {
            $("#resultado").append('<h2>Ganaste la revancha.</h2>');
        } else {
            if (sbr) {
                aciertosRevancha--;
                $("#resultado").append('<h2>Ganaste con ' + aciertosRevancha + ' balotas y superbalota. </h2>');
            } else {
                if (aciertosRevancha != 2) {
                    $("#resultado").append('<h2>Ganaste con ' + aciertosRevancha + ' balotas. </h2>');
                } else {
                    $("#resultado").append('<h2>No acerto ningun premio, solo tuvo dos balotas.</h2>');
                }
            }
        }

    } else {
        if (aciertosRevancha == 1) {
            if (sbr) {
                $("#resultado").append('<h2>Ganaste con una balota y super balota.</h2>');
            } else {
                $("#resultado").append('<h2>No acerto ningun premio, solo tuvo una balota.</h2>');
            }
        } else {
            if (sbr) {
                $("#resultado").append('<h2>Ganaste con la super balota.</h2>');
            } else {
                $("#resultado").append('<h2>No tuvo aciertos.</h2>');
            }
        }
    }
    $("#resultado").removeAttr("style");
}
