const admin = require("firebase-admin");
const serviceAccount = require("../serviceSDK.json");
FieldValue = require('firebase-admin').firestore.FieldValue
if(admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}
const db = admin.firestore();
const usersDb = db.collection('users');

exports.save_user = async function (req, res) {
	const id = req.body.user_id
	const device_id = req.body.devices_id[0]
	const rs = await usersDb.doc(`${id}`).get();
	res.setHeader('Content-Type', 'application/json');
	if (!rs.exists) {
		usersDb.doc(`${id}`).set(req.body).then(res=>{
			res.statusCode = 201;
		})
		.catch(err=>{
			res.statusCode = 500;
			res.send(err)
		})
	} else {
		await usersDb.doc(`${id}`).update({
			devices_id: FieldValue.arrayUnion(device_id)
		})
		res.statusCode = 201
		res.send('UPDATED')
	}
	res.end();
}

exports.findByListId = async function (ids) {
	let results = []
	for(let i = 0; i < ids.length; i++) {
		const rs = await usersDb.doc(`${ids[i]}`).get();
		if(rs.exists) {
			results.push(...rs.data().devices_id)
		}
	}
	return results
}