'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let CustomerPhone=event.CustomerPhone
	let res=await db.collection("Appraise").where({
		CustomerPhone:CustomerPhone
	}).get()
	return res
};
