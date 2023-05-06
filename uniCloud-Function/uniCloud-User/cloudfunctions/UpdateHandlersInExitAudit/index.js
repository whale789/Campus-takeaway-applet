'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditListId=event.AuditListId;
	let AuditState=event.AuditState;
	let Handlers=event.Handlers;
	var HandlersPhone=event.HandlersPhone;
	let res=db.collection("MerchantExitAudit").where({
		AuditListId:AuditListId
	}).update({
		AuditState:AuditState,
		Handlers:Handlers,
		HandlersPhone:HandlersPhone
	})
	return res
};
