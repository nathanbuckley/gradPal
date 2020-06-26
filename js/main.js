/*
*
*/

var picker1, picker2, color1hex, color1rgb, color2hex, color2rgb;

var defaultcol = "#36384c";

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16),
    r = (bigint >> 16) & 255,
    g = (bigint >> 8) & 255,
    b = bigint & 255;

    return [r, g, b];
}

function makeGradarray(n) {

    var g = [];
    
    for(var i = 2; i< n; i++){

        var rgb =  [];

        for(var x = 0; x < 3; x++){
            if (color1rgb[x] > color2rgb[x]){ 
                rgb.push(Math.round(color1rgb[x] - (((color1rgb[x] - color2rgb[x]) / n) * i))); 
            }else{
                rgb.push(Math.round(color1rgb[x] + (((color2rgb[x] - color1rgb[x]) / n) * i))); 
            }
        }
        g.push(rgb);
    }
    return g;
}

function updateColors(e, id) {

    //console.log(e.target.id + " = " + hexToRgb(e.target.value.substring(1)).join('.'));

    document.getElementById(id).style.backgroundColor = e.target.value;
    document.getElementById(id + "hex").innerHTML =  "HEX = " + e.target.value;
    document.getElementById(id + "rgb").innerHTML = "RGB = " + hexToRgb(e.target.value.substring(1)).join('.');
    
    if(color1rgb != null && color2rgb != null){
        var gradarr = makeGradarray(6);
        console.log(gradarr);
        updatePallet(gradarr);
    }
}

function updatePallet(p) {

    document.getElementById("gradsmpl1").style.backgroundColor = color1hex;
    document.getElementById("gradvalrgb1").innerHTML = "RGB = " + color1rgb.join('.');

    for(var i = 0; i < p.length; i++){
        document.getElementById("gradsmpl" + (i+2)).style.backgroundColor = 'rgb(' + (p[i].join(',')) + ')';
        document.getElementById("gradvalrgb" + (i+2)).innerHTML = "RGB = " + p[i].join('.');
        //document.getElementById("gradvalhex" + (i+1)).innerHTML = "HEX = " + ;
    }

    document.getElementById("gradsmpl6").style.backgroundColor = color2hex;
    document.getElementById("gradvalrgb6").innerHTML = "RGB = " + color2rgb.join('.');
}

function saveToPallet1(e) {
    color1hex = e.target.value;
    color1rgb = hexToRgb(e.target.value.substring(1));
    updateColors(e,"chosenone");
}

function saveToPallet2(e) {
    color2hex = e.target.value;
    color2rgb = hexToRgb(e.target.value.substring(1));
    updateColors(e,"chosentwo");
}

function pageloaded() {

    picker1 = document.getElementById("hexcol1");
    picker1.value = defaultcol;
    picker1.addEventListener("input", saveToPallet1, false);
    picker1.select();

    picker2 = document.getElementById("hexcol2");
    picker2.value = defaultcol;
    picker2.addEventListener("input", saveToPallet2, false);
    picker2.select();
}


window.addEventListener("load", pageloaded, false);
