'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let ChatId=event.ChatId;
	var index=event.index;
	let res=await db.collection("Chat").where({
		_id:ChatId
	}).update({
		['MsgList.'+index]:{
			MessageState:1
		}
	})
	return res;
};
