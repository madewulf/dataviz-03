/*Looping over the stop of the trains*/

    $.getJSON("namur/trains.json", function (trains) {
        for (var i = 0; i < trains.length; i++) {
            var train = trains[i];
            for (var j = 0; j < train.length; j++) {
                var stop = train[j];

            }
        }
    });
