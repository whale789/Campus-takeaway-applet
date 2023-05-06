'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let MerchantPhone=event.MerchantPhone;
	let res=await db.collection("AuditList").where({
		ApplicantPhone:MerchantPhone
	}).get()
	return res
};
