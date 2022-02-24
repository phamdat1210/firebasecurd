const express = require('express');
const router = express.Router();
const axios = require('axios')
const admin = require("firebase-admin");
const serviceAccount = require("../serviceSDK.json");
const userControl = require('../controllers/user.controller')
if(admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}
async function send (req, res) {
	// let headers = { 'Content-Type': 'application/json;charset=UTF-8', Authorization: `key=AAAAujlq7TA:APA91bE_kXODt0NDgviY3k8Kq3FY60VGP48TTbEHUDJnMkHQaOZFFUPdJtF2rHvpjX-QvyZvpNn1OmUazfQTXf_x-byzdtPMxzWUlpM-JewlCPaKYIKoSo1v7UW4tR68k73ErFyNCUlS` }
	res.setHeader('Content-Type', 'application/json');
	const ids = req.body?.ids
	const notification = req.body?.notification
	if(ids !== undefined && notification !== undefined) {
		const tokens = await userControl.findByListId(ids)
		await admin.messaging().sendMulticast({
			tokens,
			notification
		})
		res.statusCode = 200
		res.send('OK')
		res.end()
	} else {
		res.statusCode = 403
		res.send('INVALID')
		res.end()
	}

}

router.post("/send", send);


module.exports = router;