/*
this file contains the functions used by the main html file
Author : Pranav Tiwari
*/
/*
description of user-defined variables
*/
var html = '<html>';
var nowStyle = '';
var temperX = 0;
var temperY = 0;
var hangingX = false;
var hangingY = false;
var mouseX;
var mouseY;
$('#copyback').hide();
function copyback() {
    $('#menuWrapper').show();
    $('#main').show();
    $('#html').hide()

    $('#copyback').hide();
}
function copyHTML() {
    console.log(html+'\n<style>\n'+nowStyle+'\n</style>\n');

    $('#copyback').show();
    $('#menuWrapper').hide();
    $('#main').hide();
    $('#prev').hide();
    document.getElementById('html').value = html + '\n<style>\n' + nowStyle + '\n</style>\n';
    $('#html').show();
}
$(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    $('#mousePos').html('x: ' + mouseX + '<br>y: ' + mouseY).offset({ top: mouseY+20, left: mouseX+20 });
    if (hangingX) {
        $('#xhelper' + (gx - 1)).offset({ left: mouseX });
    }else if (hangingY) {
        $('#yhelper' + (gy - 1)).offset({ top: mouseY });
    }
});

$(document).click(function (e) {
    if (hangingX) {
        if (temperX == 2) {
            console.log('dropped');
            hangingX = false;
            temperX = 0;
        } else temperX++;
    }
    if (hangingY) {
        if (temperY == 2) {
            console.log('dropped');
            hangingY = false;
            temperY = 0;
        } else temperY++;
    }
});
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
i = 1;
gx = 1;
gy = 1;
td = 1;
bt = 1;
winds = [];
hoverstate = [];
leftoffset = [];
topoffset = [];
curdiv = false;
bufferTop=0;
bufferLeft=0;
curdegree = [];
curtext=false;
appzIndex = 1;
istyping = false;
targetdiv = 0;
attdiv = 0;
attachment = 0;
par = "transform: skew(20deg); \
     -o-transform: skew(20deg); \
     -moz-transform: skew(20deg); \
     -webkit-transform: skew(20deg);"
