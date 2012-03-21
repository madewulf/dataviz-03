/*converting name of stations to y
  converting timestamps to x
 */

var width = 2400;
var height = 768;
var min_time = 1332129720;
var max_time = 1332197460;
var max_distance = 60.8;


function station_to_y(station) {
    var distance = distances[station];
    return (distance / max_distance) * (height - 40) + 30;
}

function time_to_x(time) {
    return (( time - min_time) / (max_time - min_time)) * (width - 190) + 180;
}
