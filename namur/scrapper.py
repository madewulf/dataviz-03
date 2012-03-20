__author__ = 'madewulf'

import requests
import json
import datetime
#example working url
#url = "http://api.irail.be/connections/?to=Namur&from=Bruxelles%20Luxembourg&date=190312&time=0500&timeSel=depart&format=json&fast=true"
base_url = "http://api.irail.be/connections/?to=%(to)s&from=%(fr)s&date=190312&time=%(time)s&timeSel=depart&format=json&fast=true"
example_dict = {"to":"Namur",
                "fr":"Etterbeek",
                "time":"500"
                }
url = base_url % example_dict
print url

stations = ["Bruxelles Luxembourg",
            "Etterbeek",
            "Watermael",
            "Boitsfort",
            "Groenendael",
            "Hoeilaart",
            "La Hulpe",
            "Genval",
            "Rixensart",
            "Ottignies",
            "Mont Saint Guibert",
            "Blanmont",
            "Chastre",
            "Ernage",
            "Gembloux",
            "Lonzee",
            "Beuzet",
            "Saint Denis Bovesse",
            "Rhisnes",
            "Namur",
            ]



legs = set()

def get_all_data(fr,to):
    global legs
    departure_time = datetime.datetime(2012, 3, 19, 5)
    previous_hours = 0
    previous_minutes = 0
    while departure_time.day ==19:
        hours = departure_time.hour
        minutes = departure_time.minute
        if previous_hours == hours and previous_minutes == minutes:
            print "////////////////////////////////////STALE let's break"
            break
        else :
            previous_hours = hours
            previous_minutes = minutes
        param_dict = {"to":to,
                        "fr":fr,
                        "time":"%02d%02d" % (hours,minutes)
                        }
        url = base_url % param_dict
        print url
        r = requests.get(url)
        try :
            j = json.loads(r.text)
            connections = j['connection']
            for connection in connections:
                vias = connection.get("vias",None)
                if vias == None:
                    depart_time = int(connection["departure"]["time"])
                    arrival_time = int(connection["arrival"]["time"])

                    departure_time = datetime.datetime.fromtimestamp(int(depart_time))
                    if (departure_time.day==19):
                        legs.add(
                                ((fr,depart_time),(to,arrival_time))
                        )

        except :
            print "@@@@@@@misss@@@@@@@@"
            print r.text
            f = open("missed.txt","a")
            f.write("('%s', '%s','%s')\n"%(fr,to,"%02d%02d" % (hours,minutes)))
            f.close()


    f= open("res.py","w")
    f.write(str(legs))
    f.close()

base_stations = ["Bruxelles Luxembourg","Ottignies","Gembloux"]
i=0
n_stations = len(stations)
count = 0
now = datetime.datetime.now()

while (i < 3):
    frstation = base_stations[i]
    ii = stations.index(frstation)
    j=ii+1
    while (j< n_stations):
        print "------------------", stations[ii],stations[j] , ii , j
        get_all_data(stations[ii],stations[j])
        j=j+1
        count += 1
        print "############## %d / 54" %count , "in ", datetime.datetime.now() - now
    i=i+1
print "count " , count

print legs

