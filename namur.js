distances = /*Found using google maps*/
{
    "Bruxelles Luxembourg":0,
    "Etterbeek":2.3,
    "Watermael":4.2,
    "Boitsfort":5.9,
    "Groenendael":10.6,
    "Hoeilaart":12,
    "La Hulpe":16.2,
    "Genval":18.3,
    "Rixensart":20.6,
    "Ottignies":25.7,
    "Mont Saint Guibert":31.8,
    "Blanmont":34.7,
    "Chastre":36.7,
    "Ernage":41.5,
    "Gembloux":43.5,
    "Lonzee":46.6,
    "Beuzet":48.9,
    "Saint Denis Bovesse":51.5,
    "Rhisnes":54.3,
    "Namur":60.8
};

hours = {
    "5":1332129600.0,
    "6":1332133200.0,
    "7":1332136800.0,
    "8":1332140400.0,
    "9":1332144000.0,
    "10":1332147600.0,
    "11":1332152400.0,
    "12":1332154800.0,
    "13":1332158400.0,
    "14":1332162000.0,
    "15":1332165600.0,
    "16":1332169200.0,
    "17":1332172800.0,
    "18":1332176400.0,
    "19":1332180000.0,
    "20":1332183600.0,
    "21":1332187200.0,
    "22":1332190800.0,
    "23":1332194400.0
};


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

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function get_station_hover_handler(town, time) {
    return function (event) {
        var popup = $("#popup");
        popup.show();
        popup.css("top", event.pageY);
        popup.css("left", event.pageX);
        var d = new Date(time * 1000);
        var hourString = FormatNumberLength(d.getHours(), 2);
        var minuteString = FormatNumberLength(d.getMinutes(), 2);
        popup.html("<div>" + town + " " + hourString + ":" + minuteString + "</div>");
    }
}
function get_train_hover_handler(path) {
    return function () {
        path.animate({"stroke":"red", "stroke-width":2}, 333)
        path.toFront();
    };
}

function get_train_out_handler(path) {
    return function () {
        path.animate({"stroke":"#fff", "stroke-width":1}, 333)
        path.toBack();
    };
}

function hide_popup() {
    $("#popup").hide();
}

$(function () {
    var paper = new Raphael(document.getElementById('container'), 2400, 768);
    $.getJSON("namur/trains.json", function (trains) {
        for (var i = 0; i < trains.length; i++) {
            var train = trains[i];
            var path = "";
            for (var j = 0; j < train.length; j++) {
                var stop = train[j];
                var x = time_to_x(stop[1]);
                var y = station_to_y(stop[0]);
                var circle = paper.circle(x, y, 4);
                circle.attr("fill", "#f00");
                $(circle.node).mousemove(get_station_hover_handler(stop[0], stop[1]));
                $(circle.node).mouseout(hide_popup);
                var move;
                if (j == 0)
                    move = "M";
                else
                    move = "L"
                path = path + " " + move + " " + x + " " + y;
            }
            var p = paper.path(path).attr({stroke:"#eee", "stroke-width":2});
            $(p.node).mousemove(get_train_hover_handler(p));
            $(p.node).mouseout(get_train_out_handler(p));
            p.toBack();
        }
        for (var town in distances) {
                var y = station_to_y(town);
                paper.text(100, y, town).attr({fill:"#fff", stroke:"#fff", "font-size":14});
                var path = "M 180 " + y + " H " + 2400;
                p = paper.path(path).attr({"stroke":"#444"});
                p.toBack();
            }

            for (var hour in hours) {
                var x = time_to_x(hours[hour]);
                paper.text(x, 10, hour + "h").attr({fill:"#fff", stroke:"#fff", "font-size":14});
                var path = "M  " + x + " 30  V " + 768;
                p = paper.path(path).attr({"stroke":"#444"});
                p.toBack();
            }
    });


});