var copydiv;
/*
description of user-defined functions
*/
cd = 1;
function snap2grid(event,ui,t,l) {
    var snapTolerance = 20;
    var topRemainder = ui.position.top+t;
    var leftRemainder = ui.position.left+l;
    console.log(t);
   
    if (pmod(leftRemainder - 420) <= snapTolerance) {
        ui.position.left = 420;
    }
    if (pmod(topRemainder - 40) <= snapTolerance) {
        ui.position.top = 40-t;
    }

}
function dragize(d) {
    t = $('#' + d).offset().top;
    l = $('#' + d).offset().left;
    console.log(t);
    $('#' + d).resizable();
    $('#' + d).draggable({
        drag: function (event,ui) {
                snap2grid(event,ui,t,l);
              }
    });
}
function changeText(s) {
    cr = Math.floor((Math.random() * 255) + 1);
    cg = Math.floor((Math.random() * 255) + 1);
    cb = Math.floor((Math.random() * 255) + 1);
    xr = Math.floor((Math.random() * 1000) + 1);
    yr = Math.floor((Math.random() * 300) + 1);
    //yr = 0; xr = 0;
    lr = Math.floor((Math.random() * 155) + 100);
    wr = Math.floor((Math.random() * 155) + 100);
    defwindow = document.createElement("DIV");
    defwindow.style.top = yr + "px";
    defwindow.style.left = xr + "px";
    defwindow.style.marginTop='0px';
    defwindow.className = " drsElement drsMoveHandle window";
    console.log(cd);
    defwindow.id = "wind" + cd;
    defwindow.style.width = lr + "px";
    defwindow.style.height = wr + "px";
    c = "rgb(" + cr + "," + cg + "," + cb + ")";
    defwindow.style.backgroundColor = "rgb(" + cr + "," + cg + "," + cb + ")";
    defwindow.style.zIndex=appzIndex++;
    
    winds[i] = new Object();
    winds[i].display = 1;
    curdegree['wind'+i] = 0;

    if (s == 1) {
        defwindow.style.border = 'none';

    }
    else if (s == 2) {
        defwindow.style.border = 'none';

        defwindow.style.width = defwindow.style.height;
        defwindow.style.borderRadius = "50%";
    }
    else if (s == 3) {
        defwindow.style.border = 'none';

        defwindow.style.transform = "skew(45deg)";
    }
    else if (s == 4) {
        defwindow.style.border = 'none';
        defwindow.style.background = 'linear-gradient(to right bottom, '+c+' 50%, transparent 50%)';
        //deg = 45;
        //defwindow.style.webkitTransform = 'rotate(' + deg + 'deg)';
        //defwindow.style.mozTransform = 'rotate(' + deg + 'deg)';
        //defwindow.style.msTransform = 'rotate(' + deg + 'deg)';
        //defwindow.style.oTransform = 'rotate(' + deg + 'deg)';
        //defwindow.style.transform = 'rotate(' + deg + 'deg)';

    }
    else if (s == 5) {
        defwindow.style.border = 'none';
        defwindow.style.background = 'linear-gradient(to left bottom, ' + c + ' 50%, transparent 50%)';
    }
    else if (s == 6) {
        defwindow.style.border = 'none';
        defwindow.style.background = 'linear-gradient(to right top, ' + c + ' 50%, transparent 50%)';
    }
    else if (s == 7) {
            defwindow.style.border = 'none';
            defwindow.style.background = 'linear-gradient(to left top, ' + c + ' 50%, transparent 50%)';
    }
    else if (s == 8) {
            defwindow.style.border = 'none';
            defwindow.style.width = '0px';
            lhelper = document.createElement("DIV");
            lhelper.className = 'leftgrid';
            lhelper.id = 'helper';
            lhelper.onclick = function () {
                console.log("i was clicked");
            }
            defwindow = lhelper;
            $('#helper').draggable({ axis: "X" });
    }
    document.getElementById('main').appendChild(defwindow);
    defwindow = document.getElementById('wind' + cd);
    defwindow.onclick = function () { show(event||window.event,this.id) };
    //dragize(defwindow.id);
    curdiv = cd++;
    i = i + 1;
    appzIndex++;

}
function addGrid(s) {
    if (s == 1) {
        hangingX = true;
        lhelper = document.createElement("DIV");
        lhelper.className = 'leftgrid';
        lhelper.id = 'xhelper' + gx++;
        document.getElementById('main').appendChild(lhelper);
        $('#xhelper' + (gx - 1)).draggable({
            axis: "x",
            drag: function () {
            }
        });
        
    } else if (s == 2) {
        hangingY = true;
        thelper = document.createElement("DIV");
        thelper.className = 'topgrid';
        thelper.id = 'yhelper' + gy++;
        document.getElementById('main').appendChild(thelper);
        $('#yhelper' + (gy - 1)).draggable({
            axis: "y",
            drag: function () {
            },
        });
    }
}
function addShape(s) {
    if (s == 1) {
        cr = Math.floor((Math.random() * 255) + 1);
        cg = Math.floor((Math.random() * 255) + 1);
        cb = Math.floor((Math.random() * 255) + 1);
        xr = Math.floor((Math.random() * 1000) + 1);
        yr = Math.floor((Math.random() * 300) + 1);
        lr = Math.floor((Math.random() * 155) + 100);
        wr = Math.floor((Math.random() * 155) + 100);
        defwindow = document.createElement("DIV");
        defwindow.style.cssText = 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent;border-bottom: 100px solid red;';
        defwindow.id = 'wind' + cd;
        defwindow.style.zIndex = appzIndex;
        defwindow.onclick = function () { show(event, this.id) };
        curdiv = cd++;
        i = i + 1;
        appzIndex++;

        document.getElementById('main').appendChild(defwindow);
    }
}
function addButtonw(s) {
    xr = Math.floor((Math.random() * 1000) + 1);
    yr = Math.floor((Math.random() * 300) + 1);
    defwindow = document.createElement("DIV");
    defwindow.style.top = yr + "px";
    defwindow.style.left = xr + "px";
    defmove = document.createElement("DIV");
    defmove.className = "drsMoveHandle";
    defwindow.appendChild(defmove);
    defwindow.className = "drsElement";
    console.log(cd);
    defwindow.id = "out" + bt;
    defwindow.style.height = "50px";
    defwindow.style.width = "auto";
    defwindow.style.clear = 'both';
    defwindow.style.border = 'none';
    defwindow.style.backgroundColor = "rgba(0,0,0,0)";
    defwindow.style.zIndex = appzIndex++;
    if (s == 1) {
        d = '<button class="btn btn-hg btn-primary" style="height:100%;width:100% ">Button</button>';
    }
    if (s == 2) {
        d = '<button contenteditable=true class="btn btn-embossed btn-primary" style="height:100%;width:100% "><p contenteditable=true spellcheck=false>Boss Button</button>';
    }
    if (s == 3) {
        d = '<div class="dropdown" >' +
  '<button style="height:100%;width:100% "class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Dropdown<span class="caret"></span></button>' +
  '<span class="dropdown-arrow" ></span>' +
  '<ul class="dropdown-menu"style="width:100% ">' +
   ' <li><a href="#fakelink">Sub Menu Element</a></li>' +
    '<li><a href="#fakelink">Sub Menu Element</a></li>' +
    '<li><a href="#fakelink">Sub Menu Element</a></li>' +
  '</u>' +
'</div>'
    }
    if (s == 4) {
        d = '<div class="dropdown" contenteditablee=true >' +
  '<button style="height:100%;width:100% "class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Dropdown<span class="caret"></span></button>' +
  '<span class="dropdown-arrow dropdown-arrow-inverse" ></span>' +
  '<ul class="dropdown-menu dropdown-inverse"style="width:100% ">' +
   ' <li><a href="#fakelink">Sub Menu Element</a></li>' +
    '<li><a href="#fakelink">Sub Menu Element</a></li>' +
    '<li><a href="#fakelink">Sub Menu Element</a></li>' +
  '</u>' +
'</div>'
    }
    if (s == 5) {

        defwindow.style.height = "165px";
        defwindow.style.width = "185px";
        d = '<div style="margin:0px;position:absolute;top:0px;height:100%;width:100%" class="tooltip fade top in" style="top: -77px; left: 0px; display: block;"><div class="tooltip-arrow"></div><div style="max-width:none; height:100%;width:100%" class="tooltip-inner"><p style="max-width:none;height:100%;width:100% " contenteditable=true spellcheck=false>Here is a sample of a long dark tooltip. Hell yeah.</div></div>' +
              '<div class="tooltip-arrow"></div>' +
              //'<div class="tooltip-inner">Here is a sample of a long dark tooltip. Hell yeah.</div>' +
              '</div>';
    }
    if (s == 6) {
        d='<nav class="navbar navbar-inverse" role="navigation"></nav>';
    }
    if(!is_chrome)
    d = toStaticHTML(d);
    defwindow.innerHTML += d;
    bt++;
    document.getElementById('main').appendChild(defwindow);
}
function addText(s) {
    xr = Math.floor((Math.random() * 1000) + 1);
    yr = Math.floor((Math.random() * 300) + 1);
    cr = Math.floor((Math.random() * 255) + 1);
    cg = Math.floor((Math.random() * 255) + 1);
    cb = Math.floor((Math.random() * 255) + 1);
    lr = Math.floor((Math.random() * 75) + 30);
    def = document.createElement("DIV");
    def.style.top = yr + "px";
    def.style.left = xr + "px";
    def.id = 'text'+td++;
    def.style.zIndex=appzIndex++ +1000;
    def.className = "drsElement window";
    defmove = document.createElement("DIV");

    defmove.className = "drsMoveHandle";
    def.appendChild(defmove);
    def.style.border = 'none';
    def.style.background = 'none';
    if (s == 3)
        var btn = document.createElement("H" + 5);
    else
        var btn = document.createElement("H" + s);
    btn.innerText = 'T';
    btn.contentEditable = 'true';
    btn.spellcheck = 'false';
    def.appendChild(btn);
    def.onclick = function () { curtext = this.id; console.log(curtext); showTextEditor(this.id) };
    document.getElementById('main').appendChild(def);
    
}
function hideitem() {
    
}
function settext() {
    t = $("#text").val();
    console.log(t);
    console.log($("#" + curtext).html());
    $("#" + curtext).html(t);
}
function showTextEditor(d) {
    $("#textty").show();
}
function hide() {
    $('#prev').hide();
}
function hideall() {
    for (var j = cd - 1; j > 0; j--) {
        wind = ('#wind' + j);
        console.log('dsds');
        $(wind).hide();
    }

}
function showall() {
    for (var j = cd - 1; j > 0; j--) {
        wind = ('#wind' + j);
        console.log('dsds');
        $(wind).show();
    }

}
function genHTML() {
    defwindow = '';
    $('#main').hide();
    document.getElementById('prev').innerHTML='';
    prevstyle='';
    for (var j = cd - 1; j > 0; j--) {
        //if (winds[j] == 1) {
        wind = document.getElementById('wind' + j);
        prevstyle += '#' + wind.id + '{\n';
        prevstyle += wind.style.cssText;
        prevstyle += '\n}\n'
        if (hoverstate['wind' + j]) {
            prevstyle += '#' + wind.id + ':hover{\n';
            prevstyle += hoverstate['wind' + j];
            prevstyle += '\n}\n'
        }
        temp = wind.cloneNode(true);
        temp.style.cssText = '';
        temp.style.position = 'absolute';
        temp.className = 'window';
        destroyhandle(temp);
        document.getElementById('prev').appendChild(temp);
        document.getElementById('prev').appendChild(document.createTextNode('\n\n'));
        //}
    }
    for (var j = td - 1; j > 0; j--) {
        //if (winds[j] == 1) {
        wind = document.getElementById('text' + j);
        prevstyle += '#' + wind.id + '{\n';
        prevstyle += wind.style.cssText;
        prevstyle += '\n}\n';
        if (hoverstate['text' + j]) {
            prevstyle += '#' + wind.id + ':hover{\n';
            prevstyle += hoverstate['wind' + j];
            prevstyle += '\n}\n'
        }
        var btn = wind.childNodes[1].cloneNode(true);
        
        temp = document.createElement('DIV');
        temp.appendChild(btn);
        console.log(btn);
        console.log(temp.innerHTML);
        temp.id = wind.id;
        temp.className = 'window';
        temp.style.position = 'absolute';

        document.getElementById('prev').appendChild(temp);
        document.getElementById('prev').appendChild(document.createTextNode('\n\n'));
        //}
    }

    for (var j = bt - 1; j > 0; j--) {
        //if (winds[j] == 1) {
        wind = document.getElementById('out' + j);
        prevstyle += '#' + wind.id + '{\n';
        prevstyle += wind.style.cssText;
        prevstyle += '\n}\n';
        if (hoverstate['text' + j]) {
            prevstyle += '#' + wind.id + ':hover{\n';
            prevstyle += hoverstate['wind' + j];
            prevstyle += '\n}\n'
        }
        var btn = wind.childNodes[1].cloneNode(true);

        temp = document.createElement('DIV');
        temp.appendChild(btn);
        console.log(btn);
        console.log(temp.innerHTML);
        temp.id = wind.id;
        temp.className = 'window';
        temp.style.position = 'absolute';

        document.getElementById('prev').appendChild(temp);
        document.getElementById('prev').appendChild(document.createTextNode('\n\n'));
        //}
    }

    for (var j = bt - 1; j > 0; j--) {
        //if (winds[j] == 1) {
        wind = document.getElementById('out' + j);
        prevstyle += '#' + wind.id + '{\n';
        prevstyle += wind.style.cssText;
        prevstyle += '\n}\n';
        if (hoverstate['text' + j]) {
            prevstyle += '#' + wind.id + ':hover{\n';
            prevstyle += hoverstate['wind' + j];
            prevstyle += '\n}\n'
        }
        var btn = wind.childNodes[1].cloneNode(true);

        temp = document.createElement('DIV');
        temp.appendChild(btn);
        console.log(btn);
        console.log(temp.innerHTML);
        temp.id = wind.id;
        temp.className = 'window';
        temp.style.position = 'absolute';

        document.getElementById('prev').appendChild(temp);
        document.getElementById('prev').appendChild(document.createTextNode('\n\n'));
        //}
    }
    //document.getElementById('prev').innerHTML += (prevstyle);
    //prevstyle += '</style>\n\n';

    var css = prevstyle,
    style = document.createElement('style');
    nowStyle=prevstyle;
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementById('prev').appendChild(style);
    for (var j = im - 1; j > 0; j--) {
        //if (winds[j] == 1) {
        wind = document.getElementById('imgW' + j);
        prevstyle += '#' + wind.id + '{\n';
        prevstyle += wind.style.cssText;
        prevstyle += '\n}\n';
        if (hoverstate['text' + j]) {
            prevstyle += '#' + wind.id + ':hover{\n';
            prevstyle += hoverstate['wind' + j];
            prevstyle += '\n}\n'
        }
        var btn = wind.childNodes[0].cloneNode(true);
        temp = wind.cloneNode(true);
        //temp = document.createElement('DIV');
        //temp.appendChild(btn);
        //console.log(btn);
        //console.log(temp.innerHTML);
        //temp.id = wind.id;
        //temp.className = 'window';
        //temp.style.position = 'absolute';

        document.getElementById('prev').appendChild(temp);
        console.log(html);
        document.getElementById('prev').appendChild(document.createTextNode('\n\n'));
        //}
    }
    
   // document.getElementById('data').value =defwindow;
    html = $('#prev').html();

    $("#prev").show();
    $("#backButton").show();
    //document.forms["myform"].submit();
}

