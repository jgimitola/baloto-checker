let precios,balotoNumbers=[],revanchaNumbers=[];$(document).ready(function(){$("#balotas").load("https://www.baloto.com/index.php div.slider_sectoin div.numbers"),$("#valores-acumulados").load("https://www.baloto.com/index.php .price")}),$(document).ajaxStop(function(){let a=document.getElementsByClassName("numbers").item(0).getElementsByTagName("a");tiquetificar(a,balotoNumbers,0);let b=document.getElementsByClassName("numbers").item(1).getElementsByTagName("a");tiquetificar(b,revanchaNumbers,0),precios=document.getElementById("valores-acumulados").getElementsByTagName("h1"),$(".acumulado-baloto h2").text(precios[0].textContent.split("millones")[0]),$(".acumulado-revancha h2").text(precios[1].textContent.split("millones")[0])});function verificar(){removeBalotoDivs();let a=[],b=document.getElementsByTagName("input");tiquetificar(b,a,1),$("div").remove("#entrada"),esAscendente(a)?(comprobarBalotas(a,balotoNumbers,"#resultado-baloto","#coincidencias-baloto"),comprobarBalotas(a,revanchaNumbers,"#resultado-revancha","#coincidencias-revancha")):($("#resultado").empty(),$("#resultado").append("<h2 class=\"text-center\">Debe introducir los valores en el mismo orden del tiquete.</h2>"),setTimeout(function(){location.reload()},3e3)),$("#resultado").removeAttr("style")}function esAscendente(a){for(let b=0;b<a.length-2;b++)if(a[b]>a[b+1])return!1;return!0}function tiquetificar(a,b,c){if(0==c)for(let c=0;c<a.length;c++)b.push(parseInt(a[c].textContent,10));else for(let c=0;c<a.length;c++)b.push(parseInt(a[c].value,10))}function hasBALL(a,b){for(let c=0;5>c;c++)if(a==b[c])return!0;return!1}function removeBalotoDivs(){$("div").remove("#balotas"),$("div").remove("#valores-acumulados")}function mostrarCoincidencias(a,b,c){for(var d=0,e=0;d<a.length&&6>e;)a[d]>b[e]&&5!=e?($(c).append("<div class=\"col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center\"><input type=\"text\" readonly=\"\" class=\"ball red\" value=\""+b[e]+"\"></div>"),e++):a[d]==b[e]&&(5==e?$(c).append("<div class=\"col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center\"><input type=\"text\" readonly=\"\" class=\"superballgreen\" value=\""+b[e]+"\"></div>"):$(c).append("<div class=\"col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center\"><input type=\"text\" readonly=\"\" class=\"ball green\" value=\""+b[e]+"\"></div>"),d++,e++);for(;6>e;)5==e?$(c).append("<div class=\"col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center\"><input type=\"text\" readonly=\"\" class=\"superballred\" value=\""+b[e]+"\"></div>"):$(c).append("<div class=\"col-3 col-sm-2 col-md-1 col-lg-1 col-xl-1 text-center\"><input type=\"text\" readonly=\"\" class=\"ball red\" value=\""+b[e]+"\"></div>"),e++}function comprobarBalotas(a,b,c,d){var e=0,f=[],g=!1;for(let g=0;5>g;g++)hasBALL(a[g],b)&&(e++,f.push(a[g]));a[5]==b[5]&&(g=!0,f.push(a[5])),0<=e&&3>e?g?$(c).append("<h2>Gan\xF3 con "+e+" balotas y superbalota.</h2>"):$(c).append("<h2>No tuvo premios, tuvo "+e+" balotas.</h2>"):2<e&&5>e?g?$(c).append("<h2>Gan\xF3 con "+e+" balotas y superbalota.</h2>"):$(c).append("<h2>Gan\xF3 con "+e+" balotas.</h2>"):g?$(c).append("<h2>Gan\xF3 el premio mayor.</h2>"):$(c).append("<h2>Gan\xF3 con "+e+" balotas.</h2>"),mostrarCoincidencias(f,b,d)}