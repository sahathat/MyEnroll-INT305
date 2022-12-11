var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore() ;

var courses = [{
	"id": "INT100",
	"name": "IT fundamental",
	"credit": 3,
	"lecturers": ["siam.yim@kmutt.ac.th","olarn.roi@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT101",
	"name": "Programming fundamental",
	"credit": 3,
	"lecturers": ["pichet.lim@kmutt.ac.th","saichon.jai@kmutt.ac.th","umaporn.sup@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT102",
	"name": "Web technology fundamental",
	"credit": 1,
	"lecturers": ["pichet.lim@kmutt.ac.th","sanit.siri@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT103",
	"name": "Advanced programming fundamental",
	"credit": 3,
	"lecturers": ["pichet.lim@kmutt.ac.th","saichon.jai@kmutt.ac.th","umaporn.sup@kmutt.ac.th","niwan.wat@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT105",
	"name": "SQL fundamental",
	"credit": 1,
	"lecturers": ["sunisa.sat@kmutt.ac.th","kittipong.war@kmutt.ac.th","sanit.siri@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT107",
	"name": "Computing platform fundamental",
	"credit": 3,
	"lecturers": ["siam.yim@kmutt.ac.th","kittipong.war@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT200",
	"name": "Data structure and Algorithm fundamental",
	"credit": 1,
	"lecturers": ["kittipong.war@kmutt.ac.th","olarn.roi@kmutt.ac.th","umaporn.sup@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT201",
	"name": "Client side fundamental I",
	"credit": 2,
	"lecturers": ["umaporn.sup@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT202",
	"name": "Server side fundamental I",
	"credit": 2,
	"lecturers": ["pichet.lim@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT203",
	"name": "Client side fundamental II",
	"credit": 2,
	"lecturers": ["umaporn.sup@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT204",
	"name": "Server side fundamental II",
	"credit": 2,
	"lecturers": ["pichet.lim@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT205",
	"name": "Database management system fundamental",
	"credit": 3,
	"lecturers": ["sunisa.sat@kmutt.ac.th","kittipong.war@kmutt.ac.th","sanit.siri@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT206",
	"name": "Advanced database fundamental",
	"credit": 2,
	"lecturers": ["sunisa.sat@kmutt.ac.th","sanit.siri@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT207",
	"name": "Network fundamental I",
	"credit": 3,
	"lecturers": ["siam.yim@kmutt.ac.th","kittiphan.pua@kmutt.ac.th","olarn.roi@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT208",
	"name": "Network fundamental II",
	"credit": 2,
	"lecturers": ["siam.yim@kmutt.ac.th","kittiphan.pua@kmutt.ac.th","olarn.roi@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT209",
	"name": "DevOps fundamental",
	"credit": 1,
	"lecturers": ["kittipong.war@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT210",
	"name": "Architecture, integration and deployment fundamental",
	"credit": 2,
	"lecturers": ["siam.yim@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT305",
	"name": "XML and NoSQL fundamental",
	"credit": 2,
	"lecturers": ["sanit.siri@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT307",
	"name": "Security fundamental I",
	"credit": 2,
	"lecturers": ["siam.yim@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT308",
	"name": "Security fundamental II",
	"credit": 2,
	"lecturers": ["siam.yim@kmutt.ac.th"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, 
]

courses.forEach(function(obj){
    db.collection("courses").doc(obj.id).set({
		name: obj.name,
		credit: obj.credit,
		lecturers: obj.lecturers,
		createdOn: obj.createdOn,
		updatedOn: obj.updatedOn
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});