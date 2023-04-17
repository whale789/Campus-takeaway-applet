'use strict';
exports.main = async (event, context) => {
	let AuditDetailId=event.AuditDetailId;
	let AuditState=event.AuditState;
	let Feedback=event.Feedback;
	let res=db.collection("MerchantSettleAudit").where({
		_Id:AuditDetailId
	}).update({
		AuditState:AuditState,
		Feedback:Feedback
	})
	return res
};
