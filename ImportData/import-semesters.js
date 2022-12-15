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
    "courseEnrolls" : [
        {"id": "INT100", "name": "IT fundamental", "credit": 3, "isEnroll": true},
        {"id": "INT101", "name": "Programming fundamental", "credit": 3, "isEnroll": false},
        {"id": "INT102", "name": "Web technology fundamental", "credit": 1, "isEnroll": true}] 
}, {
    "term": 2,
    "year": 2023,
    "courseEnrolls" : [
        {"id": "INT103", "name": "Advanced programming fundamental", "credit": 3, "isEnroll": true},
        {"id": "INT105", "name": "SQL fundamental", "credit": 1, "isEnroll": false},
        {"id": "INT107", "name": "Computing platform fundamental", "credit": 3, "isEnroll": true},
        {"id": "INT200", "name": "Data structure and Algorithm fundamental", "credit": 1, "isEnroll": true}
    ]
}, {
    "term": 1,
    "year": 2024,
    "courseEnrolls": [
        {"id": "INT201", "name": "Client side fundamental I", "credit": 2, "isEnroll": true},
        {"id": "INT202", "name": "Server side fundamental I", "credit": 2, "isEnroll": false},
        {"id": "INT205", "name": "Database management system fundamental", "credit": 3, "isEnroll": true},
        {"id": "INT207", "name": "Network fundamental I", "credit": 3, "isEnroll": true}
    ]
}, {
    "term": 2,
    "year": 2024,
    "courseEnrolls": [
        {"id": "INT203", "name": "Client side fundamental II", "credit": 2, "isEnroll": true},
        {"id": "INT204", "name": "Server side fundamental II", "credit": 2, "isEnroll": true},
        {"id": "INT206", "name": "Advanced database fundamental", "credit": 2, "isEnroll": true},
        {"id": "INT208", "name": "Network fundamental II", "credit": 2, "isEnroll": true},
        {"id": "INT209", "name": "DevOps fundamental", "credit": 1, "isEnroll": true},
        {"id": "INT210", "name": "Architecture, integration and deployment fundamental", "credit": 2, "isEnroll": true}
    ]
}, {
    "term": 1,
    "year": 2025,
    "courseEnrolls": [
        {"id": "INT305", "name": "XML and NoSQL fundamental", "credit": 2, "isEnroll": true},
        {"id": "INT307", "name": "Security fundamental I", "credit": 2, "isEnroll": true}
    ]
}, {
    "term": 2,
    "year": 2025,
    "courseEnrolls": [
        {"id": "INT308", "name": "Security fundamental II", "credit": 2, "isEnroll": true}
    ]
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


semesters.forEach(function(obj1){
    db.collection("semesters").add({
        term: obj1.term,
        year: obj1.year,
    }).then( docRef => { 
        console.log("Document written with ID : "+docRef.id)
        if(obj1.courseEnrolls !== undefined){
            obj1.courseEnrolls.forEach(function(obj2){
                db.collection("semesters").doc(docRef.id).collection("courseEnrolls").doc(obj2.id).set({
                    name: obj2.name,
                    credit: obj2.credit,
                    isEnroll: obj2.isEnroll
                })
            })
        }
    })
})