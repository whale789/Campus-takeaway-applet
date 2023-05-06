'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Possessor=event.Account;
	let res=await db.collection("UserAddress").where({
		Possessor:Possessor
	}).get()
	return res
};
