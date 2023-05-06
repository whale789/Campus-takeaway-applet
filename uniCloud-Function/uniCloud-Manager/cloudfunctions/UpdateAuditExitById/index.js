'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditExitId=event.AuditExitId;
	let AuditState=event.AuditState;
	let Feedback=event.Feedback;
	let ProcessingTime=event.ProcessingTime;
	let res=db.collection("MerchantExitAudit").where({
		_id:AuditExitId
	}).update({
		AuditState:AuditState,
		Feedback:Feedback,
		ProcessingTime:ProcessingTime
	})
	return res
};