function show(e, f) {
    //e.stopPropagation();
    if (attachment) {
        curdiv = f;
        targetdiv = curdiv;
        attach();
    } else {
       
        curdiv = f;
        console.log("curdiv is "+curdiv);
        updateProps();
    }
}

function changeColor(c) {
    document.getElementById(curdiv).style.background = c;
}
function changedivtext() {
    text = document.getElementById('edittext').value;
    document.getElementById('winddata' + curdiv).innerHTML = '<h1>' + text + '</h1>';
}
function b2f() {
    document.getElementById(curdiv).style.zIndex = appzIndex++;
}
function b2b() {
    document.getElementById(curdiv).style.zIndex = -(appzIndex++);
}

function del() {
    document.getElementById(curdiv).style.display = 'none';
}
//att function copies attdiv to targetdiv
function attstart() {
    attdiv = curdiv;
    console.log('ready to attach div ' + attdiv);
    $('#bAttach').html('select div to attach');
    attachment = 1;
}
function attach() {
    console.log('adding ' + attdiv + ' to ' + targetdiv);
    tar = document.getElementById(targetdiv);
    tl = parseInt(tar.style.left);
    tt = parseInt(tar.style.top);
    wind = document.getElementById(attdiv);

    ol = parseInt(wind.style.left);
    ot = parseInt(wind.style.top);
    console.log(ol - tl);
    console.log(tl - tt);
    wind.style.left = ol - tl + 'px';
    wind.style.top = ot - tt + 'px';

    document.getElementById(targetdiv).appendChild(document.getElementById(attdiv));
    attachment = 0;
    $('#bAttach').html('Attach');
}
function typestart() {
    istyping = 1;
    console.log('typing');
}
function typestop() {
    istyping = 0;
    console.log(' not typing');
}

