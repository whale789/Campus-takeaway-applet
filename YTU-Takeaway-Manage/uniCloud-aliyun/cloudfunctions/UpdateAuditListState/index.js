'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditListId=event.AuditListId;
	let AuditState=event.AuditState;
	let res=db.collection("AuditList").where({
		_id:AuditListId
	}).update({
		AuditState:AuditState,
	})
	return res
};
