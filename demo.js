$(function () {
    var paper = new Raphael(document.getElementById('container'), 600, 500);
    p = paper.path("M10 80 L 550 450").attr({stroke:"#000",'stroke-width':4});


    /* Bézier cubique */
    //p = paper.path("M20 400 L 150 20 L 580 400").attr({'stroke':"red",'stroke-width':3});
    //p = paper.path("M20 400 Q 150 20 580 400").attr({'stroke':"#333",'stroke-width':3});

    /* Bézier Quadratique */
    //p = paper.path("M20 400 L 140 20").attr({'stroke':"#333",'stroke-width':3});
    //p = paper.path("M580 400 L 240 20").attr({'stroke':"#333",'stroke-width':3});
    //p = paper.path("M20 400 C 140 20 240 20 580 400").attr({'stroke':"red",'stroke-width':3});

});