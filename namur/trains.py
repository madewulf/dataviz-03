from saved_res import legs

from collections import defaultdict
import json

base_stations = ["Bruxelles Luxembourg","Ottignies","Gembloux"]
trains = defaultdict(set)
handled = set()
for station in base_stations:
    for leg in legs:
        if leg[0][0] == station:
            trains[leg[0]].add(leg[1])
            handled.add(leg)
    legs = legs - handled

real_trains = []
for start in trains:
    other_starts = trains[start]
    other_starts = sorted(other_starts,key=lambda x:x[1])
    other_starts.insert(0,start)
    real_trains.append(other_starts)
    print other_starts

s = json.dumps(real_trains)
f= open("trains.json","w")
f.write(s)
f.close()


