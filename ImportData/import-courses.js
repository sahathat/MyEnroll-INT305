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
	"lecturers": ["UBRs8AnalYEMC3B4OnVx","E68rOlhiYmiL4gR1C19Q"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT101",
	"name": "Programming fundamental",
	"credit": 3,
	"lecturers": ["Ld0sYHLf5MlnIITrlv9H","tQnXqczXlZkQPTslaw5r","AW1b0sjHH0HtYnoqqbTZ"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT102",
	"name": "Web technology fundamental",
	"credit": 1,
	"lecturers": ["Ld0sYHLf5MlnIITrlv9H","ZSLQ6QSS9Q1VHk7ZNveN"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT103",
	"name": "Advanced programming fundamental",
	"credit": 3,
	"lecturers": ["Ld0sYHLf5MlnIITrlv9H","tQnXqczXlZkQPTslaw5r","AW1b0sjHH0HtYnoqqbTZ","0SFMPVTD8nUf4whaCBxI"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT105",
	"name": "SQL fundamental",
	"credit": 1,
	"lecturers": ["JiMDWStwH6Gwi9cNUEjd","NWPvTpbdObRLhZCc3hKi","ZSLQ6QSS9Q1VHk7ZNveN"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT107",
	"name": "Computing platform fundamental",
	"credit": 3,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx","NWPvTpbdObRLhZCc3hKi"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT200",
	"name": "Data structure and Algorithm fundamental",
	"credit": 1,
	"lecturers": ["tQnXqczXlZkQPTslaw5r","E68rOlhiYmiL4gR1C19Q","AW1b0sjHH0HtYnoqqbTZ"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT201",
	"name": "Client side fundamental I",
	"credit": 2,
	"lecturers": ["AW1b0sjHH0HtYnoqqbTZ"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT202",
	"name": "Server side fundamental I",
	"credit": 2,
	"lecturers": ["Ld0sYHLf5MlnIITrlv9H"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT203",
	"name": "Client side fundamental II",
	"credit": 2,
	"lecturers": ["AW1b0sjHH0HtYnoqqbTZ"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT204",
	"name": "Server side fundamental II",
	"credit": 2,
	"lecturers": ["Ld0sYHLf5MlnIITrlv9H"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT205",
	"name": "Database management system fundamental",
	"credit": 3,
	"lecturers": ["JiMDWStwH6Gwi9cNUEjd","NWPvTpbdObRLhZCc3hKi","ZSLQ6QSS9Q1VHk7ZNveN"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT206",
	"name": "Advanced database fundamental",
	"credit": 2,
	"lecturers": ["JiMDWStwH6Gwi9cNUEjd","ZSLQ6QSS9Q1VHk7ZNveN"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT207",
	"name": "Network fundamental I",
	"credit": 3,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx","txi2xeZfGyqCw1FTPPuL","E68rOlhiYmiL4gR1C19Q"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT208",
	"name": "Network fundamental II",
	"credit": 2,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx","txi2xeZfGyqCw1FTPPuL","E68rOlhiYmiL4gR1C19Q"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT209",
	"name": "DevOps fundamental",
	"credit": 1,
	"lecturers": ["NWPvTpbdObRLhZCc3hKi"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT210",
	"name": "Architecture, integration and deployment fundamental",
	"credit": 2,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT305",
	"name": "XML and NoSQL fundamental",
	"credit": 2,
	"lecturers": ["ZSLQ6QSS9Q1VHk7ZNveN"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT307",
	"name": "Security fundamental I",
	"credit": 2,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, {
	"id": "INT308",
	"name": "Security fundamental II",
	"credit": 2,
	"lecturers": ["UBRs8AnalYEMC3B4OnVx"],
	"createdOn": new Date(),
	"updatedOn": new Date()
}, 
]

courses.forEach(function(obj){
    db.collection("cities").doc(obj.id).set({
		name: obj.name,
		credit: obj.credit,
		lecturers: obj.lecturers,
		createdOn: obj.createdOn,
		updatedOn: obj.updatedOn
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});