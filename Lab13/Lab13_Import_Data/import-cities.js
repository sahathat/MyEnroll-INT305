var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/***** replace with your databaseURL ************/"
});

var db = getFirestore() ;

var cities = [
    {
        "id": "SF",
        "name": "San Francisco",
        "state": "CA",
        "country": "USA",
        "capital": false,
        "population": 860000,
        "regions": ["west_coast","norcal"]
    },
    {
        "id": "LA",
        "name": "Los Angeles",
        "state": "CA",
        "country": "USA",
        "capital": false,
        "population": 3900000,
        "regions": ["west_coast","social"]   
    },
    {
        "id": "DC",
        "name": "Washington, D.C.",
        "state": null,
        "country": "USA",
        "capital": true,
        "population": 680000,
        "regions": ["east_coast"]
    },
    {
        "id": "TOK",
        "name": "Tokyo",
        "state": null,
        "country": "Japan",
        "capital": true,
        "population": 9000000,
        "regions": ["kanto","honshu"]
    },{
        "id": "BJ",
        "name": "Beijing",
        "state": null,
        "country": "China",
        "capital": true,
        "population": 21500000,
        "regions": ["jingjinji","hebei"]
    }
]

cities.forEach(function(obj){
    db.collection("cities").doc(obj.id).set({
        name: obj.name,
        state: obj.state,
        country: obj.country,
        capital: obj.capital,
        population: obj.population,
        regions: obj.regions
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});


