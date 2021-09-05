import json
import requests
import os

with open('../config/config.json') as f_config:
    config = json.load(f_config)
    config_key = config['apikey']

skip_val = 0

url = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip='

headers = { 'AccountKey': config_key,
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

with open('../data/bus_stop_ids.json', 'w') as bus_stop_ids:    # dump to json
    if not os.path.exists('../data/bus_stop_ids.json'):
        json.load(bus_stop_ids)                       # load the file...

    bus_stop_ids.seek(0)                              # move cursor to front to overwrite
    json.dump(data, bus_stop_ids, indent = 4)                     # dump to json file
    bus_stop_ids.truncate()                           # delete excess (if any)
