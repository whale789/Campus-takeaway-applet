'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let ManagerId=event.ManagerId;
	let res=await db.collection("Chat").where({
		ManagerId:ManagerId
	}).get()
	return res
};
