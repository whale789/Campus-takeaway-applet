'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let ChatId=event.ChatId;
	let res=await db.collection("Chat").where({
		_id:ChatId
	}).get()
	return res
};
