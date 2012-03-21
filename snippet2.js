/*drawing vertical axes*/

for (var hour in hours) {
    var x = time_to_x(hours[hour]);
    var t = paper.text(x, 10, hour + "h");
    t.attr({fill:"#fff", stroke:"#fff", "font-size":14});
    var path = "M  " + x + " 30  V " + 768;
    paper.path(path).attr({"stroke":"#666"});
}