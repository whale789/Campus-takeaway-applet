'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	var Account=event.Account;
	let res=await db.collection("MerchantUsers").where({
		Account:Account
	}).get()
	return res
};