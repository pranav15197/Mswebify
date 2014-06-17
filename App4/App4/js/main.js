var canvas = new fabric.Canvas('c1');
canvas.on('mouse:down', function(options) {
  if (options.target) {
    console.log('an object was clicked! ', options.target.type);
  }
});
function addcircle(r) {
    canvas.add(new fabric.Circle({ radius: r, fill: '#f55', top: 100, left: 100 }));
    canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 5;
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