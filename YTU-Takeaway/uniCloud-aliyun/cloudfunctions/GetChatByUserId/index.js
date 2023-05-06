'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let UserId=event.UserId;
	let res=await db.collection("Chat").where({
		UserId:UserId
	}).get()
	return res
};
