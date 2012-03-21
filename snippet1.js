/*drawing horizontal axes*/

for (var town in distances) {
    var y = station_to_y(town);
    var t = paper.text(100, y, town);
    t.attr({stroke:"#fff",fill:"#fff","font-size":14});
    var path = "M 180 " + y + " L " + 2400 + y;
    paper.path(path).attr({"stroke":"#666"});
}