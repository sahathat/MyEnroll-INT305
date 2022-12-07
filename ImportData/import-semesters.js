var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = getFirestore() ;

var semesters = [{
    "term": 1,
    "year": 2023,
}, {
    "term": 2,
    "year": 2023,
}, {
    "term": 1,
    "year": 2024,
}, {
    "term": 2,
    "year": 2024,
}, {
    "term": 1,
    "year": 2025,
}, {
    "term": 2,
    "year": 2025,
}, {
    "term": 1,
    "year": 2026,
}, {
    "term": 2,
    "year": 2026,
}, {
    "term": 1,
    "year": 2027,
}, {
    "term": 2,
    "year": 2027,
}]

semesters.forEach(function(obj){
    db.collection("semesters").add({
        term: obj.term,
        year: obj.year,
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});