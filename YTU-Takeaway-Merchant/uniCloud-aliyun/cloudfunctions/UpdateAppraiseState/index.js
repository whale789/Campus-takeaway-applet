'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AppraiseId=event.AppraiseId;
	let IsReply=event.IsReply;
	let ReplyText=event.ReplyText;
	let ReplyDate=event.ReplyDate;
	let res=db.collection("Appraise").where({
		_id:AppraiseId
	}).update({
		IsReply:true,
		ReplyText:ReplyText,
		ReplyDate:ReplyDate
	})
	return res
	
};
