'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditDetailId=event.AuditDetailId;
	let AuditState=event.AuditState;
	let Feedback=event.Feedback;
	let ProcessingTime=event.ProcessingTime;
	let res=db.collection("MerchantSettleAudit").where({
		_id:AuditDetailId
	}).update({
		AuditState:AuditState,
		Feedback:Feedback,
		ProcessingTime:ProcessingTime
	})
	return res
};
