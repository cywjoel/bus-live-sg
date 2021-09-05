# Bus Live SG

### *A Chrome extension for Singapore bus timings*

In order to use the extension, you will need an API key from [LTA Datamall](https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html) - go there and request for API access. (This means you won't find any use for it if you're not in Singapore.)

To start, create a file `config/config.json` and add the following:

```
{
    'apikey': "<your LTA datamall API key>"
}
```

Load the extension in Chrome and you should be good to go.

---

## Updating the bus service, bus route and bus stop files

Run the scripts in the `pyscripts` folder to get the latest info provided by LTA with `python <script name>.py`.