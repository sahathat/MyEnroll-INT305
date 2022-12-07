var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore() ;

var lecturers = [{
	"name": {"firstname": "siam","lastname": "yimyaem" },
	"email": "siam.yim@kmutt.ac.th",
	"hiredate": new Date("2000-03-25")
}, {
	"name": {"firstname": "olarn","lastname": "roi" },
	"email": "olarn.roi@kmutt.ac.th",
	"hiredate": new Date("2002-04-08")
}, {
	"name": {"firstname": "umaporn","lastname": "sup" },
	"email": "umaporn.sup@kmutt.ac.th",
	"hiredate": new Date("2001-03-21")
}, {
	"name": {"firstname": "pichet","lastname": "lim" },
	"email": "pichet.lim@kmutt.ac.th",
	"hiredate": new Date("1998-05-15")
}, {
	"name": {"firstname": "sunina","lastname": "sat" },
	"email": "sunisa.sat@kmutt.ac.th",
	"hiredate": new Date("2010-11-11")
}, {
	"name": {"firstname": "sanit","lastname": "siri" },
	"email": "sanit.siri@kmutt.ac.th",
	"hiredate": new Date("2003-05-12")
}, {
	"name": {"firstname": "saichon","lastname": "jai" },
	"email": "saichon.jai@kmutt.ac.th",
	"hiredate": new Date("2003-12-18")
}, {
	"name": {"firstname": "kittipong","lastname": "war" },
	"email": "kittipong.war@kmutt.ac.th",
	"hiredate": new Date("2009-07-16")
}, {
	"name": {"firstname": "niwan","lastname": "wat" },
	"email": "niwan.wat@kmutt.ac.th",
	"hiredate": new Date("2022-05-01")
}, {
	"name": {"firstname": "kittiphan","lastname": "pua" },
	"email": "kittiphan.pua@kmutt.ac.th",
	"hiredate": new Date("2020-11-01")
}]

lecturers.forEach(function(obj){
    db.collection("lecturers").add({
        name: obj.name,
        email: obj.email,
        hiredate: obj.hiredate,
    }).then( docRef => { console.log("Document written with ID : "+docRef.id)})
});