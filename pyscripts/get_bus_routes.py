import json
import requests
import os

skip_val = 0

url = 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip='

headers = { 'AccountKey': '5kWBoEkaQsSPQOZOBDF8Pg==',
            'accept': 'application/json' }

arr = []

r = requests.get(url + str(skip_val), headers = headers)
print(url + str(skip_val))
print(r)
data = r.json()
skip_val += 500

while True:
    r = requests.get(url + str(skip_val), headers = headers)
    arr.append(r.json())
    skip_val += 500
    if len(r.json()['value']) < 500:
        break

for output in arr:
    data['value'] += output['value']

with open('../data/bus_routes.json', 'w') as bus_routes:    # dump to json
    if not os.path.exists('../data/bus_routes.json'):
        json.load(bus_routes)                       # load the file...

    bus_routes.seek(0)                              # move cursor to front to overwrite
    json.dump(data, bus_routes, indent = 4)                     # dump to json file
    bus_routes.truncate()                           # delete excess (if any)
