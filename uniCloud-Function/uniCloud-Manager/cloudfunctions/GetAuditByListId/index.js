'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AuditListId=event.AuditListId;
	let res=await db.collection("MerchantExitAudit").where({
		AuditListId:AuditListId
	}).get()
	return res
};
