/*drawing the path of a train*/

var train = trains[i];
var path = "";
for (var j = 0; j < train.length; j++) {
    var stop = train[j];
    var x = time_to_x(stop[1]);/*stop[1] : 1332166380*/
    var y = station_to_y(stop[0]); /*stop[0]: "Gembloux" */
    var move;
    if (j == 0)
        move = "M";
    else
        move = "L"
    path = path + " " + move + " " + x + " " + y;
}
var p = paper.path(path).attr({stroke:"#fff", "stroke-width":2});