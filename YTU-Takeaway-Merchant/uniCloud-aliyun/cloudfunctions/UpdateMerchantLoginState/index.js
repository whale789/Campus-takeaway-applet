'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Account=event.Account;
	var State=event.State;
	let res=db.collection("MerchantUsers").where({
		Account:Account
	}).update({
		LoginState:State,
	})
	return res
};
