var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var fetch = require('node-fetch')

// init the data store
db.defaults({vehicles:[]}).write();

async function getBus(){
    var url = 'https://api-v3.mbta.com/vehicles?api_key=6b5d5e74bc174516af3ad186ef59073c&filter[route]=1&include=trip';
    var response = await fetch(url);
    var myjson = await response.json();
    return myjson.data;
}

//add post
async function collect(){
    var buses = await getBus();
    buses.forEach(function(bus){
        var vehicle = {
            id: bus.id,
            label: bus.attributes.label,
            direction_id: bus.attributes.direction_id,
            latitude: bus.attributes.latitude,
            longitude: bus.attributes.longitude
        };
    db.get('vehicles').push(vehicle).write()
    });
};

setInterval(collect, 15000);