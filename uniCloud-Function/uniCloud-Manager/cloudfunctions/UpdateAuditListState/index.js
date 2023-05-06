'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditListId=event.AuditListId;
	let AuditState=event.AuditState;
	
	let HandlersAccount=event.HandlersAccount;
	let Handlers=event.Handlers;
	let ProcessingTime=event.ProcessingTime;
	let Feedback=event.Feedback;
	let res=db.collection("AuditList").where({
		_id:AuditListId
	}).update({
		AuditState:AuditState,
		HandlersAccount:HandlersAccount,
		Handlers:Handlers,
		ProcessingTime:ProcessingTime,
		Feedback:Feedback
	})
	return res
};
