'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	var Account=event.Account;
	var State=event.State;
	let res=db.collection("Managers").where({
		Account:Account
	}).update({
		LoginState:State,
	})
	return res
};
