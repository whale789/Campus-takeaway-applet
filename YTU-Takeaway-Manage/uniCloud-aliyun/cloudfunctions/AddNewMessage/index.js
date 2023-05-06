'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let ChatId=event.ChatId
	let NewMsg=event.NewMsg;
	let res=await db.collection("Chat").where({
		_id:ChatId
	}).update({
		MsgList:dbcmd.push(NewMsg)
	})
	
	return res
};
