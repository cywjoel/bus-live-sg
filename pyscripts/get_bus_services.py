import json
import requests
import os
from operator import itemgetter
from natsort import humansorted

with open('../config/config.json') as f_config:
    config = json.load(f_config)
    config_key = config['apikey']

skip_val = 0

url = 'http://datamall2.mytransport.sg/ltaodataservice/BusServices?$skip='

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

sortdata = humansorted(data['value'], key=itemgetter('ServiceNo'))
data['value'].clear()
data['value'] += sortdata


with open('../data/bus_services.json', 'w') as bus_services:    # dump to json
    if not os.path.exists('../data/bus_services.json'):
        json.load(bus_services)                       # load the file...

    bus_services.seek(0)                              # move cursor to front to overwrite
    json.dump(data, bus_services, indent = 4)                     # dump to json file
    bus_services.truncate()                           # delete excess (if any)