function hidehandle(d) {//hide resize handles of a div
    var itemDivs = document.getElementById( d).children;
    for (var i = 0; i < itemDivs.length; i++) {
        cn = itemDivs[i].className;
        if (cn != 'addedclass') {
            itemDivs[i].style.display = 'none';
        }
    }
}
function showhandle(d) {//show resize handles of a div
    var itemDivs = document.getElementById("wind" + d).children;
    for (var i = 0; i < itemDivs.length; i++) {
        cn = itemDivs[i].className;
        if (cn != 'addedclass') {
            itemDivs[i].style.display = 'block';
        }
    }
}

function paste() {
    defwindow = '';
    wind = document.getElementById(copydiv);
    defwindow = wind.cloneNode(true);
    defwindow.id = 'wind' + cd;
    defwindow.onclick = function () { show(event, this.id) };
    document.getElementById('main').appendChild(defwindow);
    hidehandle(defwindow.id);
    winds[i] = new Object();
    copydiv = 'wind'+i;
    cd++;
}
function rotate() {
    var div = document.getElementById(curdiv),
        deg = curdegree[curdiv]+10;
    

    div.style.webkitTransform = 'rotate(' + deg + 'deg)';
    div.style.mozTransform = 'rotate(' + deg + 'deg)';
    div.style.msTransform = 'rotate(' + deg + 'deg)';
    div.style.oTransform = 'rotate(' + deg + 'deg)';
    div.style.transform = 'rotate(' + deg + 'deg)';
    curdegree[curdiv] = curdegree[curdiv] + 10;
}
function rotatel() {
    var div = document.getElementById(curdiv);
    deg = curdegree[curdiv] - 10;


    div.style.webkitTransform = 'rotate(' + deg + 'deg)';
    div.style.mozTransform = 'rotate(' + deg + 'deg)';
    div.style.msTransform = 'rotate(' + deg + 'deg)';
    div.style.oTransform = 'rotate(' + deg + 'deg)';
    div.style.transform = 'rotate(' + deg + 'deg)';
    curdegree[curdiv] = curdegree[curdiv] - 10;
}
function extractColor() {
    var div = document.getElementById(curdiv);
    console.log(div.style.backgroundColor.split(/,/)[0].split('(')[1]);
    r = div.style.backgroundColor.split(/,/)[0].split('(')[1];
    r = parseInt(r);
    g = div.style.backgroundColor.split(/,/)[1];
    g = parseInt(g);
    console.log(g);
    b = div.style.backgroundColor.split(/,/)[2].split(')')[0];
    b = parseInt(b);
    console.log(b);
    return [r, g, b];
}
function darken() {
    //var div = document.getElementById(curdiv);
    //console.log(div.style.backgroundColor.split(/,/)[0].split('(')[1]);
    //r = div.style.backgroundColor.split(/,/)[0].split('(')[1];
    //r = parseInt(r);
    //g = div.style.backgroundColor.split(/,/)[1];
    //g = parseInt(g);
    //console.log(g);
    //b = div.style.backgroundColor.split(/,/)[2].split(')')[0];
    //b = parseInt(b);
    //console.log(b);
    //if (r >= 0 && g >= 0 && b >= 0) {
    //    r = r - 10;
    //    g = g - 10;
    //    b = b - 10;
    //}
    //div.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}
function lighten() {
    var div = document.getElementById(curdiv);
    console.log(div.style.backgroundColor.split(/,/)[0].split('(')[1]);
    r = div.style.backgroundColor.split(/,/)[0].split('(')[1];
    r = parseInt(r);
    g = div.style.backgroundColor.split(/,/)[1];
    g = parseInt(g);
    console.log(g);
    b = div.style.backgroundColor.split(/,/)[2].split(')')[0];
    b = parseInt(b);
    console.log(b);
    if (r < 255 && g < 255 && b < 255) {
        r = r + 10;
        g = g + 10;
        b = b + 10;
    }
    div.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}
function updateX() {
    emX = document.getElementById('cdx').value;
    emY = document.getElementById('cdy').value;

    emW = document.getElementById('cdw').value;
    emH = document.getElementById('cdh').value;
    var div = document.getElementById(curdiv);
    div.style.top = emY + 'px';
    div.style.left = emX + 'px';
    div.style.width = emW + 'px';
    div.style.height = emH + 'px';
}
function changeSkew() {
    emSX = document.getElementById('cdsX').value;
    console.log("x scew is "+emSX);
    emSY = document.getElementById('cdsY').value;
    var div = document.getElementById(curdiv);
    div.style.transform = 'skew(' + emSX + 'deg,' + emSY + 'deg)';
}
function updateProps() {
    div = document.getElementById(curdiv);
    emX = div.style.left; emX = parseInt(emX);
    emY = div.style.top; emY = parseInt(emY);
    emW = div.style.width; emW = parseInt(emW);
    emH = div.style.height; emH = parseInt(emH);
    color = div.style.backgroundColor; 
    emSX = 0;
    emSY = 0;

    Xinput = document.getElementById('cdx');
    Xinput.value = emX;
    Yinput = document.getElementById('cdy');
    Yinput.value = emY;
    Winput = document.getElementById('cdw');
    Winput.value = emW;
    Hinput = document.getElementById('cdh');
    Hinput.value = emH;
    SXinput = document.getElementById('cdsX');
    SXinput.value = emSX;
    SYinput = document.getElementById('cdsY');
    SYinput.value = emSY;
    $("#editColor").spectrum("set", color);
}
function addButton() {
    defbutton = document.createElement("BUTTON");
    defbutton.innerHTML = 'Button';
    defbutton.className = "drsElement drsMoveHandle window";
    document.getElementById('main').appendChild(defbutton);
}
function onhover() {
    saveState();
    hideall();
    $('#onhover').hide();
    $('#sethover').show();
    $('#checkHover').hide();
    $("#" + curdiv).show();
}
function sethover() {
    showall();
    $('#onhover').show();
    $('#sethover').hide();
    $('#checkHover').show();
    restoreState();
}
function saveState() {
    bufferState = (document.getElementById(curdiv).style.cssText);
    bufferTop = parseInt(document.getElementById(curdiv).style.top);
    console.log(bufferTop);
    bufferLeft = parseInt(document.getElementById(curdiv).style.left);

}
function restoreState() {
    hoverstate[curdiv] = document.getElementById(curdiv).style.cssText;
    topoffset[curdiv] = parseInt(document.getElementById(curdiv).style.top) - bufferTop;
    console.log('top offset is' + topoffset[curdiv]);
    leftoffset[curdiv] = parseInt(document.getElementById(curdiv).style.left) - bufferLeft;
    document.getElementById(curdiv).style.cssText = bufferState;
    console.log(hoverstate[curdiv]);

}
function previewhover() {
    if (curdiv) {
        saveState();
        s = document.getElementById(curdiv).style;
        s.cssText = hoverstate[curdiv];
        s.top = bufferTop + topoffset[curdiv] + 'px';
        s.left = bufferLeft + leftoffset[curdiv] + 'px';
        console.log("topOffsetis " + topoffset[curdiv]);
    }
}
function stoppreview() {
    if (curdiv)
    document.getElementById(curdiv).style.cssText = bufferState;
}
function destroyhandle(d) {//hide resize handles of a div
    while (d.hasChildNodes()) {
        d.removeChild(d.lastChild);
    }
}