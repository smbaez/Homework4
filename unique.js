var low = require('lowdb');
var fs = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db = low(adapter);

var myList = [];
var busID = db.get('vehicles').map('id').value();
busID.forEach(function(bus){
    if(myList.includes(bus)){myList}
    else{myList.push(bus)};
});
console.log('number of unique bus IDs is ' + myList.length);