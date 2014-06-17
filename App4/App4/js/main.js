//variables
i = 1;
object = [];
var canvas = new fabric.Canvas('c1');
canvas.isDrawingMode = false;
canvas.selectionColor = 'rgba(0,0,255,0.3)';
canvas.selectionBorderColor = 'rgb(150,150,255)';
canvas.selectionLineWidth = 1;

canvas.on('mouse:down', function (options) {
    if (options.target) {
        t = options.target;
        $('#borderRadiusX').val(t.rx);
        $('#borderRadiusY').val(t.ry);
        if (t.type = 'rect') {
            $('.borderRadius').show();
        }
    }
});
function addcircle(r) {
    object[i] = new fabric.Circle({ radius: r, fill: '#f55', top: 100, left: 100 });
    canvas.add(object[i]);
    object[i].id = i++;
  }
function addrect() {
    object[i] = new fabric.Rect({ width: 100, height: 100, fill: '#f55', top: 100, left: 100, rx: 20, ry: 20 });
    canvas.add(object[i]);
    object[i].id = i++;
}
function addimage(url) {
    fabric.Image.fromURL(url, function (oImg) {
        canvas.add(oImg);
    });
}
function addtext(t) {
    var comicSansText = new fabric.IText(t, {
        fontFamily: 'Comic Sans'
    });
    canvas.add(comicSansText);
}
function draw() {
    canvas.isDrawingMode = !canvas.isDrawingMode;  
}
function preview() {
    str='';
    for (j = 1; j < i; j++) {
        o=object[j];
        str += o.type + '-';
        str += o.id + ',';
    }
    $('#previewWindow').html(str).show();
}
function apply() {
    if (a = canvas.getActiveObject()) {
        arx = $('#borderRadiusX').val();
        ary = $('#borderRadiusY').val();
        arx = parseInt(arx);
        ary = parseInt(ary);
        a.set({ rx: arx, ry: ary });
        canvas.renderAll();
    }
}