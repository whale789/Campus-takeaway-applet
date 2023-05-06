'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Account=event.Account;
	let res=await db.collection("Punish").where({
		ManagerAccount:Account
	}).get()
	return res
};
